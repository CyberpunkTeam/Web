const serviceUrl = "https://apigateway-wpyxm22hfq-uc.a.run.app/"

export const post = (endpoint, body, context) => {
    const token = localStorage.getItem("auth_token")
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (token !== null ){
       headers["X-Tiger-Token"] = "Bearer " + token
    }

    return fetch(serviceUrl + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }).then(
        response => {
            if (response.headers.has("token-refresh")){
                localStorage.setItem("auth_token", response.headers.get("token-refresh"))
            }
            return response.json().then(
                data => {
                    if (response.status >= 400) {
                        return undefined
                    }
                    return data
                }
            )
        }
    ).catch(errors => console.log(errors))
}

export const get = (endpoint, context) => {
    const token = localStorage.getItem("auth_token")
    let headers = {
        'Accept': 'application/json',
    }
    if (token !== null ){
        headers["X-Tiger-Token"] = "Bearer " + token
    }
    return fetch(serviceUrl + endpoint, {
        method: 'GET',
        headers: headers
    }).then(
        response => {
            if (response.headers.has("token-refresh")){
                localStorage.setItem("auth_token", response.headers.get("token-refresh"))
            }
            return response.json().then(
                data => {
                    if (response.status >= 400) {
                        return undefined
                    }
                    return data
                }
            )
        }
    ).catch((error) => {return error})
}

export const put = (endpoint, body, context) => {
    const token = localStorage.getItem("auth_token")
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (token !== null ){
        headers["X-Tiger-Token"] = "Bearer " + token
    }
    return fetch(serviceUrl + endpoint, {
        method: 'PUT',
        headers: headers,
        body: body !== undefined ? JSON.stringify(body): null
    }).then(
        response => {
            if (response.headers.has("token-refresh")){
                localStorage.setItem("auth_token", response.headers.get("token-refresh"))
            }
            return response.json().then(
                data => {
                    if (response.status >= 400) {
                        return undefined
                    }
                    return data
                }
            )
        }
    ).catch(errors => console.log(errors))
}

export const erase = (endpoint, context) => {
    const token = localStorage.getItem("auth_token")
    let headers = {
        'Accept': 'application/json',
    }
    if (token !== null ){
        headers["X-Tiger-Token"] = "Bearer " + token
    }
    return fetch(serviceUrl + endpoint, {
        method: 'DELETE',
        headers: headers
    }).then(
        response => {
            if (response.headers.has("token-refresh")){
                localStorage.setItem("auth_token", response.headers.get("token-refresh"))
            }
            return response.json().then(
                data => {
                    if (response.status >= 400) {
                        return undefined
                    }
                    return data
                }
            )
        }
    ).catch((error) => {return error})
}
