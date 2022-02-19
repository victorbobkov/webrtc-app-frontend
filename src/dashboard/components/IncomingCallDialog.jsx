import React from 'react'
import './IncomingCallDialog.css'

const IncomingCallDialog = () => {
   const handleAccept = () => {
      // accept the call
   }

   const handleReject = () => {
      // reject the call
   }

   return (
      <div className='direct_call_dialog background_secondary_color'>
         <span className='direct_call_dialog_caller_name'>

         </span>
         <div className='direct_call_dialog_button_container'>
            <button
               className='direct_call_dialog_accept_button'
               onClick={handleAccept}
            >
               Accept
            </button>
            <button
               className='direct_call_dialog_reject_button'
               onClick={handleReject}
            >
               Reject
            </button>
         </div>
      </div>
   )
}

export default IncomingCallDialog