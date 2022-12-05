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
            console.log(response)
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
            console.log(response)
            return response.json().then(
                data => {
                    return data
                }
            )
        }
    ).catch(errors => console.log(errors))
}
