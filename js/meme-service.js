



let gMemeIdx = 1
let gMeme =
{
    id: gMemeIdx,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


var gImgs = [{ id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'images/2.jpg', keywords: ['funny', 'cat'] },
{ id: 3, url: 'images/3.jpg', keywords: ['funny', 'cat'] },
{ id: 4, url: 'images/4.jpg', keywords: ['funny', 'cat'] },
{ id: 5, url: 'images/5.jpg', keywords: ['funny', 'cat'] },
{ id: 6, url: 'images/6.jpg', keywords: ['funny', 'cat'] },
{ id: 7, url: 'images/7.jpg', keywords: ['funny', 'cat'] }
];




function getImages() {
    return gImgs

}

function getLineText(value) {
    gMeme.lines[0].txt = value
    console.log('gMeme', gMeme);

}


function getMemeLine() {
    // console.log(gMeme.lines);
    let lines = gMeme.lines[0].txt
    return lines
    // return gMeme
}


// function _createMeme() {
//     return
// }














// var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
// var gMeme = {
//  selectedImgId: 5,
//  selectedLineIdx: 0,






//  lines: [
//  {
//  txt: 'I sometimes eat Falafel',
//  size: 20,
//  align: 'left',
//  color: 'red'
//  }
//  ]
// }