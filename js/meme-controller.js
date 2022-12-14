let gCanvas
let gCtx



function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
}





function renderImages() {
    let images = getImages()
    console.log('images', images);
    const strHTML = images.map(img =>
        `<img id="${img.id}" onclick="onImgClick(this)" src="${img.url}">`
    )
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML += strHTML.join('')

}


function onChangeText(ev) {
    console.log('ev', ev);
    let input = ev.target
    let value = input.value
    getText(value)
}




function onImgClick(elImg) {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')

    elGallery.classList.add('hidden')
    elEditor.classList.remove('hidden')
    renderMeme(elImg.src)
}




function renderMeme(src) {
    const img = new Image()
    img.src = src
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gCtx.font = "30px Arial"
        gCtx.fillText('Hello world', 10, 50) //img,x,y,xEnd,yEnd
    }
}



