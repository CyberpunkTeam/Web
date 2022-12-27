const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/invitations/teams/"

export const getTeamInvitations = (tid) => {
    return fetch(serviceUrl + "?tid=" + tid, {
        method: 'GET'
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

export const getPostulantInvitations = (uid) => {
    return fetch(serviceUrl + "?postulant_uid=" + uid, {
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

export const getPostulantTeamInvitations = (uid, tid) => {
    return fetch(serviceUrl + `?tid=${tid}&postulant_uid=${uid}` , {
        method: 'GET'
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

export const getInvitation = (tiid) => {
    return fetch(serviceUrl + tiid , {
        method: 'GET'
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

export const updateInvitation = (tiid, body) => {
    return fetch(serviceUrl + tiid, {
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
