import {GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../../utils/token/setAuthToken"
import jwt_decode from "jwt-decode"
import axios from 'axios'

export const signUp = (data, history) => dispatch => {
    axios.post("/api/users/register", data)
    .then(res => history.push("/login"))
    .catch(err => dispatch({
      type : GET_ERRORS,
      payload : err.response.data
    }))
}

export const signIn = (data) => dispatch => {
    axios.post("/api/users/login", data)
    .then(res => {
        const {token} = res.data
        //Set localstore
        localStorage.setItem("devSocialToken", token)
        //Set token to header
        setAuthToken(token)
        //Decode token
        const decodedToken = jwt_decode(token)
        //Set current user
        dispatch(setCurrentUser(decodedToken))
    }).catch(err => {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    })
}

export const setCurrentUser = (decodedToken) => {
    return {
        type : SET_CURRENT_USER,
        payload : decodedToken
    }
}

export const signOut = () => dispatch => {
    //Clear out token
    localStorage.removeItem("devSocialToken")   

    //Clear out authorization header
    setAuthToken(false)

    dispatch(setCurrentUser({}))

}