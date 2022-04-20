submitButton.onclick = async event => {
    event.preventDefault()

    let username = usernameInput.value.trim()
    let password = passwordInput.value.trim()

    if (!(username && password)) return

    const formData = new FormData()
	formData.append('username', username)
	formData.append('password', password)

    let response = await request('/login', 'POST', formData)

    messageText.textContent = response.message
    messageText.style.color = 'green'

    console.log(response.user.profilImg);

    window.localStorage.setItem('token', response.token)
    window.localStorage.setItem('profilImg', response.user.profilImg)
    setTimeout(() => {
        window.location = './'
    }, 1000)
}