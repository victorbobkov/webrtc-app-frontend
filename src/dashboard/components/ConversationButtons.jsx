import React from 'react'
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel } from 'react-icons/md'
import ConversationButton from './ConversationButton'

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
}) => {

   const handleMicButtonPressed = () => {
      localStream.getAudioTracks()[0].enabled = !localMicrophoneEnabled
      setMicrophoneEnabled(!localMicrophoneEnabled)
   }

   const handleCameraButtonPressed = () => {
      localStream.getVideoTracks()[0].enabled = !localCameraEnabled
      setCameraEnabled(!localCameraEnabled)
   }

   return (
      <div style={styles.buttonContainer}>
         <ConversationButton onClickHandler={handleMicButtonPressed}>
            { localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} /> }
         </ConversationButton>
         <ConversationButton>
            <MdCallEnd style={styles.icon} />
         </ConversationButton>
         <ConversationButton onClickHandler={handleCameraButtonPressed}>
            { localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} /> }
         </ConversationButton>
         <ConversationButton>
            <MdVideoLabel style={styles.icon} />
         </ConversationButton>
      </div>
   )
}

export default ConversationButtons
