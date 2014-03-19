

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

	
	// image position
	raster.position.x = xcoord;
	raster.position.y = ycoord;
	
	// Scale the image by 50%
	raster.scale(0.5);

	
	
	//speed of movement
	var speed = 10;

	// create path object for turtle
	var turtlePath = new paper.Path();
	turtlePath.strokeColor = 'blue';
	turtlePath.add(new paper.Point (xcoord, ycoord));
	
	
	var angle = 90; //this is to keep track of the turtles angle.
	
	/*
	//sample commands for testing
	var event0 = [];
	event0.command = "rotate";
	event0.rotate = 90;
	
	var event1 = [];
	event1.command = "rotate";
	event1.rotate = -90;
	
	var event2 = [];
	event2.command = "line";
	event2.xstart = xcoord;
	event2.ystart = ycoord;
	event2.xend = 30;
	event2.yend = 30;
	
	var event3 = [];
	event3.command = "line";
	event3.xstart = event2.xend;
	event3.ystart = event2.yend;
	event3.xend = 90;
	event3.yend = 100;
	
	var event4 = [];
	event4.command = "line";
	event4.xstart = event3.xend;
	event4.ystart = event3.yend;
	event4.xend = 50;
	event4.yend = 45;
	
	var event5 = [];
	event5.command = "rotate";
	event5.rotate = -90;
	
	var event6 = [];
	event6.command = "line";
	event6.xstart = event4.xend;
	event6.ystart = event4.yend;
	event6.xend = 550;
	event6.yend = 45;
	
	var event7 = [];
	event7.command = "line";
	event7.xstart = event6.xend;
	event7.ystart = event6.yend;
	event7.xend = 550;
	event7.yend = 545;
	*/

			
			/*
			var event0 = [];
			event0.command = myEvents[0];
			event0.rotate = myEvents[1];
			
			var event1 = [];
			event1.command = myEvents[2];
			event1.rotate = myEvents[3];
		
		*/
	
	
	
	/*
	//add samples into event list
	eventList.push (event0);
	eventList.push (event1);
		*/
		
		
	 //distance to x and y




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
		console.log("Current word is "+myEvents[index]);
    	if ( myEvents[index].indexOf('rotate') >= 0){
    		event.command = myEvents[index];
    		++index;
    		event.rotate = myEvents[index];
    		
    		eventList.push (event);
    		
    	}
    	
    	if ( myEvents[index].indexOf('forward') >= 0) {
    	var event = [];
    	console.log("got to forward");
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
	 
	 console.log("Event name:" + eventList[0].command);
	 console.log("Event xend:" + eventList[0].xend);
	 
	 
	 paper.view.onFrame = function(event) {
			//check if we have an event to be done
			if (x < eventList.length) {
		
			if (eventList[x].command == "line") {
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
				
				if (!eventList[x].hasOwnProperty("distanceh")) {
				
				eventList[x].distanceh = Math.sqrt((eventList[x].distancex * eventList[x].distancex) + (eventList[x].distancey * eventList[x].distancey))
				eventList[x].distanceh = Math.round(eventList[x].distanceh)
				
				}
				
				//keep drawing line until we reach end point
				
				//check if we are near our endpoint
				var difx;
				difx = xcoord - eventList[x].xend;
				difx = Math.abs(difx);
				var dify;
				dify = ycoord - eventList[x].yend;
				dify = Math.abs(dify);
				
				//check if done
				if ((Math.floor(difx) == 0) && (Math.floor(dify) == 0 )){
				x++;
				
				} else {

					turtleAngle = -turtleAngle;
					//convert to radians
					var angleRadians = (turtleAngle * (Math.PI / 180));
									
					//calculate coordinate 
					yDest = Math.sin(angleRadians);
					yDest = -yDest; //y coord increase in down direction 
					xDest = Math.cos(angleRadians);
				
					// increase path
					turtlePath.add(new paper.Point (xcoord - xDest, ycoord - yDest)); 
					
					//move turtle to new point
					raster.position.x = xcoord - xDest;
					raster.position.y = ycoord - yDest;
					
					//update new coordinate for turtle position
					xcoord = xcoord - xDest;
					ycoord = ycoord - yDest;
					
					//set angle back
					turtleAngle = -turtleAngle;
					
				
				}
					
				
			}
			
			if (x < eventList.length) {
				if (eventList[x].command == "rotate") {
					console.log("got to rotate");
					if (eventList[x].rotate > 0) {
					raster.rotate(1); //rotate clockwise
					eventList[x].rotate--; //decrease angle until we hit 0
					turtleAngle++;
					}
					
					
					else if (eventList[x].rotate < 0) {
					raster.rotate(-1); //rotate counterclockwise
					eventList[x].rotate++; //increase angle until we hit 0
					turtleAngle--;
					}
					else {
					// we are done rotating 
					x++;
					}
				}
			}
		}  
	} //END ON FRAME FUNCTION

	