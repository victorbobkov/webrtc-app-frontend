import store from '../store/store'
import {
   callStates,
   setCallerUsername,
   setCallingDialogVisible,
   setCallRejected,
   setCallState,
   setLocalStream
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
      // dispatch remote stream in store
   }

   peerConnection.onicecandidate = (event) => {
      // send to connected users ice candidates
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
}

export const rejectIncomingCallRequest = () => {
   wss.sendPreOfferAnswer({
      callerSocketId: connectedUserSocketId,
      answer: preOfferAnswers.CALL_REJECTED
   })

   resetCallData()
}

const sendOffer = async () => {
   const offer = await peerConnection.createOffer()
   await peerConnection.setLocalDescription(offer)
   wss.sendWebRTCOffer({
      calleeSocketId: connectedUserSocketId,
      offer: offer
   })
}

export const handlePreOfferAnswer = (data) => {
   store.dispatch(setCallingDialogVisible(false))

   if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
      // send WebRTC offer
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

export const checkIfCallIsPossible = () => {
   return !(store.getState().call.localStream === null ||
      store.getState().call.callState !== callStates.CALL_AVAILABLE)
}

export const resetCallData = () => {
   connectedUserSocketId = null
   store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}
