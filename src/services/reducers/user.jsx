import {
    USER_FAILED,
    USER_GET_REQUEST,
    USER_GET_INFO,
    USER_SET_AUTH,
    USER_SUCCESS,
    USER_DELETE_AUTH,
    USER_CHANGE_INFO,
    USER_SET_FORGOT_DIRECTION
} from "../actions/user";
import {deleteCookie, getCookie, setCookie} from "../../utils/utils";

const initialState = {
    authRequest: false,
    authFailed: false,
    user: {
        name: "",
        email: ""
    },
    isAuth: Boolean(getCookie('token')),
    fromForgotPage: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SET_FORGOT_DIRECTION:
            console.log('МЫ тут');
            console.debug()
            return {
                ...state,
                fromForgotPage: action.wayfrom
            }
        case USER_FAILED:
            return {
                ...state,
                authFailed: true
            }
        case USER_GET_REQUEST:
            return {
                ...state,
                authRequest: true
            }
        case USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                authRequest: false,
                authFailed: false,
                isAuth: true
            }
        case USER_GET_INFO:
            return {
                ...state,
                user: action.payload.user
            }
        case USER_SET_AUTH:
            setCookie('token', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                isAuth: true,
            }
        case USER_DELETE_AUTH:
            deleteCookie('token');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                isAuth: false
            }
        case USER_CHANGE_INFO:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
}
