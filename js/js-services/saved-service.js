let STORAGE_KEY = 'memeDB'
let gSavedMemes = loadFromStorage(STORAGE_KEY)
let gElImg
let gCurrSavedImg
function saveMemeToStorage() {
    let meme = getMeme()
    if (!gSavedMemes) {
        gSavedMemes = []
    }
    let image = gCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    meme.img = image
    meme.id = makeId(length = 6)
    const currMeme = { ...meme }
    gSavedMemes.push(currMeme)
    saveToStorage(STORAGE_KEY, gSavedMemes)

}

function getSavedMemes() {
    return gSavedMemes
}



function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function deleteSavedMeme(elImg) {
    console.log(elImg);
    console.log('gSavedMemes', gSavedMemes);
    let imgIdx = gSavedMemes.findIndex(img => img.id === elImg.id)
    gSavedMemes.splice(imgIdx, 1)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function getCurrSavedImg(elSavedImg) {
    gElImg = elSavedImg
    saveCurrMeme()
}


function getSavedImgSrc() {
    return gCurrSavedImg.src
}

function saveCurrMeme() {

    let savedId = gElImg.id

    let currMeme = gSavedMemes.find(meme => meme.id === savedId)


    gCurrSavedImg = currMeme
}

function getSavedMeme() {


    if (!gCurrSavedImg) return
    else return gCurrSavedImg

}
