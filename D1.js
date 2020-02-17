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

/*const model = new mi.ArbitraryStyleTransferNetwork();
const canvas = document.getElementById('resCanvas');
const ctx = canvas.getContext('2d');
const contentImg = document.getElementById('contimg');
const styleImg = document.getElementById('styleimg');

$(".btn-transfer").click(function () {
    model.initialize().then(() => {
      stylize();
    });
  });
   
  async function stylize() {
    //await clearCanvas();
     
    // Resize the canvas to be the same size as the source image.
    canvas.width = contentImg.width;
    canvas.height = contentImg.height;
     
    // This does all the work!
    model.stylize(contentImg, styleImg).then((imageData) => {
      ctx.putImageData(imageData, 0, 0);
    });
  }*/

  function drawPage(markers){
          
    if (markers.length !=0){
      var corners, corner, i, j;
      context.lineWidth = 5;
      for (i = 0; i != markers.length; i++){
        corners = markers[i].corners;
        context.strokeStyle = "purple";
        var angle = Math.atan2(corners[1].y-corners[0].y,corners[1].x-corners[0].x);
        //context.beginPath();

        x1 = corners[2].x;
        y1 = corners[2].y;
        var markersize = Math.sqrt((x1- corners[1].x)**2+(y1 - corners[1].y)**2);
        var offsetX = 3*markersize;
        var offsetY = 4*markersize;
      
        var points = getRectFourPoints(x1,y1,-offsetX,offsetY,angle); 

        //context.moveTo(points.first.x,points.first.y);
        //context.lineTo(points.sec.x,points.sec.y);

        //context.moveTo(points.sec.x,points.sec.y);
        //context.lineTo(points.fourth.x,points.fourth.y);

        //context.moveTo(points.fourth.x,points.fourth.y);
        //context.lineTo(points.third.x,points.third.y);

        //context.moveTo(points.third.x,points.third.y);
        //context.lineTo(points.first.x,points.first.y);

        //context.stroke();
        //context.closePath();
        
        detectionToCanvas(x1,y1,points, offsetX, offsetY, angle, markersize);
      }
    }
  }
  function point(x, y, canvas){
    canvas.strokeStyle = "yellow";
    canvas.beginPath();
    canvas.moveTo(x-2, y-2);
    canvas.lineTo(x+2, y+2);
    canvas.moveTo(x-2, y+2);
    canvas.lineTo(x+2, y-2);
    canvas.stroke();
  }
  var xx,yy,wz,hz;
  function detectionToCanvas(x,y,points, widthz, heightz, angle, markersize){
      
      canvasRes.width = canvas.width
      canvasRes.height = canvas.height
      
      contextRes.translate(canvas.width/2,canvas.height/2);
      contextRes.rotate(-angle);            
      contextRes.drawImage(canvas,-canvas.width/2,-canvas.height/2);   
        
      var offx = canvasRes.width/2-points.fourth.x;
      var offy = canvasRes.height/2-points.fourth.y;

      var offx2 = canvasRes.width/2-points.third.x;
      var offy2 = canvasRes.height/2-points.third.y;

      var offx3 = canvasRes.width/2-points.first.x;
      var offy3 = canvasRes.height/2-points.first.y;

      var offx4 = canvasRes.width/2-points.sec.x;
      var offy4 = canvasRes.height/2-points.sec.y;

      contextRes.font = "30px Arial";
      str1 = ''.concat(Math.round(offx).toString()," ",Math.round(offy).toString())
      contextRes.fillText(str1, -offx, -offy);
      point(0,0,contextRes)
      point(-offx,-offy,contextRes)
      //contextTep.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
      //canvasTemp.width = Math.floor(wz);
      //canvasTemp.height = Math.floor(hz); 
      //contextTep.drawImage(canvasRes,0,0,wz,hz,-xx,-yy,wz,hz);
      canvasTemp.width = canvasRes.width;
      canvasTemp.height = canvasRes.height;


      //contextTep.drawImage(canvasRes,0,0);
      //contextTep.rect(-offx,-offy,wz,hz);
      //contextTep.clip();
      //contextTep.stroke();
    }
  

    function cropImage(image, croppingCoords) {
      var cc = croppingCoords;
      var workCan = document.createElement("canvas"); // create a canvas
      canvasTemp.width = Math.floor(cc.width);  // set the canvas resolution to the cropped image size
      canvasTemp.height = Math.floor(cc.height);
        // get a 2D rendering interface
      contextTep.drawImage(image, -Math.floor(cc.x), -Math.floor(cc.y)); // draw the image offset to place it correctly on the cropped region
      image.src = workCan.toDataURL();       // set the image source to the canvas as a data URL
      return image;
  }
 

  function getRectFourPoints(x,y, width, height, ang, isDeg = false) {          
    if(isDeg) ang = ang * (Math.PI / 180)
    const points = {first: {x,y}}
    const sinAng = Math.sin(ang)	
    const cosAng = Math.cos(ang)
    let upDiff = sinAng * width
    let sideDiff = cosAng * width
    const sec = {x: x + sideDiff, y: y + upDiff}
    points.sec = sec
    upDiff = cosAng * height
    sideDiff = sinAng * height
    points.third = {x: x + sideDiff, y: y - upDiff}        
    const fourth = {x: sec.x + sideDiff, y: sec.y - upDiff}
    points.fourth = fourth
    return points
  }

  function drawId(markers){
    var corners, corner, x, y, i, j;
    
    context.strokeStyle = "blue";
    context.lineWidth = 1;
    
    for (i = 0; i !== markers.length; ++ i){
      corners = markers[i].corners;
      
      x = Infinity;
      y = Infinity;
      
      for (j = 0; j !== corners.length; ++ j){
        corner = corners[j];
        
        x = Math.min(x, corner.x);
        y = Math.min(y, corner.y);
      }

      context.strokeText(markers[i].id, x, y)
    }
  }

  function drawCorners(markers){
    var corners, corner, i, j;
  
    context.lineWidth = 3;

    for (i = 0; i !== markers.length; ++ i){
      corners = markers[i].corners;
      
      context.strokeStyle = "red";
      context.beginPath();
      
      for (j = 0; j !== corners.length; ++ j){
        corner = corners[j];
        context.moveTo(corner.x, corner.y);
        corner = corners[(j + 1) % corners.length];
        context.lineTo(corner.x, corner.y);
      }

      context.stroke();
      context.closePath();
      
      context.strokeStyle = "green";
      context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
    }
  }