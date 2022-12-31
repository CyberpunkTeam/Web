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

export const updateProject = (pid, body) => {
    return fetch(serviceUrl + pid, {
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

export const getPostulation = (ppid) => {
    return fetch(serviceUrl + `postulations/${ppid}`, {
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

export const getProjectPostulations = (pid) => {
    return fetch(serviceUrl + `postulations/?pid=${pid}&state=PENDING`, {
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

export const getTeamPostulations = (tid) => {
    return fetch(serviceUrl + `postulations/?tid=${tid}`, {
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
