import React from 'react'

const UsernameInput = ({username, setUsername}) => {

    return (
        <div className='login-page_input_container'>
            <input
                placeholder='Введите имя'
                type='text'
                value={username}
                onChange={(event => setUsername(event.target.value.trim()))}
                className='login-page_input background_main_color text_main_color'
            />
        </div>
    )
}

export default UsernameInput
