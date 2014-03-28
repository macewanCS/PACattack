var d = document.getElementById('canvas1');
paper.setup(d);
d.style = "border:1px solid #000000;";

//This is a comment

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
var command=-1;
var turtlePath = new paper.Path();

raster.scale(0.5);
myEvents = myEvents.split(",");
myEvents.pop();
console.log(myEvents);


function updateGlobals(){
	if(myEvents.length!=0){
		startX=parseInt(myEvents.shift());
		startY=parseInt(myEvents.shift());
		endX=parseInt(myEvents.shift());
		endY=parseInt(myEvents.shift());
		drawState=parseInt(myEvents.shift());
		color=parseInt(myEvents.shift());
		speed=parseInt(myEvents.shift());
		size=parseInt(myEvents.shift());
		angle=parseInt(myEvents.shift());
		console.log("update globals finished");
		}
}


updateGlobals();
console.log(startX);
console.log(angle);
raster.position.x=startX;
raster.position.y=startY;

	paper.view.onFrame = function(event){
	var mag = Math.sqrt(((endX - startX)*(endX - startX)) + ((endY - startY)*(endY - startY)));
	mag = mag * speed * event.delta*100;
	var xNorm = (endX - startX) / mag;
	var yNorm = (endY - startY) / mag;
	//turtlePath.strokeColor = color;
	turtlePath.strokeWidth = size;
	if(mag!==0){
		if(drawState!==0){
			if (((endX != startX) || (endY != startY))){
				if ( (Math.abs(startX+xNorm) < Math.abs(endX)) || (Math.abs(startY+yNorm) < Math.abs(endY) )){
					console.log("drawLine Mode exit");
					turtlePath.add(new paper.Point(endX,endY));
					raster.position.x=endX;
					raster.position.y=endY;
					mag=0;
					startX=endX;
					startY=endY;
					updateGlobals();
				}else{
					startX+=xNorm;
					startY+=yNorm;
					turtlePath.add(new paper.Point(startX,startY));
					raster.position.x=startX;
					raster.position.y=startY;
				}
			}
		}else{
			if (((endX != startX) || (endY != startY))){
				if ( mag < (speed*event.delta)){
					console.log("drawLine Mode exit,drawstate false");
					raster.position.x=endX;
					raster.position.y=endY;
					updateGlobals();
				}else{
					console.log("drawLine Mode enter, drawstate false");
					startX+=xNorm;
					startY+=yNorm;
					raster.position.x=startX;
					raster.position.y=startY;
				}
			}
		}
	}
	if (angle!==0){
		if (angle < (speed * event.delta*4)){
		console.log("rotate Mode exit");
			raster.rotate(angle);
			angle=0;
			updateGlobals();
		}else{
			console.log("rotate Mode enter");
			raster.rotate(angle*speed*event.delta*4);
			angle -=angle*speed*event.delta*4
			}
		}
	console.log("end of frame");
	}