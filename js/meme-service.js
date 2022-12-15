


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
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            x: 200,
            y: 50,
            isDrag: false
        },
        {
            txt: 'I  eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            x: 200,
            y: 450,
            isDrag: false
        }

    ]
}





function moveLine(pos) {
    let lineIdx = gMeme.selectedLineIdx
    let line = gMeme.lines[lineIdx]

    line.x = pos.x
    line.y = pos.y
    // console.log('line', line);

}

function setLineDrag(isDrag) {
    let lineIdx = gMeme.selectedLineIdx
    let line = gMeme.lines[lineIdx]
    // console.log('isDrag', isDrag);

    line.isDrag = isDrag
}

function switchLines() {

    // console.log(gMeme.lines.length);
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++
    } else {
        gMeme.selectedLineIdx = 0
    }

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
    // console.log('', );
    let selectedLine = gMeme.selectedLineIdx

    gMeme.lines[selectedLine].size++
    // console.log('gMeme', gMeme.lines[selectedLine].size);

}
function decreaseFont() {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].size--
    // console.log('gMeme', gMeme.lines[selectedLine].size);
}


function getCurrImg() {
    let currUrl = gImgs.find(img => img.id === gMeme.id)
    // console.log('currUrl', currUrl);

    return currUrl.url
}

function getMemeLine() {
    // console.log(gMeme.lines);
    let selectedLine = gMeme.selectedLineIdx
    let lines = gMeme.lines[selectedLine].txt
    return lines
    // return gMeme
}


// function _createMeme() {
//     return
// }














// var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
// var gMeme = {
//  selectedImgId: 5,
//  selectedLineIdx: selectedLineIdx,






//  lines: [
//  {
//  txt: 'I sometimes eat Falafel',
//  size: 20,
//  align: 'left',
//  color: 'red'
//  }
//  ]
// }