import * as dashboardActions from '../actions/dashboardActions'

const initialState = {
    username: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case dashboardActions.DASHBOARD_SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        default:
            return state
    }
}

export default reducer