	var d = document.getElementById('canvas1');
	paper.setup(d);
	d.style = "border:1px solid #000000;";
		
	// Create a raster item using the image tag with id='raster'
	var raster = new paper.Raster('/static/notebook/js/turtle.png');

	// home coordinates
	var xhome = 250;
	var yhome = 250;
	
	// turtle coordinates (start at home)
	var xcoord = xhome;
	var ycoord = yhome;
	
	//pen status for penup and pendown command. 1 means were are drawing (pendown)
	var penStatus = 1;

	//thickness of pen (between 1-10)
	var penSize = 1;
	
	//set default color
	var penColor = 'black';
	
	// image position
	raster.position.x = xcoord;
	raster.position.y = ycoord;
	
	// Scale the image by 50%
	raster.scale(0.5);

	//speed of line movement
	var speed = 6;

	// create path object for turtle
	var turtlePath = new paper.Path();
	
	//set color of stroke
	turtlePath.strokeColor = penColor;
	
	//set thickness
	turtlePath.strokeWidth = penSize;
	turtlePath.add(new paper.Point (xcoord, ycoord));
	
	//turtle starts at 90 degrees (looking up) to x-axis
	var turtleAngle = 90;
	var angle = 90; //this is to keep track of the turtles angle.
	var newAngle = 0;
	var getAngle = true;
	var oldAngle = turtleAngle;
	//Get the events from output area.
	var myEvents = ($(".myString")).text();
	myEvents = myEvents.split(" ");			
			
	//list of events
	var eventList = [];
	//create events, push them into list...
	var index;
	//var event = [];

	//loop through array and create events
	for (index = 0; index < myEvents.length; ++index) {
	var event = [];
		console.log("Current word is " + myEvents[index]);
    	
		if ( myEvents[index].indexOf('rotate') >= 0){
    		event.command = myEvents[index];
    		++index;
    		event.rotate = 0;
    		event.rotate = Number(myEvents[index]);
    		
    		eventList.push (event);	
    	}

		if ( myEvents[index].indexOf('penColor') >= 0){
    		event.command = myEvents[index];
    		++index;
    		event.penColor = myEvents[index];
    		
    		eventList.push (event);	
    	}
    	
    	if ( myEvents[index].indexOf('line') >= 0) {
    		var event = [];
    		console.log("make line cmd");
    		event.command = "line";
    		++index;
    		event.xend = myEvents[index];
    		++index;
    		event.yend = myEvents[index];
    		eventList.push(event);
    	}
		
    	if ( myEvents[index].indexOf('speed') >= 0) {
    		var event = [];
    		console.log("got a speed");
    		event.command = "speed";
    		++index;
    		event.speed = Number(myEvents[index]);
    		eventList.push(event);
    	}

    	if ( myEvents[index].indexOf('penStatus') >= 0) {
    		var event = [];
    		console.log("got penstatus change cmd");
    		event.command = "penStatus";
    		++index;
    		event.toggle = myEvents[index];
    		eventList.push(event);
    	}

    	if ( myEvents[index].indexOf('penSize') >= 0) {
    		var event = [];
    		console.log("pensize cmd");
    		event.command = "penSize";
    		++index;
    		event.penSize = myEvents[index];
    		eventList.push(event);
    	}
    	
    	if ( myEvents[index].indexOf('backward') >= 0) {
    		var event = [];
    		console.log("goto cmd made");
    		event.command = "backward";
    		++index;
    		event.xend = myEvents[index];
    		++index;
    		event.yend = myEvents[index];		
	
    		eventList.push(event);
    	}
		
    	if ( myEvents[index].indexOf('goTo') >= 0) {
    		var event = [];
    		console.log("goto cmd made");
    		event.command = "goTo";
    		++index;
    		event.xend = myEvents[index];
    		++index;
    		event.yend = myEvents[index];		
			++index;
			event.angle = myEvents[index];
    		eventList.push(event);
    	}
    	
    	
			
	}
	
	 var distancex;
	 var distancey;
	 
	 var x = 0; //event index
	 
	 //console.log("Event name:" + eventList[0].command);
	 //console.log("Event xend:" + eventList[0].xend);
	 
	 console.log("Number of events: " + eventList.length);
	 
	 paper.view.onFrame = function(event) {
		//check if we have an event to be done
		if (x < eventList.length) {
			if (eventList[x].command == "line") {
				console.log("IN LINE Event name:" + eventList[x].command);
				console.log("Current x is: " + xcoord + " endx is " + eventList[x].xend);
				console.log("Current y is: " + ycoord + " endy is " + eventList[x].yend);
				
				//calculate distancex and distancey if not calculated yet
				if (!eventList[x].hasOwnProperty("distancex")) {
					
					if (eventList[x].xend > xcoord ) eventList[x].distancex = eventList[x].xend - xcoord;
					 else eventList[x].distancex = xcoord - eventList[x].xend;
					
					
					//maybe try putting prevous x-1 event's xend yend
					 if (eventList[x].yend >ycoord ) eventList[x].distancey = eventList[x].yend - ycoord;
					 else eventList[x].distancey = ycoord - eventList[x].yend;
					
					//check which direction to go in (see above comment)
					if (eventList[x].xend < xcoord) {
						eventList[x].distancex = -eventList[x].distancex;
					}
					if (eventList[x].yend > ycoord) {
						eventList[x].distancey = -eventList[x].distancey;
					}
				}
				
				//calculate hypotenuse to get distance required if not calculated yet
				if (!eventList[x].hasOwnProperty("distanceh")) {
					eventList[x].distanceh = Math.sqrt((eventList[x].distancex * eventList[x].distancex) + (eventList[x].distancey * eventList[x].distancey))
				}
				
				var difx;
				difx = xcoord - eventList[x].xend;
				difx = Math.abs(difx);
				var dify;
				dify = ycoord - eventList[x].yend;
				dify = Math.abs(dify);
				
				//check if done
				if ((Math.floor(difx) == 0) && (Math.floor(dify) == 0 )){
					x++;
				
				} else if (difx < speed && dify < speed) {
					//go to end location
					console.log("Current x is: " + xcoord + " endx is " + eventList[x].xend);
					console.log("Current y is: " + ycoord + " endy is " + eventList[x].yend);
					
					
					var newx = Math.floor( eventList[x].xend);
					var newy = Math.floor( eventList[x].yend);
					console.log ("THIS SHOULED BE 350 " + newx);
					//draw the turtle
					//fix turtle path stuff
					// whe have eventList[x].xend it goes there
					turtlePath.add(new paper.Point(newx, newy));

					//move turtle to new point
					raster.position.x = eventList[x].xend;
					raster.position.y = eventList[x].yend;

					ycoord = eventList[x].yend;
					xcoord = eventList[x].xend;
						
					console.log ("Now x is " + xcoord + " Now y is " + ycoord);
					++x;
				} else {
					//reverse angle temporarily
					turtleAngle = -turtleAngle;
					//convert to radians
					var angleRadians = turtleAngle * (Math.PI / 180);
									
					//calculate coordinate 
					yDest = Math.sin(angleRadians);
					yDest = -yDest; //y coord increase in down direction 
					xDest = Math.cos(angleRadians);
					
					console.log ("xDest is " + xDest);
					console.log("ydest is " + yDest);
					
					if (speed <= eventList[x].distanceh) {
						xDest = xDest * speed;
						yDest = yDest * speed;

						//updsate distanceh (appropriately...)
						eventList[x].distanceh = Math.sqrt(((eventList[x].xend-xcoord) * (eventList[x].xend-xcoord)) + ((eventList[x].yend-ycoord) * (eventList[x].yend-ycoord)))

						// increase path
						turtlePath.add(new paper.Point (xcoord - xDest, ycoord - yDest)); 

						//move turtle to new point
						raster.position.x = xcoord - xDest;
						raster.position.y = ycoord - yDest;

						//update new coordinate for turtle position
						xcoord = xcoord - xDest;
						ycoord = ycoord - yDest;
					}else {
						console.log("should see me once!!");
						//go to end location

						turtlePath.add(new paper.Point (xcoord, ycoord)); 

						//move turtle to new point
						raster.position.x = xcoord;
						raster.position.y = ycoord;


						ycoord = eventList[x].yend;
						xcoord = eventList[x].xend;
						++x;
					}
					//set angle back
					turtleAngle = -turtleAngle;
				}
						
			}
			
			
			//turtleAngle is the current angle
			//rotate is the amount we want to move
			//speed controls how fast
			
			if (x < eventList.length) {
				if (eventList[x].command == "rotate") {

					if (getAngle) {
						getAngle = false; //got newAngle
						//set the new angle
						newAngle = turtleAngle + eventList[x].rotate;
					}
				
					console.log("got to rotate");
					console.log("turtleAngle IS : " + turtleAngle);
					console.log("eventROTATE IS : " + eventList[x].rotate);
					if (parseFloat(eventList[x].rotate) > 0) {
						raster.rotate(1 * speed); //rotate turtle image clockwise by speed
						turtleAngle = turtleAngle + speed; //update the actual angle
						eventList[x].rotate = eventList[x].rotate - speed; //decrease angle by the amount weve rotated
						if (eventList[x].rotate  <= 0 ) { //in the case where we overshoot our rotate
							turtleAngle = newAngle;
							
							eventList[x].rotate = 0;	
						}
						
					} else if (eventList[x].rotate < 0) {
						console.log("in rotate left");
						raster.rotate(-1 * speed); //rotate counterclockwise
						turtleAngle = turtleAngle - speed;
						eventList[x].rotate = eventList[x].rotate + speed; //increase angle until we hit 0
						
						if (eventList[x].rotate >= 0 ) {
							turtleAngle = newAngle;
							eventList[x].rotate = 0;							
						}

						
					} else {
						// we are done rotating 
						getAngle = true; //need to get a new Angle next time
						x++;
					}
					
				}
			}
			
			
			
			if (x < eventList.length) {
				if (eventList[x].command == "speed") {
					
					// change speed
					speed = eventList[x].speed;
					x++;
					
				}
			}
			
			if (x < eventList.length) {
				if (eventList[x].command == "penSize") {
					
					// make new path for thickness change
					turtlePath = new paper.Path();

									
					//set color of stroke
					turtlePath.strokeColor = penColor;
					
					//set thickness
					turtlePath.add(new paper.Point (xcoord, ycoord));

					penSize = eventList[x].penSize;
				
					if (penStatus == 1) {
						turtlePath.strokeWidth = penSize;
					}
					
					x++;
					
				}
			}
			
			if (x < eventList.length) {
				if (eventList[x].command == "penColor") {
					
					// make new path for thickness change
					turtlePath = new paper.Path();

					//set color of stroke
					penColor = eventList[x].penColor;
					turtlePath.strokeColor = penColor;
					
					//set thickness
					turtlePath.add(new paper.Point (xcoord, ycoord));

					turtlePath.strokeWidth = penSize;
					x++;
					
				}
			}
			
			
			if (x < eventList.length) {
				if (eventList[x].command == "penStatus") {
									
					// change pen status (penup or pendown)
				
					//if pen is on
					if (eventList[x].toggle == 1) {
					
						// make new path!
						turtlePath = new paper.Path();
						turtlePath.add(new paper.Point (xcoord, ycoord));

						//turn size to 0 as we are not drawing line
						turtlePath.strokeWidth = penSize;
						//set color of stroke
						turtlePath.strokeColor= penColor;
						x++;
					
					
					}
					//if pen is off
					else {
						
						// make new path!
						turtlePath = new paper.Path();
						
						turtlePath.add(new paper.Point (xcoord, ycoord));
		
						//set size
						turtlePath.strokeWidth = 0;
						//set color of stroke
						turtlePath.strokeColor = penColor;
						x++
					}
				}
			}
			
			if (x < eventList.length) {
			if (eventList[x].command == "backward") {
				console.log("SHOULD GO BACKWARD");
				
				
				
				//calculate distancex and distancey if not calculated yet
				if (!eventList[x].hasOwnProperty("distancex")) {
					
					//set xdistance
					if (eventList[x].xend > xcoord ) eventList[x].distancex = eventList[x].xend - xcoord;
					 else eventList[x].distancex = xcoord - eventList[x].xend;
					console.log("x distance is " + eventList[x].distancex);
					//setydistance
					//maybe try putting prevous x-1 event's xend yend
					 if (eventList[x].yend >ycoord ) eventList[x].distancey = eventList[x].yend - ycoord;
					 else eventList[x].distancey = ycoord - eventList[x].yend;
					console.log("y distance is " + eventList[x].distancey);
					
					
					//check which direction to go in (see above comment)
					if (eventList[x].xend < xcoord) {
						eventList[x].distancex = -eventList[x].distancex;
					}
					if (eventList[x].yend > ycoord) {
						eventList[x].distancey = -eventList[x].distancey;
					}
				}
				
				//calculate hypotenuse to get distance required if not calculated yet
				if (!eventList[x].hasOwnProperty("distanceh")) {
					eventList[x].distanceh = Math.sqrt((eventList[x].distancex * eventList[x].distancex) + (eventList[x].distancey * eventList[x].distancey))
				}
				
				console.log("distanceh is " + eventList[x].distanceh);
				
				var difx;
				difx = xcoord - eventList[x].xend;
				difx = Math.abs(difx);
				var dify;
				dify = ycoord - eventList[x].yend;
				dify = Math.abs(dify);
				
				//check if done
				if ((Math.floor(difx) == 0) && (Math.floor(dify) == 0 )){
					x++;
				
				} else if (difx < speed && dify < speed) {
					//go to end location
					console.log("Current x is: " + xcoord + " endx is " + eventList[x].xend);
					console.log("Current y is: " + ycoord + " endy is " + eventList[x].yend);
					
					
					var newx = Math.floor( eventList[x].xend);
					var newy = Math.floor( eventList[x].yend);
					
					//draw the turtle
					//fix turtle path stuff
					// whe have eventList[x].xend it goes there
					turtlePath.add(new paper.Point(newx, newy));

					//move turtle to new point
					raster.position.x = eventList[x].xend;
					raster.position.y = eventList[x].yend;

					ycoord = eventList[x].yend;
					xcoord = eventList[x].xend;
						
					console.log ("Now x is " + xcoord + " Now y is " + ycoord);
					++x;
				} else {
					//reverse angle temporarily
					turtleAngle = -turtleAngle;
					//convert to radians
					var angleRadians = turtleAngle * (Math.PI / 180);
									
					//calculate coordinate 
					yDest = Math.sin(angleRadians);
					yDest = yDest; //y coord increase in down direction 
					xDest = -Math.cos(angleRadians);
					
					console.log ("xDest is " + xDest);
					console.log("ydest is " + yDest);
					
					if (speed <= eventList[x].distanceh) {
						xDest = xDest * speed;
						yDest = yDest * speed;

						//updsate distanceh (appropriately...)
						eventList[x].distanceh = Math.sqrt(((eventList[x].xend-xcoord) * (eventList[x].xend-xcoord)) + ((eventList[x].yend-ycoord) * (eventList[x].yend-ycoord)))

						// increase path
						turtlePath.add(new paper.Point (xcoord - xDest, ycoord - yDest)); 

						//move turtle to new point
						raster.position.x = xcoord - xDest;
						raster.position.y = ycoord - yDest;

						//update new coordinate for turtle position
						xcoord = xcoord - xDest;
						ycoord = ycoord - yDest;
					}else {
						console.log("should see me once!!");
						//go to end location

						turtlePath.add(new paper.Point (xcoord, ycoord)); 

						//move turtle to new point
						raster.position.x = xcoord;
						raster.position.y = ycoord;


						ycoord = eventList[x].yend;
						xcoord = eventList[x].xend;
						++x;
					}
					//set angle back
					turtleAngle = -turtleAngle;
				}
						
			}
			}
			
			if (x < eventList.length) {
			if (eventList[x].command == "goTo") {
				newAngle = eventList[x].angle;
				oldAngle = turtleAngle;
				turtleAngle = newAngle;
				
				//calculate distancex and distancey if not calculated yet
				if (!eventList[x].hasOwnProperty("distancex")) {
					
					//set xdistance
					if (eventList[x].xend > xcoord ) eventList[x].distancex = eventList[x].xend - xcoord;
					 else eventList[x].distancex = xcoord - eventList[x].xend;
					console.log("x distance is " + eventList[x].distancex);
					//setydistance
					//maybe try putting prevous x-1 event's xend yend
					 if (eventList[x].yend >ycoord ) eventList[x].distancey = eventList[x].yend - ycoord;
					 else eventList[x].distancey = ycoord - eventList[x].yend;
					console.log("y distance is " + eventList[x].distancey);
					
					//check which direction to go in (see above comment)
					if (eventList[x].xend < xcoord) {
						eventList[x].distancex = -eventList[x].distancex;
					}
					if (eventList[x].yend > ycoord) {
						eventList[x].distancey = -eventList[x].distancey;
					}
				}
				
				//calculate hypotenuse to get distance required if not calculated yet
				if (!eventList[x].hasOwnProperty("distanceh")) {
					eventList[x].distanceh = Math.sqrt((eventList[x].distancex * eventList[x].distancex) + (eventList[x].distancey * eventList[x].distancey))
				}
				
				console.log("distanceh is " + eventList[x].distanceh);
				
				var difx;
				difx = xcoord - eventList[x].xend;
				difx = Math.abs(difx);
				var dify;
				dify = ycoord - eventList[x].yend;
				dify = Math.abs(dify);
				
				//check if done
				if ((Math.floor(difx) == 0) && (Math.floor(dify) == 0 )){
					x++;
					turtleAngle = oldAngle;
				
				} else if (difx < speed && dify < speed) {
					//go to end location
					console.log("Current x is: " + xcoord + " endx is " + eventList[x].xend);
					console.log("Current y is: " + ycoord + " endy is " + eventList[x].yend);
					
					
					var newx = Math.floor( eventList[x].xend);
					var newy = Math.floor( eventList[x].yend);
					
					//draw the turtle
					//fix turtle path stuff
					// whe have eventList[x].xend it goes there
					turtlePath.add(new paper.Point(newx, newy));

					//move turtle to new point
					raster.position.x = eventList[x].xend;
					raster.position.y = eventList[x].yend;

					ycoord = eventList[x].yend;
					xcoord = eventList[x].xend;
						
					console.log ("Now x is " + xcoord + " Now y is " + ycoord);
					++x;
				} else {
					//reverse angle temporarily
					turtleAngle = -turtleAngle;
					//convert to radians
					var angleRadians = turtleAngle * (Math.PI / 180);
									
					//calculate coordinate 
					yDest = Math.sin(angleRadians);
					yDest = yDest; //y coord increase in down direction 
					xDest = -Math.cos(angleRadians);
					
					console.log ("xDest is " + xDest);
					console.log("ydest is " + yDest);
					
					if (speed <= eventList[x].distanceh) {
						xDest = xDest * speed;
						yDest = yDest * speed;

						//updsate distanceh (appropriately...)
						eventList[x].distanceh = Math.sqrt(((eventList[x].xend-xcoord) * (eventList[x].xend-xcoord)) + ((eventList[x].yend-ycoord) * (eventList[x].yend-ycoord)))

						// increase path
						turtlePath.add(new paper.Point (xcoord - xDest, ycoord - yDest)); 

						//move turtle to new point
						raster.position.x = xcoord - xDest;
						raster.position.y = ycoord - yDest;

						//update new coordinate for turtle position
						xcoord = xcoord - xDest;
						ycoord = ycoord - yDest;
					}else {
						console.log("should see me once!!");
						//go to end location

						turtlePath.add(new paper.Point (xcoord, ycoord)); 

						//move turtle to new point
						raster.position.x = xcoord;
						raster.position.y = ycoord;


						ycoord = eventList[x].yend;
						xcoord = eventList[x].xend;
						++x;
					}
					//set angle back
					turtleAngle = -turtleAngle;
				}
						
			}
			}
		}  
	} 
	