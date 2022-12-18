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
