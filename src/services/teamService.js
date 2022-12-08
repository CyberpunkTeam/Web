const serviceUrl = "https://teams-wt22wsppsq-uc.a.run.app/"

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
            console.log(response)
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
            console.log(response)
            return response.json().then(
                data => {
                    return data
                }
            )
        }
    ).catch(errors => console.log(errors))
}
