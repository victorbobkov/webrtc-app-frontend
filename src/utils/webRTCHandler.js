import store from '../store/store'
import {
   callStates, setCallerUsername,
   setCallingDialogVisible,
   setCallState,
   setLocalStream
} from '../store/actions/callActions'
import * as wss from './wssConnection'

const defaultConstrains = {
   video: true,
   audio: true
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
   connectedUserSocketId = data.callerSocketId
   store.dispatch(setCallerUsername(data.callerUsername))
   store.dispatch(setCallState(callStates.CALL_REQUESTED))
}