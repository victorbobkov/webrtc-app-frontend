import React from 'react'
import { connect } from 'react-redux'
import LocalVideoView from './LocalVideoView'
import RemoveVideoView from './RemoveVideoView'


const DirectCall = ({ localStream, remoteStream }) => {

   return (
      <>
         <LocalVideoView localStream={localStream} />
         {remoteStream && <RemoveVideoView remoteStream={remoteStream} />}
      </>
   );
};

function mapStoreStateToProps ({ call }) {
   return {
      ...call
   };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
