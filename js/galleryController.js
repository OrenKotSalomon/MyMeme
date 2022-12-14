




function renderImages() {
    let images = getImages()
    console.log('images', images);
    const strHTML = images.map(img =>
        `<img id="${img.id}" onclick="onImgSelect(${img.id},this)" src="${img.url}">`
    )
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML += strHTML.join('')

}