import * as callActions from '../actions/callActions'

const initialState = {
    localStream: null,
    callState: callActions.callStates.CALL_UNAVAILABLE,
    callingDialogVisible: false,
    callerUsername: '',
    callRejected: {
        rejected: false,
        reason: ''
    },
    remoteStream: null,
    localMicrophoneEnabled: true,
    localCameraEnabled: true,
    screenSharingActive: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case callActions.CALL_SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.localStream
            }
        case callActions.CALL_SET_CALL_STATE:
            return {
                ...state,
                callState: action.callState
            }
        case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
            return {
                ...state,
                callingDialogVisible: action.visible
            }
        case callActions.CALL_SET_CALLER_USERNAME:
            return {
                ...state,
                callerUsername: action.callerUsername
            }
        case callActions.CALL_SET_CALL_REJECTED:
            return {
                ...state,
                callRejected: action.callRejected
            }
        case callActions.CALL_SET_REMOTE_STREAM:
            return {
                ...state,
                remoteStream: action.remoteStream
            }
        case callActions.CALL_SET_LOCAL_MICROPHONE_ENABLED:
            return {
                ...state,
                localMicrophoneEnabled: action.enabled
            }
        case callActions.CALL_SET_LOCAL_CAMERA_ENABLED:
            return {
                ...state,
                localCameraEnabled: action.enabled
            }
        case callActions.CALL_SET_SCREEN_SHARING_ACTIVE:
            return {
                ...state,
                screenSharingActive: action.active
            }
        default:
            return state
    }
}

export default reducer
