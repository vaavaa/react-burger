import {checkResponse, getUser, patchUser, setData} from "../../utils/server";
import {apiURL} from "../../utils/config";

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_GET_INFO';
export const USER_GET_INFO = 'USER_GET_INFO';
export const USER_SET_AUTH = 'USER_SET_AUTH';
export const USER_DELETE_AUTH = 'USER_DELETE_AUTH';
export const USER_CHANGE_INFO = 'USER_CHANGE_INFO';
export const USER_SET_FORGOT_DIRECTION = 'USER_SET_FORGOT_DIRECTION';


export const postForgotPassword = (emailValue) => {
    return function (dispatch) {
        dispatch({type: USER_GET_REQUEST});
        setData({
            url: `${apiURL}/password-reset`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {email: emailValue}
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch({type: USER_SET_FORGOT_DIRECTION, wayfrom: true});
                    } else {
                        dispatch({
                            type: USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
                alert(err.message);
                dispatch({
                    type: USER_FAILED
                })
            })
    }
}

export const postResetPassword = (formData, history) => {
    return function (dispatch) {
        dispatch({type: USER_GET_REQUEST});
        setData({
            url: `${apiURL}/password-reset/reset`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                password: formData.password,
                token: formData.token
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        history.push('/login');
                    } else {
                        dispatch({
                            type: USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
                alert(err.message);
                dispatch({
                    type: USER_FAILED
                })
            })
    }
}

export const postRegister = (formData, history) => {
    return function (dispatch) {
        dispatch({type: USER_GET_REQUEST});
        setData({
            url: `${apiURL}/auth/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: formData.email,
                password: formData.password,
                name: formData.name
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: USER_SUCCESS,
                            payload: {
                                user: res.user
                            }
                        });
                        dispatch({
                            type: USER_SET_AUTH,
                            payload: {
                                accessToken: res.accessToken,
                                refreshToken: res.refreshToken
                            }
                        })
                        history.push({pathname: "/"});
                    } else {
                        dispatch({
                            type: USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
                alert(err.message);
                dispatch({type: USER_FAILED});
            })
    }
}

export const postLogin = (formData, history, from) => {
    return function (dispatch) {
        dispatch({
            type: USER_GET_REQUEST
        })
        setData({
            url: `${apiURL}/auth/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: formData.email,
                password: formData.password,
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: USER_SUCCESS,
                            payload: {
                                user: res.user
                            },
                        });
                        dispatch({
                            type: USER_SET_AUTH,
                            payload: {
                                accessToken: res.accessToken,
                                refreshToken: res.refreshToken
                            }
                        })
                        history.replace(from)
                    } else {
                        dispatch({
                            type: USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
                alert(err.message);
                dispatch({
                    type: USER_FAILED
                })
            })
    }
}

export const postLogout = (history) => {
    return function (dispatch) {
        dispatch({
            type: USER_GET_REQUEST
        })
        setData({
            url: `${apiURL}/auth/logout`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                token: localStorage.getItem('refreshToken'),
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: USER_DELETE_AUTH
                        })
                        history.replace({pathname: '/login'})
                    } else {
                        dispatch({
                            type: USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
                alert(err.message);
                dispatch({
                    type: USER_FAILED
                })
            })
    }
}

export const getUserInfo = () => {
    return async function (dispatch) {
        dispatch({
            type: USER_GET_REQUEST
        })
        await getUser()
            .then(res => {
                    if (res && res.success)
                        dispatch({
                            type: USER_GET_INFO,
                            payload: {
                                user: res.user
                            }
                        });
                    else dispatch({type: USER_FAILED});

                }
            )
            .catch(err => {
                console.log(err);
                dispatch({type: USER_FAILED});
            })
    }
}

export const postUserInfo = (formData) => {
    return async function (dispatch) {
        dispatch({type: USER_GET_REQUEST});
        await patchUser(formData)
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: USER_CHANGE_INFO,
                            payload: {
                                user: res.user
                            }
                        })
                    } else {
                        dispatch({
                            type: USER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
                dispatch({type: USER_FAILED});
            })
    }
}
