let gSavedMemes = []
let STORAGE_KEY = 'memeDB'

function saveMemeToStorage() {
    let meme = getMeme()
    let image = gCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    meme.img = image
    meme.id = makeId(length = 6)
    const currMeme = { ...meme }
    console.log('gSavedMemes', gSavedMemes);
    gSavedMemes.push(currMeme)
    console.log(gSavedMemes);
    saveToStorage(STORAGE_KEY, gSavedMemes)

}






function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
