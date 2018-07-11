import {
    GET_MY_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_PROFILES
} from '../../actions/profile/types'

const initialState = {
    profile: null,
    profiles: null,
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_MY_PROFILE:
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                isLoading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: {}
            }
        default:
            return state
    }
}