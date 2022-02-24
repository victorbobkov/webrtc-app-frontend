import React from 'react'
import { MdCallEnd, MdCamera, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel } from 'react-icons/md'
import ConversationButton from './ConversationButton'
import { hangUp, switchFroScreenSharing } from '../../utils/webRTCHandler'

const styles = {
   buttonContainer: {
      display: 'flex',
      position: 'absolute',
      bottom: '22%',
      left: '35%'
   },
   icon: {
      width: '25px',
      height: '25px',
      fill: '#e6e5e8'
   }
}

const ConversationButtons = ({
   localStream,
   localMicrophoneEnabled,
   localCameraEnabled,
   setMicrophoneEnabled,
   setCameraEnabled,
   screenSharingActive
}) => {

   const handleMicButtonPressed = () => {
      localStream.getAudioTracks()[0].enabled = !localMicrophoneEnabled
      setMicrophoneEnabled(!localMicrophoneEnabled)
   }

   const handleCameraButtonPressed = () => {
      localStream.getVideoTracks()[0].enabled = !localCameraEnabled
      setCameraEnabled(!localCameraEnabled)
   }

   const handleScreenSharingButtonPressed = () => {
      switchFroScreenSharing()
   }

   const handleHangUpButtonPressed = () => {
      hangUp()
   }

   return (
      <div style={styles.buttonContainer}>
         <ConversationButton onClickHandler={handleMicButtonPressed}>
            { localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} /> }
         </ConversationButton>
         <ConversationButton onClickHandler={handleHangUpButtonPressed}>
            <MdCallEnd style={styles.icon} />
         </ConversationButton>
         <ConversationButton onClickHandler={handleCameraButtonPressed}>
            { localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} /> }
         </ConversationButton>
         <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
            { screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={ styles.icon }/> }
         </ConversationButton>
      </div>
   )
}

export default ConversationButtons
