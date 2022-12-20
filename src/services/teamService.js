const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/teams/"

export const createTeam = (body) => {
    return fetch(serviceUrl, {
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

export const getTeam = (uid) => {
    return fetch(serviceUrl + uid, {
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
    ).catch(errors => console.log(errors))
}

export const addMember = (tid, uid) => {
    return fetch(serviceUrl + tid + "/members/" + uid, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
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

export const updateTeam = (tid, body) => {
    return fetch(serviceUrl + tid, {
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
