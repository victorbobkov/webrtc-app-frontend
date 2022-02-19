import React from 'react'
import { connect } from 'react-redux'
import LocalVideoView from './LocalVideoView'
import RemoveVideoView from './RemoveVideoView'
import CallRejectedDialog from './CallRejectedDialog'
import IncomingCallDialog from './IncomingCallDialog'
import CallingDialog from './CallingDialog'


const DirectCall = ({ localStream, remoteStream }) => {

   return (
      <>
         <LocalVideoView localStream={localStream} />
         {remoteStream && <RemoveVideoView remoteStream={remoteStream} />}
         {/*<CallRejectedDialog />*/}
         {/*<IncomingCallDialog />*/}
         {/*<CallingDialog />*/}
      </>
   );
};

function mapStoreStateToProps ({ call }) {
   return {
      ...call
   };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
