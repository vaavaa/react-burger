import {getCookie, setCookie} from "./utils";
import {apiURL} from "./config";

export const setData = async (options) => {
    return await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    })
}

export const getData = async (url) => {
    return await fetch(url)
}

export const refreshToken = () => {
    return fetch(`${apiURL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshedData = await refreshToken(); //обновляем токен
            localStorage.setItem("refreshToken", refreshedData.refreshToken);
            setCookie("token", refreshedData.accessToken);
            options.headers.authorization = refreshedData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const patchUser = async (formData) => {
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('token')
        },
        body: JSON.stringify(formData)
    })
}

export const getUser = async () => {
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('token')
        }
    })
}
