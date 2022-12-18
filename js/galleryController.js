

function renderImages() {
    let images = getImages()
    const strHTML = images.map(img =>
        `<img class="img-select" onclick="onImgSelect(${img.id},this)" src="${img.url}">`
    )
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = strHTML.join('')
}


function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            onSuccess(url)
        })
}

function toggleMenu() {
    let elNav = document.querySelector('.link-container')
    elNav.classList.toggle('hide')
}