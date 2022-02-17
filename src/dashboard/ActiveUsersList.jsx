import React from 'react'
import ActiveUsersListItem from "./ActiveUsersListItem"
import './ActiveUsersList.css'

const activeUsers = [
    {
        socketId: 322,
        username: 'Valera'
    },
    {
        socketId: 333,
        username: 'Volodya'
    },
    {
        socketId: 423,
        username: 'Vasyan'
    },
    {
        socketId: 354,
        username: 'Valeria'
    },
]

const ActiveUsersList = () => {
    return (
        <div className='active_user_list_container text_main_color'>
            {activeUsers.map((activeUser) =>
                <ActiveUsersListItem
                    key={activeUser.socketId}
                    activeUser={activeUser}
                />
            )}
        </div>
    )
}

export default ActiveUsersList
