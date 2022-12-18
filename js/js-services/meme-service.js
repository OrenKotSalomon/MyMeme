
let gFilter = { search: '' }
let gCanvasWidth
let gCanvasHeight


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 14, 'man': 12 }
var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['trump', 'mad'] },
    { id: 2, url: 'images/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'images/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'images/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'images/6.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'images/5.jpg', keywords: ['man', 'history'] },
    { id: 7, url: 'images/7.jpg', keywords: ['baby', 'black'] },
    { id: 8, url: 'images/8.jpg', keywords: ['man', 'wonka'] },
    { id: 9, url: 'images/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'images/10.jpg', keywords: ['man', 'obama'] },
    { id: 11, url: 'images/11.jpg', keywords: ['man', 'kiss'] },
    { id: 12, url: 'images/12.jpg', keywords: ['man'] },
    { id: 13, url: 'images/13.jpg', keywords: ['man', 'wine'] },
    { id: 14, url: 'images/14.jpg', keywords: ['man', 'glasses'] },
    { id: 15, url: 'images/15.jpg', keywords: ['man', 'smoke'] },
    { id: 16, url: 'images/16.jpg', keywords: ['funny', 'slap'] },
    { id: 17, url: 'images/17.jpg', keywords: ['man', 'putin'] },
    { id: 18, url: 'images/18.jpg', keywords: ['anime', 'buzz'] },
    { id: 19, url: 'images/19.jpg', keywords: ['man', 'hason'] },
    { id: 20, url: 'images/20.jpg', keywords: ['man', 'hands'] },
    { id: 21, url: 'images/21.jpg', keywords: ['baby', 'dancing'] },
    { id: 22, url: 'images/22.jpg', keywords: ['trump', 'mad'] },
    { id: 23, url: 'images/23.jpg', keywords: ['baby', 'dog'] },
    { id: 24, url: 'images/24.jpg', keywords: ['woman', 'shout'] },

];
let gMeme =
{
    id: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            x: 250,
            y: 50,
            isDrag: false,
            rect: {
                rectX: 0,
                rectY: 0,
                rectWidth: 0,
                rectHeigth: 0
            }
        },
        {
            txt: 'I  eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            x: 250,
            y: 450,
            isDrag: false,
            rect: {
                rectX: 0,
                rectY: 0,
                rectWidth: 0,
                rectHeigth: 0
            }
        }

    ]
}

function getCanvas(gCanvas) {
    let lines = gMeme.lines
    lines[0].x = gCanvas.width / 2
    lines[1].x = gCanvas.width / 2
    lines[1].y = gCanvas.height * 0.80
    if (gCanvas.width < 370) {
        return lines.forEach(line => line.size = 20)
    } else {
        return lines.forEach(line => line.size = 30)
    }

}

function getRect(x, y, width, height) {
    let lines = gMeme.lines
    let { selectedLineIdx } = gMeme
    let rect = lines[selectedLineIdx].rect
    rect.rectX = x
    rect.rectY = y
    rect.rectWidth = width
    rect.rectHeigth = height
}

function deleteLine() {
    let lines = gMeme.lines
    let LineIdx = gMeme.selectedLineIdx
    lines.splice(LineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function setAlign(alignPos) {
    let lineIdx = gMeme.selectedLineIdx
    let line = gMeme.lines[lineIdx]
    line.align = alignPos


}

function addLine() {
    let lines = gMeme.lines
    let newLine = {
        txt: 'NEW LINE',
        size: 30,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        x: getRandomIntInclusive(50, 300),
        y: 250,
        isDrag: false,
        rect: {
            rectX: 0,
            rectY: 0,
            rectWidth: 0,
            rectHeigth: 0
        }
    }
    lines.push(newLine)
}
function isLineClicked(clickedPos) {
    let lineIdx = gMeme.selectedLineIdx
    let line = gMeme.lines[lineIdx]
    let dis = Math.sqrt((line.x - clickedPos.x) ** 2 + (line.y - clickedPos.y) ** 2)

    return dis <= line.size
}

function moveLine(pos) {
    let lineIdx = gMeme.selectedLineIdx
    let line = gMeme.lines[lineIdx]
    line.x = pos.x
    line.y = pos.y

}

function setLineDrag(isDrag) {
    let lineIdx = gMeme.selectedLineIdx
    let line = gMeme.lines[lineIdx]
    line.isDrag = isDrag
}

function switchLines() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++
    } else {
        gMeme.selectedLineIdx = 0
    }
}

function mapLines() {
    let lines = gMeme.lines
    for (let i = 0; i < lines.length; i++) {
        gMeme.selectedLineIdx = i
        renderLines()
    }
}

function downloadImg(elLink) {

    const imgContent = gCanvas.toDataURL('image/jpg') // image/jpeg the default format
    elLink.href = imgContent
}

function getClickedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}
function clickedLine(ev) {
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

function setLineTxt(value) {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].txt = value
}

function setColor(value) {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].color = value
}

function setStroke(vlaue) {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].stroke = vlaue
}

function setFont(vlaue) {
    if (!vlaue) return
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].font = vlaue
}

function getMeme() {
    return gMeme
}

function getImages() {

    const imgs = gImgs
    if (!gFilter.search) return imgs
    let filteredImgs = gImgs.filter((img) =>
        img.keywords.find((kw) => kw.includes(gFilter.search))
    )
    return filteredImgs
}

function setFilterByClick(word) {
    if (word === 'all') return gFilter.search = ''
    gFilter.search = word
}

function setFilerBy(txt) {
    if (txt === undefined) return
    gFilter.search = txt
}

function setImg(id) {
    gMeme.id = id
}

function increaseFont() {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].size++
}
function decreaseFont() {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].size--
}

function updateGmeme() {
    let savedMeme = getSavedMeme()
    gMeme = savedMeme
    console.log('gMeme', gMeme);

}


function getCurrImg() {
    let currUrl = gImgs.find(img => img.id === gMeme.id)
    return currUrl
}

function getMemeLine() {
    let selectedLine = gMeme.selectedLineIdx
    let lines = gMeme.lines[selectedLine].txt
    return lines

}















