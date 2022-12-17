
function renderImages() {
    let images = getImages()
    console.log('images', images);

    console.log('images', images);
    const strHTML = images.map(img =>
        `<img id="${img.id}" onclick="onImgSelect(${img.id},this)" src="${img.url}">`
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
            console.log('url:', url)
            onSuccess(url)
        })
}

function toggleMenu() {
    let elNav = document.querySelector('.link-container')
    elNav.classList.toggle('hide')
}