

			var d = document.getElementById('canvas1');
			paper.setup(d);
						
			d.style = "border:1px solid #000000;";
			
	
	// Create a raster item using the image tag with id='raster'
	var raster = new paper.Raster('/static/notebook/js/turtle.png');

	//turtle starts at 90 degrees (looking up) to x-axis
	var turtleAngle = 90;

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
	var penColor = 'black'
	
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
	
	
	var angle = 90; //this is to keep track of the turtles angle.

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
    		event.rotate = myEvents[index];
    		
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
    		event.speed = myEvents[index];
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
		
    	if ( myEvents[index].indexOf('goto') >= 0) {
    		var event = [];
    		console.log("goto cmd made");
    		event.command = "line";
    		++index;
    		event.xend = myEvents[index];
    		++index;
    		event.yend = myEvents[index];		
	
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
		
			//check if curent event is a line movement
			if (eventList[x].command == "line") {
			
			
			console.log("IN LINE Event name:" + eventList[x].command);
	 		/*console.log("Event xend:" + eventList[x].xend);
	 		console.log("Event xcurr:" + xcoord);
			console.log("Event yend:" + eventList[x].yend);
	 		console.log("Event ycurr:" + ycoord);	
			*/
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
				
				//dont need to round off apparently
				//eventList[x].distanceh = Math.round(eventList[x].distanceh)
				
				}
				
				//keep drawing line until we reach end point
				
				//check if we are near our endpoint
				var difx;
				difx = xcoord - eventList[x].xend;
				difx = Math.abs(difx);
				
				//
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
					var angleRadians = (turtleAngle * (Math.PI / 180));
									
					//calculate coordinate 
					yDest = Math.sin(angleRadians);
					yDest = -yDest; //y coord increase in down direction 
					xDest = Math.cos(angleRadians);
					
					
					//console.log("Speed is " + dummyspeed + " eventList.x.distance is " + eventList[x].distanceh);
					
					// OLD
					//adjust speed
					//make condition to check if we are approaching destination, if we are, dont overshoot
					//speed = 37
					
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
			
			
			
			
			if (x < eventList.length) {
				if (eventList[x].command == "rotate") {
					console.log("got to rotate");
					if (eventList[x].rotate > 0) {
						raster.rotate(1 * speed); //rotate clockwise
						eventList[x].rotate = eventList[x].rotate - speed; //decrease angle until we hit 0
						turtleAngle++;
						if (eventList[x].rotate < 0 ) {
							eventList[x].rotate = 0;
							turtleAngle = turtleAngle + speed;
						}
					}
					
					
					else if (eventList[x].rotate < 0) {
						raster.rotate(-1 * speed); //rotate counterclockwise
						console.log("ROTATE IS : " + eventList[x].rotate);
						var temp = -speed;
						eventList[x].rotate = eventList[x].rotate - temp; //increase angle until we hit 0
						
						if (eventList[x].rotate > 0 ) {
							eventList[x].rotate = 0;
							turtleAngle = turtleAngle - speed;
						}
					} 
					
					else {
						// we are done rotating 
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
			
		}  
	} //END ON FRAME FUNCTION

	