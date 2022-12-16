


var gImgs = [{ id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'images/2.jpg', keywords: ['funny', 'cat'] },
{ id: 3, url: 'images/3.jpg', keywords: ['funny', 'cat'] },
{ id: 4, url: 'images/4.jpg', keywords: ['funny', 'cat'] },
{ id: 5, url: 'images/5.jpg', keywords: ['funny', 'cat'] },
{ id: 6, url: 'images/6.jpg', keywords: ['funny', 'cat'] },
{ id: 7, url: 'images/7.jpg', keywords: ['funny', 'cat'] }
];
// let gMemeIdx = 1
let gMeme =
{
    id: 0,
    selectedLineIdx: 0,
    // var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            x: 200,
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
            x: 200,
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


function getRect(x, y, width, height) {
    let lines = gMeme.lines
    let { selectedLineIdx } = gMeme
    let rect = lines[selectedLineIdx].rect
    rect.rectX = x
    rect.rectY = y
    rect.rectWidth = width
    rect.rectHeigth = height
    console.log('rect', rect);

}

function deleteLine() {
    let lines = gMeme.lines
    lines.splice(selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0

}

function addLine() {
    let lines = gMeme.lines
    let newLine = {
        txt: 'NEW LINE',
        size: 30,
        align: 'center',
        color: 'white',
        x: 200,
        y: 225,
        isDrag: false,
        rect: {
            rectX: 0,
            rectY: 0,
            rectWidth: 0,
            rectHeigth: 0
        }
    }
    lines.push(newLine)
    console.log(lines);
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
function getClickedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}
function clickedLine(ev) {
    let lineIdx = gMeme.selectedLineIdx
    // console.log('ev', ev);

    // let x = pos.x
    // let y = pos.y
    let x = ev.offsetX
    let y = ev.offsetY
    // console.log('x', x);

    let lines = gMeme.lines
    // let rect = lines[lineIdx].rect
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


    // lines[lineIdx].isDrag = true
    console.log(' gMeme.selectedLineIdx', gMeme.selectedLineIdx);
    console.log('gmeme', gMeme.lines);

    // // lines[lineIdx].isDrag = true

    // console.log('x', x);
    // console.log('y', y);
    // console.log(' lines[lineIdx].rect.rectX', lines[lineIdx].rect.rectX);
    // console.log('lines[lineIdx].rect.rectY', lines[lineIdx].rect.rectY);
    // console.log('line.rect.rectX + line.rect.width', lines[lineIdx].rect.rectX + lines[lineIdx].rect.rectWidth);
    // console.log('line.rect.rectY - line.rect.rectHeigth', lines[lineIdx].rect.rectY + lines[lineIdx].rect.rectWidth + 50);

    // console.log('currLine', currLine);


}



function setLineTxt(value) {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].txt = value
}

function setColor(vlaue) {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].color = vlaue
}

function getMeme() {
    return gMeme
}

function getImages() {
    return gImgs
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


function getCurrImg() {
    let currUrl = gImgs.find(img => img.id === gMeme.id)


    return currUrl.url
}

function getMemeLine() {

    let selectedLine = gMeme.selectedLineIdx
    let lines = gMeme.lines[selectedLine].txt
    return lines

}















