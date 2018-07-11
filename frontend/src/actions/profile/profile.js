import axios from 'axios'

import{GET_MY_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES} from './types'

//Get my profile

export const getMyProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get("/api/profile")
    .then(res => dispatch({
        type : GET_MY_PROFILE,
        payload : res.data
    })).catch(err => dispatch({
        type : GET_MY_PROFILE,
        payload : {}
    }))
}

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get("/api/profile/all")
    .then(res => dispatch({
        type : GET_PROFILES,
        payload : res.data
    })).catch(err => dispatch({
        type : GET_PROFILES,
        payload : null
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

export const createProfile = (data, history) => dispatch => {
    axios.post("/api/profile", data)
    .then(res => history.push("/dashboard"))
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    )
}

export const addExperience = (data, history) => dispatch => {
    axios.post("/api/profile/experience", data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
}

export const deleteExperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
    .then(res => dispatch({
        type : GET_MY_PROFILE,
        payload : res.data
    }))
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
}

export const addEducation = (data, history) => dispatch => {
    axios.post("/api/profile/education", data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
}

export const deleteEducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`)
    .then(res => dispatch({
        type : GET_MY_PROFILE,
        payload : res.data
    }))
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
}

export const deleteUserAccount = () => dispatch => {
    if(window.confirm('Confirm to delete account')){
        axios.delete('/api/profile')
        .then(res => dispatch({
            type : SET_CURRENT_USER,
            payload : {}
        })).catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
    }
}

export const getProfileByHandle = (handle) => dispatch => {
    axios.get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({
        type : GET_MY_PROFILE,
        payload : res.data
    })).catch(err => dispatch({
        type : GET_MY_PROFILE,
        payload : null
    }))
}

