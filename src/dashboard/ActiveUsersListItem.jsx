import React from 'react'
import userAvatar from '../resources/userAvatar.png'

const ActiveUsersListItem = ({ activeUser }) => {
    
    const handleClick = () => {
        // call to other user
    }
    
    return (
        <div className='active_user_list_item' onClick={handleClick}>
            <div className='active_user_list_image_container'>
                <img className='active_user_list_image' src={userAvatar} alt='avatar' />
            </div>
            <span className='active_user_list_text'>
                {activeUser.username}
            </span>
        </div>
    )
}

export default ActiveUsersListItem