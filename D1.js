var loadContentImage= function(event,imgid,canvasid){
    var cImg = $(imgid).get(0)
    cImg.src = URL.createObjectURL(event.target.files[0])
    cImg.onload = function(){
        changeCanvasSize(imgid, canvasid)
    }
}
function changeCanvasSize(img, overlay){
    const myImg = $(img).get(0)
    const canvas = $(overlay).get(0)
    const {width, height} = myImg
    canvas.width = width
    canvas.height = height
    if (document.getElementById('first').offsetHeight < height+20) {
        document.getElementById('first').style.height = (height + 20).toString() + "px"
    }
}

function transfer(){
    startStyling(document.getElementById("contimg"),document.getElementById("styleimg") );
}
