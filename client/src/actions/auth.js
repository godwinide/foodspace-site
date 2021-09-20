import axios from 'axios'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from './types'


// login
export const login = data => dispatch => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    })
};

// logout
export const logout = () => dispatch => {
    console.log("clicked")
    dispatch({
        type: LOGOUT_SUCCESS
    })
}


// check token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING})
    axios.get("/admin/loaduser", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data.user
            })
        }).catch(() => {
            dispatch({type: AUTH_ERROR});
    })
} 

export const tokenConfig = (getState = "") => {
    // get token from localstorage
    const token =  getState().auth.token || localStorage.getItem("token");
    const config = {
        headers:{
            'Content-type': "application/json"
        },
        timeout: 30000
    }
    // if token add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
}