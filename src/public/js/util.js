const backendApi = 'https://youtube-back-end.herokuapp.com'

async function request(route, method, body) {
    try {

        let response = await fetch(backendApi + route, {
            method,
            headers: {
                "token": window.localStorage.getItem('token')
            },
            body: body 
        })

        if (response.status == 401) {
            window.localStorage.removeItem('token')
            window.location = './login'
            return
        }

        if (![200, 201].includes(response.status)) {
            response = await response.json()

            messageText.textContent = response.message
            messageText.style.color = 'red'
            return
        }

        return await response.json()
    } catch (error) {
        messageText.textContent = error.message
        messageText.style.color = 'red'
        return
    }
}

