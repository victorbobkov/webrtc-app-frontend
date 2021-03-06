import React, { useEffect } from 'react'
import ActiveUsersList from './components/ActiveUsersList'
import DirectCall from './components/DirectCall'
import * as webRTCHandler from '../utils/webRTCHandler'
import './Dashboard.css'
import logo from '../resources/logo.png'

const Dashboard = () => {
    useEffect(() => {
        webRTCHandler.getLocalStream()
    }, [])

    return (
       <div className="dashboard_container">
           <div className="dashboard_left_section">
               <div className="dashboard_content_container">
                   <DirectCall />
               </div>
               <div className="dashboard_rooms_container background_main_color">
                   rooms
               </div>
           </div>
           <div className="dashboard_right_section background_main_color">
               <div className="dashboard_active_users_list">
                   <ActiveUsersList />
               </div>
               <div className="dashboard_logo_container">
                   <img className="dashboard_logo_image" src={logo} alt='logo' />
               </div>
           </div>
       </div>
    )
}

export default Dashboard
