import React from 'react'
import { connect } from 'react-redux'
import LocalVideoView from './LocalVideoView'
import RemoveVideoView from './RemoveVideoView'
import CallRejectedDialog from './CallRejectedDialog'
import IncomingCallDialog from './IncomingCallDialog'
import CallingDialog from './CallingDialog'
import { callStates } from '../../store/actions/callActions'


const DirectCall = ({localStream, remoteStream, callState, callerUsername, callingDialogVisible }) => {

   return (
      <>
         <LocalVideoView localStream={localStream} />
         {remoteStream && <RemoveVideoView remoteStream={remoteStream} />}
         {/*<CallRejectedDialog />*/}
         {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername}/>}
         {callingDialogVisible && <CallingDialog/>}
      </>
   );
};

function mapStoreStateToProps ({ call }) {
   return {
      ...call
   };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
