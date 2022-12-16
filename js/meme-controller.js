let gCanvas
let gCtx
let gCurrPos

function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
    window.addEventListener('resize', () => {

        resizeCanvas()

    })
    // resizeCanvas()
    addListeners()

}


function onDeleteLine() {
    deleteLine()
    renderMeme()
}


function onAddLine() {
    addLine()
    renderMeme()
}




function onChangeText(ev) {
    // console.log('ev', ev);
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

    downloadImg(elLink)

}




function onImgSelect(elImgId, elImg) {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    setImg(elImgId)
    renderMeme()
    elGallery.classList.add('hidden')
    elEditor.classList.remove('hidden')
}
function OnChangeBgc(ev) {
    let input = ev.target
    let vlaue = input.value
    setColor(vlaue)
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
    // let memeLines = meme.lines[selectedLine]
    let lines = meme.lines
    // console.log('lines', lines);

    lines.forEach((line, idx) => {

        gCtx.beginPath()
        gCtx.font = `${line.size}px arial`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        gCtx.lineWidth = 10

        gCtx.strokeText(line.txt, line.x, line.y)
        gCtx.fillText(line.txt, line.x, line.y)
        if (idx === meme.selectedLineIdx) {
            let txt = gCtx.measureText(line.txt)
            console.log('lines', line.x, line.y);
            gCtx.beginPath()
            let rectX = line.x - txt.actualBoundingBoxLeft - 15
            let rectY = line.y - txt.fontBoundingBoxAscent - 10
            let rectWidth = txt.width + 30
            let rectHeigth = txt.fontBoundingBoxAscent + 30
            gCtx.strokeRect(rectX, rectY, rectWidth, rectHeigth)
            gCtx.lineWidth = 3
            console.log('lines', line.x - txt.actualBoundingBoxAscent, line.y);
            console.log('txt', txt);
            // console.log('idx', idx);
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
    //Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        // renderCanvas()

    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
    gCanvas.addEventListener('click', onClick)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
    // gCanvas.addEventListener('touchend', onUp)
}


function onClick(ev) {
    let pos = getEvPos()
    if (!isLineClicked(pos)) return


}

function clickedLine() {
    let pos = getEvPos()




}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos', pos);
    // console.log('gpos', gCurrPos);
    if (!isLineClicked(pos)) return
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
    console.log('gCurrPos', gCurrPos);

}




function onUp() {
    // setCircleDrag(false)
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // console.log('pos', pos);

    // // Check if its a touch ev
    // if (TOUCH_EVS.includes(ev.type)) {
    //     console.log('ev:', ev)
    //     //soo we will not trigger the mouse ev
    //     ev.preventDefault()
    //     //Gets the first touch point
    //     ev = ev.changedTouches[0]
    //     //Calc the right pos according to the touch screen
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    //     }
    // }
    return pos
}



function renderMeme() {
    let currImg = getCurrImg()

    const img = new Image()
    img.src = currImg
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderLines()
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth - 200
    gCanvas.height = elContainer.offsetHeight - 100
    renderMeme()
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function onShareImg() {
    const imgDataUrl = gCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds


    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}