import axios from 'axios'

import{GET_MY_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE} from './types'

//Get my profile

export const getMyProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get("/api/profile")
    .then(res => dispatch({
        type : GET_MY_PROFILE,
        payload : res.data
    })).catch(err => dispatch({
        type : GET_ERRORS,
        payload : {}
    }))
}

export const setProfileLoading = () => {
    return {
        type : PROFILE_LOADING
    }
}
export const clearCurrentProfile = () => {
    return {
        type : CLEAR_CURRENT_PROFILE
    }
}