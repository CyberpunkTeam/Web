const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/projects/"

export const createProject = (body) => {
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

export const getProject = (pid) => {
    return fetch(serviceUrl + pid, {
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

export const getProjects = () => {
    return fetch(serviceUrl, {
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
