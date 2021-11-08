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
