import {LOGOUT_USER,REGISTER_USER,AUTH_USER, LOGIN_USER} from '../_actions/type'

export default function(state={}, action){
    switch(action.type){
        case REGISTER_USER: 
            return {...state, register: action.payload}
        case LOGIN_USER: 
            return {...state, loginSuccess: action.payload}
        case AUTH_USER:
            return {...state, userData: action.payload}
        case LOGOUT_USER:
            return {...state}
        default:
            return false
    }
}