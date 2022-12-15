




function renderImages() {
    let images = getImages()
    console.log('images', images);
    const strHTML = images.map(img =>
        `<img id="${img.id}" onclick="onImgSelect(${img.id},this)" src="${img.url}">`
    )
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML += strHTML.join('')

}


function downloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpg') // image/jpeg the default format
    elLink.href = imgContent
}




function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
            onSuccess(url)
        })
}
