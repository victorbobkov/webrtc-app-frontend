import React from 'react'
import { connect } from 'react-redux'
import ActiveUsersListItem from './ActiveUsersListItem'
import './ActiveUsersList.css'

const ActiveUsersList = ({ activeUsers }) => {
    return (
        <div className="active_user_list_container text_main_color">
            {activeUsers.map((activeUser) =>
                <ActiveUsersListItem
                    key={activeUser.socketId}
                    activeUser={activeUser}
                />
            )}
        </div>
    )
}

const mapStateToProps = ({dashboard}) => ({
    ...dashboard
})

export default connect(mapStateToProps)(ActiveUsersList)
