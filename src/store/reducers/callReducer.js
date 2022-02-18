import * as callActions from '../actions/callActions'

const initialState = {
    localSteam: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case callActions.CALL_SET_LOCAL_STREAM:
            return {
                ...state,
                localSteam: action.localSteam
            }
        default:
            return state
    }
}

export default reducer
