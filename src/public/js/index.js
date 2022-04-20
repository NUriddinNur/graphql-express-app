const profilImg = window.localStorage.getItem('profilImg')

if(profilImg) {
    avatar.src = backendApi + profilImg
}

let interval

function renderVideo(videos) {
    
        if(renderVideo.videos?.length == videos.length) {
            if(JSON.stringify(renderVideo.videos) == JSON.stringify(videos)) {
			return
		}
	}

	renderVideo.videos = videos
    listVidio.innerHTML = ''
    let list = ''
    for (let video of videos) {
        list += `
            <li class="iframe">
                <video src="${backendApi + video.videoUrl}" controls=""></video>
                <div class="iframe-footer">
                    <img src="${backendApi + video.userImg}" alt="channel-icon">
                        <div class="iframe-footer-text">
                        <h2 class="channel-name">${video.userName}</h2>
                        <h3 class="iframe-title">${video.videoTitle}</h3>
                        <time class="uploaded-time">${video.videoCreateDate}</time>
                        <a class="download" href="#">
                        <a class="download" href="${backendApi + '/download?videoPath=' + video.videoUrl}">
                        <span>${video.videoSize} MB</span>
                    <img src="./img/download.png">
                        </a>
                    </div>                  
                </div>
            </li>  
        `
        }
        listVidio.innerHTML = list
}

function renderUsers(users) {
    if(renderUsers.users?.length == users.length) {
        if(JSON.stringify(renderUsers.users) == JSON.stringify(users)) {
        return
	    }
    }

    renderUsers.users = users

    for (let user of users) {
        let li = document.createElement('li')
		li.innerHTML = `
            <a href="#">
                <img src="${backendApi + user.profilImg}" alt="channel-icon" width="30px" height="30px">
                <span>${user.username}</span>
            </a>
		`
		li.onclick = async () => {
            const formData = new FormData()
	        formData.append('userId', user.userId)
            let {videos} = await request(`/data?userId=${user.userId}`, 'GET')

            clearInterval(interval)
            renderVideo(videos);
        }
		userList.append(li)
	}
}

async function start() {
    interval = setInterval( async () => {
        let data = await request('/data', 'GET')
        if(data) {
            let {videos, users} = data
            renderVideo(videos)
            renderUsers(users)
        }else {
            clearInterval(interval)
            start()
        }
    }, 500)
}

home.onclick = () => {
    clearInterval(interval)
    start()
}

exitIcon.onclick = () => {
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('profilImg', '')
    window.location = '/'
}


serchForm.onclick = (event) => {
    event.preventDefault()
        if(searchInput.value != "") {
            search(searchInput.value)            
        }
}

async function search(data) {

    let {videos} = await request(`/data?search=${data}`, 'GET')
        clearInterval(interval)
        renderVideo(videos);
}



// let voice = new webkitSpeechRecognition()


// voice.lang = 'uz-UZ'
// voice.continious = false

// voice.onresult = event => {
//     console.log(event);
//     search(event.results[0][0].transcript)
// }

// voiceBtn.onclick = () => {
//     voice.start()
//     clearInterval(interval)
// }

start()






