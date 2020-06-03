import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './type';
import {ServerURL} from '../config'

// axios.interceptors.request.use(
//     config => {
//       // const { origin } = new URL(config.url);
//       const allowedOrigins = [ServerURL];
//       const token = localStorage.getItem('w_auth');  
//         if (allowedOrigins.includes(origin)) {
//         config.headers.authorization = `${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

 
export function register(data){
    const request = axios.post(`/register`,data)
                         .then(res => res.data) 
    return {
        type: REGISTER_USER,
        payload: request
    }  
}

export function login(data){
    const request = axios.post(`/login`,data)
                         .then(res => { 
                          //  localStorage.setItem("w_auth",res.data.token)    
                             return res.data
                            })

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`/auth`)
                         .then(res => res.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logout(){
    let userID = localStorage.getItem("userId")
    const request = axios.get(`/logout`)
                        .then(res => res.data)

    return {
        type: LOGOUT_USER,
        payload: request
    }
}