import store from '../store/store'
import {
   callStates, setCallerUsername,
   setCallingDialogVisible,
   setCallState,
   setLocalStream
} from '../store/actions/callActions'
import * as wss from './wssConnection'
import { sendPreOfferAnswer } from './wssConnection'

const defaultConstrains = {
   video: true,
   audio: true
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
      })
      .catch(err => {
         console.log(err)
      })
}

let connectedUserSocketId

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
   resetCallData()
   wss.sendPreOfferAnswer({
      callerSocketId: connectedUserSocketId,
      answer: preOfferAnswers.CALL_REJECTED
   })
}

export const checkIfCallIsPossible = () => {
   return !(store.getState().call.localStream === null ||
      store.getState().call.callState !== callStates.CALL_AVAILABLE)
}

export const resetCallData = () => {
   connectedUserSocketId = null
   store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}
