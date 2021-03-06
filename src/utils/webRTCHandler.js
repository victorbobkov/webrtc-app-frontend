import store from '../store/store'
import {
   callStates,
   setCallerUsername,
   setCallingDialogVisible,
   setCallRejected,
   setCallState,
   setLocalStream,
   setRemoteStream,
   setScreenSharingActive
} from '../store/actions/callActions'
import * as wss from './wssConnection'

const defaultConstrains = {
   video: true,
   audio: true
}

const configuration = {
   iceServers: [{
      urls: 'stun:stun.l.google.com:13902'
   }]
}

const preOfferAnswers = {
   CALL_ACCEPTED: 'CALL_ACCEPTED',
   CALL_REJECTED: 'CALL_REJECTED',
   CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
}

export const getLocalStream = () => {
   navigator.mediaDevices.getUserMedia(defaultConstrains)
      .then(stream => {
         store.dispatch(setLocalStream(stream))
         store.dispatch(setCallState(callStates.CALL_AVAILABLE))
         createPeerConnection()
      })
      .catch(err => {
         console.log(err)
      })
}

let connectedUserSocketId
let peerConnection

const createPeerConnection = () => {
   peerConnection = new RTCPeerConnection(configuration)

   const localStream = store.getState().call.localStream

   for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream)
   }

   peerConnection.ontrack = ({ streams: [stream] }) => {
      store.dispatch(setRemoteStream(stream))
   }

   peerConnection.onicecandidate = (event) => {
      console.log('getting candidates from stun server')
      if (event.candidate) {
         wss.sendWebRTCCandidate({
            candidate: event.candidate,
            connectedUserSocketId: connectedUserSocketId
         })
      }
   }

   peerConnection.onconnectionstatechange = (event) => {
      if (peerConnection.connectionState === 'connected') {
         console.log('Successfully connected with other peer')
      }
   }
}

export const callToOtherUser = (calleDetails) => {
   connectedUserSocketId = calleDetails.socketId
   store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
   store.dispatch(setCallingDialogVisible(true))
   wss.sendPreOffer({
      callee: calleDetails,
      caller: {
         username: store.getState().dashboard.username
      }
   })
}

export const handlePreOffer = (data) => {
   if (checkIfCallIsPossible()) {
      connectedUserSocketId = data.callerSocketId
      store.dispatch(setCallerUsername(data.callerUsername))
      store.dispatch(setCallState(callStates.CALL_REQUESTED))
   } else {
      wss.sendPreOfferAnswer({
         callerSocketId: data.callerSocketId,
         answer: preOfferAnswers.CALL_NOT_AVAILABLE
      })
   }
}

export const acceptIncomingCallRequest = () => {
   wss.sendPreOfferAnswer({
      callerSocketId: connectedUserSocketId,
      answer: preOfferAnswers.CALL_ACCEPTED
   })

   store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
}

export const rejectIncomingCallRequest = () => {
   wss.sendPreOfferAnswer({
      callerSocketId: connectedUserSocketId,
      answer: preOfferAnswers.CALL_REJECTED
   })

   resetCallData()
}

export const handlePreOfferAnswer = (data) => {
   store.dispatch(setCallingDialogVisible(false))

   if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
      sendOffer()
   } else {
      let rejectionReason
      if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
         rejectionReason = 'Callee is not able to pick up the call right now'
      } else {
         rejectionReason = 'Call rejected by the callee'
      }
      store.dispatch(setCallRejected({
         rejected: true,
         reason: rejectionReason
      }))

      resetCallData()
   }
}

const sendOffer = async () => {
   const offer = await peerConnection.createOffer()
   await peerConnection.setLocalDescription(offer)
   wss.sendWebRTCOffer({
      calleeSocketId: connectedUserSocketId,
      offer: offer
   })
}

export const handleOffer = async (data) => {
   await peerConnection.setRemoteDescription(data.offer)
   const answer = await peerConnection.createAnswer()
   await peerConnection.setLocalDescription(answer)
   wss.sendWebRTCAnswer({
      callerSocketId: connectedUserSocketId,
      answer: answer
   })
}

export const handleAnswer = async (data) => {
   await peerConnection.setRemoteDescription(data.answer)
}

export const handleCandidate = async (data) => {
   try {
      console.log('adding ice candidates')
      await peerConnection.addIceCandidate(data.candidate)
   } catch (e) {
      console.error(e)
   }
}

export const checkIfCallIsPossible = () => {
   return !(store.getState().call.localStream === null ||
      store.getState().call.callState !== callStates.CALL_AVAILABLE)
}

let screenSharingStream

export const switchFroScreenSharing = async () => {
   if (!store.getState().call.screenSharingActive) {
      try {
         screenSharingStream = await navigator.mediaDevices.getDisplayMedia({video: true})
         store.dispatch(setScreenSharingActive(true))
         const senders = peerConnection.getSenders()
         const sender = senders.find(sender => sender.track.kind === screenSharingStream.getVideoTracks()[0].kind)
         await sender.replaceTrack(screenSharingStream.getVideoTracks()[0])
      } catch (e) {
         console.error(e)
      }
   } else {
      const localStream = store.getState().call.localStream
      const senders = peerConnection.getSenders()
      const sender = senders.find(sender => sender.track.kind === localStream.getVideoTracks()[0].kind)
      await sender.replaceTrack(localStream.getVideoTracks()[0])
      store.dispatch(setScreenSharingActive(false))
      for (const track of screenSharingStream.getTracks()) {
         track.stop()
      }
   }
}

export const handleUserHangedUp = () => {
   resetCallDataAfterHangUp()
}

export const hangUp = () => {
   wss.sendUserHangedUp({
      connectedUserSocketId: connectedUserSocketId
   })

   resetCallDataAfterHangUp()
}

const resetCallDataAfterHangUp = () => {
   store.dispatch(setRemoteStream(null))

   peerConnection.close()
   peerConnection = null
   createPeerConnection()
   resetCallData()

   if (store.getState().call.screenSharingActive) {
      for (const track of screenSharingStream.getTracks()) {
         track.stop()
      }
   }
}

export const resetCallData = () => {
   connectedUserSocketId = null
   store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}
