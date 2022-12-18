




function renderSavedGallery() {
    let savedMemes = getSavedMemes()

    const strHTML = savedMemes.map(img =>
        `
        <div class=saved-img>
        <img id="${img.id}" onclick="onSavedImgSelect(this)" src="${img.img}">
        <div class="btn-saved-container">
        <button class="share" onclick="onShareImg()"><i
        class="fa-solid fa-square-share-nodes fa-lg"></i></button>
<button class="download" onclick="downloadImg(this.src)"><a href="#" class="btn"
        download="my-img.jpg"><i class="fa-solid fa-download fa-lg"></i></a></button>
                <button id="${img.id}" class="delete-btn" onclick="onDeleteSavedMeme(this)"><i class="fa-regular fa-trash-can"></i></button>
    </div>
        </div>
        `
    )
    const elImgContainer = document.querySelector('.saved-main-container')
    elImgContainer.innerHTML = strHTML.join('')

    // console.log('savedMemes', savedMemes);
}


function onSavedImgSelect(elSavedMeme) {
    getCurrSavedImg(elSavedMeme)
    const elSavedGallery = document.querySelector('.saved-gallery-container')
    const elEditor = document.querySelector('.editor-container')
    elSavedGallery.classList.add('hidden')
    elEditor.classList.remove('hidden')
    updateGmeme()
    renderMeme()

}

function onDeleteSavedMeme(elImg) {
    deleteSavedMeme(elImg)
    renderSavedGallery()
}