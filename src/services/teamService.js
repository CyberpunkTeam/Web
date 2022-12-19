const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/"

export const createTeam = (body) => {
    return fetch(serviceUrl + "teams/", {
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
    return fetch(serviceUrl + "teams/" + uid, {
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
    return fetch(serviceUrl + "teams/" + tid + "/members/" + uid, {
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
