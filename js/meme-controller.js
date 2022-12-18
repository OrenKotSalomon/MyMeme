let gCanvas
let gCtx
let gCurrPos
let gImgFromUser
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
    getCanvas(gCanvas)
    addListeners()
    mapLines()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
    mapLines()
}

function onClickFilterWord(elWord) {
    let word = elWord.innerText.toLowerCase()
    console.log('elWord', elWord.innerText);
    setFilterByClick(word)
    renderImages()
}

function onSetFilterBy(elValue) {
    let txt = elValue.toLowerCase()
    console.log('txt', txt);
    setFilerBy(txt)
    renderImages()
}

function onChangeText(ev) {
    let input = ev.target
    let value = input.value
    setLineTxt(value)
    renderMeme()
}

function onRandomMeme() {
    let imgs = getImages()
    onImgSelect(getRandomIntInclusive(1, imgs.length - 1))
}

function onDownloadMeme() {
    renderMeme()
    downloadImg(elLink)
}

function onSelectFont(elFont) {
    setFont(elFont)
    renderMeme()
}

function onImgSelect(elImgId, elImg) {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    elGallery.classList.add('hidden')
    elEditor.classList.remove('hidden')
    setImg(elImgId)
    renderMeme()
}
function OnChangeBgc(ev) {
    let input = ev.target
    let vlaue = input.value
    setColor(vlaue)
    renderMeme()
}

function onChangeStroke(ev) {
    let input = ev.target
    let vlaue = input.value
    setStroke(vlaue)
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function renderLines() {
    let meme = getMeme()
    let lines = meme.lines

    lines.forEach((line, idx) => {
        gCtx.beginPath()
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        gCtx.lineWidth = 4
        gCtx.strokeStyle = line.stroke
        gCtx.strokeText(line.txt, line.x, line.y)
        gCtx.fillText(line.txt, line.x, line.y)
        if (idx === meme.selectedLineIdx) {
            let txt = gCtx.measureText(line.txt)
            gCtx.beginPath()
            let rectX = line.x - txt.actualBoundingBoxLeft - 15
            let rectY = line.y - txt.fontBoundingBoxAscent - 10
            let rectWidth = txt.width + 30
            let rectHeigth = txt.fontBoundingBoxAscent + 30
            gCtx.strokeRect(rectX, rectY, rectWidth, rectHeigth)
            gCtx.lineWidth = 3
            getRect(rectX, rectY, rectWidth, rectHeigth)
        }
    });
}

function onSwitchLines() {
    switchLines()
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        getCanvas(gCanvas)
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function clickedLine(ev) {
    let meme = getMeme()
    let lineIdx = meme.selectedLineIdx
    let x = ev.offsetX
    let y = ev.offsetY

    let lines = gMeme.lines
    let currLine = lines.findIndex(line =>
        x > line.rect.rectX &&
        x < (line.rect.rectX + line.rect.rectWidth)
        && y > line.rect.rectY &&
        y < (line.rect.rectY + line.rect.rectHeigth)
    )

    if (currLine === -1) return
    else {
        getClickedLine(currLine)
        renderMeme()
    }

}




function onDown(ev) {
    const pos = getEvPos(ev)
    clickedLine(ev)
    if (!isLineClicked(pos)) return
    renderMeme()
    setLineDrag(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    const { selectedLineIdx, lines } = meme
    const isDrag = lines[selectedLineIdx].isDrag
    if (!isDrag) return
    const pos = getEvPos(ev)
    gCurrPos = pos
    moveLine(pos)
    renderMeme()
}




function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        console.log('ev', ev);
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }


    }
    return pos
}

function renderMeme() {
    let currImg = getCurrImg()
    let currSavedImg = getSavedMeme()
    const img = new Image()
    if (!currImg) {
        img.src = currSavedImg.img
    }
    else img.src = currImg.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderLines()
    }
}

function onSaveMeme() {
    saveMemeToStorage()
    const elSavedGallery = document.querySelector('.saved-gallery-container')
    const elEditor = document.querySelector('.editor-container')
    elSavedGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
    renderSavedGallery()
}

function onClickAling(elAlign) {
    console.log('elAlign', elAlign);
    setAlign(elAlign)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function onShareImg() {
    const imgDataUrl = gCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function onClickMemesPage() {
    const elSavedGallery = document.querySelector('.saved-gallery-container')
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    elSavedGallery.classList.remove('hidden')
    elGallery.classList.add('hidden')
    elEditor.classList.add('hidden')
    renderSavedGallery()
}


function onImgInput(ev) {
    loadImageFromInput(ev)
}

