const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/notifications/"
export const getNotifications = (uid) => {
    return fetch(serviceUrl + "?receiver_id=" + uid, {
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

export const sendInvitation = (body) => {
    return fetch(serviceUrl + "team_invitation/", {
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

export const viewNotifications = (notifications) => {
    return fetch(serviceUrl + "viewed/?nids=" + notifications, {
        method: 'PUT',
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

export const sendTeamPostulation = (body) => {
    return fetch(serviceUrl + "team_postulation/", {
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
