import React, { useState } from 'react'
import { connect } from 'react-redux'
import logo from '../resources/logo.png'
import UsernameInput from './UsernameInput'
import SubmitButton from './SubmitButton'
import { useHistory } from 'react-router-dom'
import { setUsername } from '../store/actions/dashboardActions'
import { registerNewUser } from '../utils/wssConnection'
import './LoginPage.css'

const LoginPage = ({saveUsername}) => {
    const [username, setUsername] = useState('')

    const history = useHistory()

    const handleSubmit = () => {
        registerNewUser(username)
        saveUsername(username)
        history.push('/dashboard')
    }

    return (
       <div className="login-page_container background_main_color">
           <div className="login-page_login_box background_form_color">
               <div className="login-page_logo_container">
                   <img className="login-page_logo_image" src={ logo } alt="logo"/>
               </div>
               <div className="login-page_title_container">
                   <h2 className="text_main_color">Войти на сайт</h2>
               </div>
               <UsernameInput username={ username } setUsername={ setUsername }/>
               <SubmitButton handleSubmit={ handleSubmit }/>
           </div>
       </div>
    )
}

const mapActionsToProps = (dispatch) => {
    return {
        saveUsername: username => dispatch(setUsername(username))
    }
}

export default connect(null, mapActionsToProps)(LoginPage)
