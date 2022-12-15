let gCanvas
let gCtx



function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
    window.addEventListener('resize', () => {

        resizeCanvas()

    })
    // resizeCanvas()


}







function onChangeText(ev) {
    console.log('ev', ev);
    let input = ev.target
    let value = input.value
    setLineTxt(value)
    renderMeme()
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
        // debugger
        if (!idx) {
            gCtx.font = `${line.size}px Impact`
            gCtx.fillStyle = line.color
            gCtx.textBaseline = line.align
            gCtx.textAlign = line.align
            gCtx.lineWidth = 10

            gCtx.strokeText(line.txt, line.x, line.y) //img,x,y,xEnd,yEnd
            gCtx.fillText(line.txt, line.x, line.y)
        }
        if (idx === 1) {
            gCtx.beginPath()
            gCtx.font = `${line.size}px Impact`
            gCtx.fillStyle = line.color
            gCtx.textBaseline = line.align
            gCtx.textAlign = line.align
            gCtx.lineWidth = 10

            gCtx.strokeText(line.txt, line.x, line.y)//img,x,y,xEnd,yEnd
            gCtx.fillText(line.txt, line.x, line.y)
        }
        // else {
        //     gCtx.beginPath()
        //     gCtx.font = `${line.size}px Arial`
        //     gCtx.fillStyle = line.color
        //     gCtx.textAlign =
        //         gCtx.strokeText(line.txt, 50, 225) //img,x,y,xEnd,yEnd
        //     gCtx.fillText(line.txt, 50, 225)
        // }
    });
}


function onSwitchLines() {
    switchLines()

}



function renderMeme() {
    let currImg = getCurrImg()

    const img = new Image()
    img.src = currImg
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderLines()
        // gCtx.textAlign = "center";
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth - 200
    gCanvas.height = elContainer.offsetHeight - 100
    renderMeme()

}


