import {SET_CURRENT_USER, CONFIRM_ACTIVATION} from "../../actions/authentication/types"
import isEmpty from "../../utils/validation/isEmpty"
const initialState = {
    isAuthenticated : false,
    user : {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
        return{
            ...state,
            isAuthenticated : !isEmpty(action.payload),
            user : action.payload
        }
        case CONFIRM_ACTIVATION:
        return{
            ...state,
            payload : action.payload
        }
        default:
            return state;
    }
}