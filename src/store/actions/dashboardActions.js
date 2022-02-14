export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME'

export const setUserName = (username) => {
    return {
        type: DASHBOARD_SET_USERNAME,
        username
    }
}