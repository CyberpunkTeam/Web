const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/"

export const createUser = (body) => {
    return fetch(serviceUrl + "users/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(
        response => {
            return response.json().then(
                data => {
                    return data
                }
            )
        }
    ).catch(errors => console.log(errors))
}

export const getUser = (uid) => {
    return fetch(serviceUrl + "users/" + uid, {
        method: 'GET'
    }).then(
        response => {
            return response.json().then(
                data => {
                    if (response.status === 404) {
                        return {}
                    }
                    return data
                }
            )
        }
    ).catch((error) => {return error})
}

export const getProfile = (uid) => {
    return fetch(serviceUrl + "profiles/" + uid, {
        method: 'GET'
    }).then(
        response => {
            return response.json().then(
                data => {
                    if(response.status === 404) {
                        return {}
                    }

                    return data
                }
            )
        }
    ).catch((error) => {return error})
}

export const getUsers = () => {
    return fetch(serviceUrl + "users/", {
        method: 'GET'
    }).then(
        response => {
            return response.json().then(
                data => {
                    if (response.status === 404) {
                        return {}
                    }

                    return data
                }
            )
        }
    ).catch((error) => {return error})
}

export const updateUser = (uid, body) => {
    return fetch(serviceUrl + "users/" + uid, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(
        response => {
            return response.json().then(
                data => {
                    return data
                }
            )
        }
    ).catch(errors => console.log(errors))
}
