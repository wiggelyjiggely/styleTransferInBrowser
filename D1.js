var loadContentImage= function(event){
    var cImg = $('#contimg').get(0)
    cImg.src = URL.createObjectURL(event.target.files[0])
    cImg.onload = function(){

    }
}