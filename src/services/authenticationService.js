const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/authentication"

export const createToken = (body) => {
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
