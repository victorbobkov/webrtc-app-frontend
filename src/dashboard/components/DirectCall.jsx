import React from 'react'
import { connect } from 'react-redux'
import LocalVideoView from './LocalVideoView'
import RemoveVideoView from './RemoveVideoView'
import CallRejectedDialog from './CallRejectedDialog'
import IncomingCallDialog from './IncomingCallDialog'
import CallingDialog from './CallingDialog'
import {
   callStates,
   setCallRejected,
   setLocalCameraEnabled,
   setLocalMicrophoneEnabled
} from '../../store/actions/callActions'
import ConversationButtons from './ConversationButtons'

const DirectCall = (props) => {
   const {
      localStream,
      remoteStream,
      callState,
      callerUsername,
      callingDialogVisible,
      callRejected,
      hideCallRejectedDialog,
} = props

   return (
      <>
         <LocalVideoView localStream={localStream} />
         {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoveVideoView remoteStream={remoteStream} />}
         {callRejected.rejected && <CallRejectedDialog
            reason={callRejected.reason}
            hideCallRejectedDialog={hideCallRejectedDialog}
         /> }
         {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
         {callingDialogVisible && <CallingDialog />}
         {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ConversationButtons { ...props } />}
      </>
   )
}

function mapStoreStateToProps ({ call }) {
   return {
      ...call
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      hideCallRejectedDialog: (setCallRejectedDetails) => dispatch(setCallRejected(setCallRejectedDetails)),
      setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
      setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
   }
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall)
