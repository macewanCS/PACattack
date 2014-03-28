
var d = document.getElementById('#canvas1');
console.log("here");
paper.setup(d);
d.style = "border:1px solid #000000;";

var raster = new paper.Raster('/static/notebook/js/turtle.png');
var myEvents = ($(".myString")).text();
var startX;
var startY;
var endX;
var endY;
var drawState;
var color;
var speed;
var size;
var angle;
var command=0;
var turtlePath = new paper.Path();

raster.scale(0.5);
myEvents = myEvents.split(".");
myEvents = myEvents[0].split("'");

function updateGlobals(){
	command++;
	myEvents[command].split(",");
	startX=parseInt(myEvents[command][0]);
	startY=parseInt(myEvents[command][1]);
	endX=parseInt(myEvents[command][2]);
	endY=parseInt(myEvents[command][3]);
	drawState=parseInt(myEvents[command][4]);
	color=parseInt(myEvents[command][5]);
	speed=parseInt(myEvents[command][6]);
	size=parseInt(myEvents[command][7]);
	angle =parseInt(myEvents[command][8]);
	}

	paper.view.onFrame = function(event){
	var mag = Math.sqrt(Math.pow((endX - startX),2) + (Math.pow((endX - startX),2)));
	mag = mag * speed * event.delta;
	var xNorm = (endX - startX) / mag;
	var yNorm = (endY - startY) / mag;
	turtlePath.strokeColor = color;
	turtlePath.strokeWidth = size;
	if(drawState){
		if (((endX != startX) && (endY != startY))){
			if ( mag < (speed*event.delta)){
				turtlePath.add(new paper.Point(endX,endY));
				raster.position.x=endX;
				raster.position.y=endY;
				updateGlobals();
			}else{
				startX+=xNorm;
				startY+=yNorm;
				turtlePath.add(new paper.Point(startX+xNorm,startY+yNorm));
				raster.position.x=startX;
				raster.position.y=startY;
			}
		}
	}else{
		if (((endX != startX) && (endY != startY))){
			if ( mag < (speed*event.delta)){
				raster.position.x=endX;
				raster.position.y=endY;
				updateGlobals();
			}else{
				startX+=xNorm;
				startY+=yNorm;
				raster.position.x=startX;
				raster.position.y=startY;
			}
		}
	}
	if (angle!==0){
		if (angle < (speed * event.delta)){
			raster.rotate(angle);
			updateGlobals();
		}else{
			raster.rotate(angle*speed*event.delta);
			angle -=angle*speed*event.delta;
			}
		}
	}