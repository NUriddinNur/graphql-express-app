form.onsubmit = async event => {
    event.preventDefault()

    let username = usernameInput.value.trim()
    let password = passwordInput.value.trim()

    const file = uploadInput.files[0]

    if (!(username && password && file)) return

    const formData = new FormData()
	formData.append('username', username)
	formData.append('password', password)
	formData.append('file', file)

	let response = await request('/register', 'POST', formData)
    messageText.textContent = response.message
    messageText.style.color = 'green'

    window.localStorage.setItem('token', response.token)
    window.localStorage.setItem('profilImg', response.profilImg)

    setTimeout(() => {
        window.location = './'
    }, 1000)
}