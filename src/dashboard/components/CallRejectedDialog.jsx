import React, { useEffect } from 'react'
import './CallRejectedDialog.css'

const CallRejectedDialog = ({ reason, hideCallRejectedDialog }) => {
   useEffect(() => {
      setTimeout(() => {
         hideCallRejectedDialog({
            rejected: false,
            reason: ''
         })
      }, 3000)
   }, [])

   return (
      <div className='call_rejected_dialog background_secondary_color'>
         {reason}
      </div>
   )
}

export default CallRejectedDialog