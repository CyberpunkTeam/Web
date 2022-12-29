const serviceUrl = "https://apigateway-wt22wsppsq-uc.a.run.app/searches/"

export const search = (word) => {
    return fetch(serviceUrl + '?word=' + word, {
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
