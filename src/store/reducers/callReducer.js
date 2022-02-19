import * as callActions from '../actions/callActions'

const initialState = {
    localStream: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case callActions.CALL_SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.localStream
            }
        default:
            return state
    }
}

export default reducer
