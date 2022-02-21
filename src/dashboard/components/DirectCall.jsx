import React from 'react'
import { connect } from 'react-redux'
import LocalVideoView from './LocalVideoView'
import RemoveVideoView from './RemoveVideoView'
import CallRejectedDialog from './CallRejectedDialog'
import IncomingCallDialog from './IncomingCallDialog'
import CallingDialog from './CallingDialog'
import { callStates, setCallRejected } from '../../store/actions/callActions'

const DirectCall = ({
   localStream,
   remoteStream,
   callState,
   callerUsername,
   callingDialogVisible,
   callRejected,
   hideCallRejectedDialog
}) => {

   return (
      <>
         <LocalVideoView localStream={localStream} />
         {remoteStream && <RemoveVideoView remoteStream={remoteStream} />}
         {callRejected.rejected && <CallRejectedDialog
            reason={callRejected.reason}
            hideCallRejectedDialog={hideCallRejectedDialog}
         /> }
         {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
         {callingDialogVisible && <CallingDialog />}
      </>
   );
};

function mapStoreStateToProps ({ call }) {
   return {
      ...call
   };
}

const mapDispatchToProps = (dispatch) => {
   return {
      hideCallRejectedDialog: (setCallRejectedDetails) => dispatch(setCallRejected(setCallRejectedDetails))
   }
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
