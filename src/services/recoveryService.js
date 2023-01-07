export const updatePassword = (body, apikey) => {
    return fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/resetPassword?key=" + apikey, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(
        response => {
            return response.json().then(
                data => {
                    return {data: data, status: response.status}
                }
            )
        }
    ).catch(errors => console.log(errors))
}
