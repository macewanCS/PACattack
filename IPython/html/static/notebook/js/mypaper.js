

			var d = document.getElementById('canvas1');
			paper.setup(d);
			
	
			
			d.style = "border:1px solid #000000;";
			
			
	// Create a raster item using the image tag with id='raster'
	var raster = new paper.Raster('/static/notebook/js/turtle.png');

	// Move the raster to the center of the view
	
	// home coordinates
	var xhome = 150;
	var yhome = 150;
	
	// turtle coordinates
	var xcoord = xhome;
	var ycoord = yhome;
	
	// image position
	raster.position = (xcoord, xcoord);

	// Scale the image by 50%
	raster.scale(0.5);

	// create path object for turtle
	var turtlePath = new paper.Path();
	turtlePath.strokeColor = 'black';
	turtlePath.add(new paper.Point (xcoord, ycoord));
	
	for (var temp = 0; temp < 100; temp++) {
		turtlePath.add(new paper.Point (xcoord+1, ycoord+1));
		xcoord++;
		ycoord++;
		console.log("test2");
		}
	
	//Lets create a list of events...
	
	var angle = 90; //this is to keep track of the turtles angle.
	
	
	//sample commands: Pentagon
	var event1 = [];
	event1.command = "right";
	event1.amount = 45;
	
	var event2 = [];
	event2.command = "forward";
	event2.amount = 30;
	
	var event3 = [];
	event3.command = "right";
	event3.amount = 45;
	
	var event4 = [];
	event4.command = "forward";
	event4.amount = 30;
	
	var event5 = [];
	event5.command = "right";
	event5.amount = 45;
	
	
	var event6 = [];
	event6.command = "forward";
	event6.amount = 30;
	
	var event7 = [];
	event7.command = "right";
	event7.amount = 45;
	
	var event8 = [];
	event8.command = "forward";
	event8.amount = 30;
	
	var event9 = [];
	event9.command = "right";
	event9.amount = 45;
	
	var event10 = [];
	event10.command = "forward";
	event10.amount = 30;
	
	var event11 = [];
	event11.command = "right";
	event11.amount = 45;
	
	var event12 = [];
	event12.command = "forward";
	event12.amount = 30;
	
	var event13 = [];
	event13.command = "right";
	event13.amount = 45;
	
	var event14 = [];
	event14.command = "forward";
	event14.amount = 30;
	
	var event15 = [];
	event15.command = "right";
	event15.amount = 45;
	
	var event16 = [];
	event16.command = "forward";
	event16.amount = 30;
	
	var event17 = [];
	event17.command = "right";
	event17.amount = 19;
	
	var event18 = [];
	event18.command = "forward";
	event18.amount = 41;
	
	var event19 = [];
	event19.command = "right";
	event19.amount = 110;
	
	var event20 = [];
	event20.command = "forward";
	event20.amount = 35;
	
	var event21 = [];
	event21.command = "home";	
	
	var event22 = [];
	event22.command = "right";
	event22.amount = 14;
	
	var event23 = [];
	event23.command = "forward";
	event23.amount = 72;
	
	var event24 = [];
	event24.command = "left";
	event24.amount = 54;
	
	var event25 = [];
	event25.command = "backward";
	event25.amount = 72;
	
	var event26 = [];
	event26.command = "left";
	event26.amount = 32;
	
	//list of events
	var eventList = [];

	//add samples into event list
	eventList.push (event1);
	eventList.push (event2);
	eventList.push (event3);
	eventList.push (event4);
	eventList.push (event5);
	eventList.push (event6);
	eventList.push (event7);
	eventList.push (event8);
	eventList.push (event9);
	eventList.push (event10)
	eventList.push (event11)
	eventList.push (event12)
	eventList.push (event13)
	eventList.push (event14);
	eventList.push (event15);
	eventList.push (event16);
	eventList.push (event17);
	eventList.push (event18);
	eventList.push (event19);
	eventList.push (event20);
	eventList.push (event21);
	eventList.push (event22);
	eventList.push (event23);
	eventList.push (event24);
	eventList.push (event25);
	eventList.push (event26);
	
	
	var x = 0; //this is our event index, starting at 0
	
    console.log("before.");
    
    //while (1){
    //	console.log("loooping");
    //	onFrame(eventList);
    //}
    
    paper.view.onFrame = function (event) {
	//function onFrame(event) {	
	console.log("after");		
		//check if we have an event in list..
		if (x < eventList.length) {


			//we must check which command is issued, starting at x = 0			
			if (eventList[x].command == "right") {
			
				if (eventList[x].amount > 0) {
					//rotate one degree
					raster.rotate(1); 
				
					//decrement our event angle
					eventList[x].amount--;
					angle++; //increment our turtle angle
				}
				else {
					//check if we have to increment to next event, or are we done
					if (x < eventList.length-1) {
				
					x++; 
			
					}
				}
			}
			
			if (eventList[x].command == "left") {
			
				if (eventList[x].amount > 0) {
					//rotate one degree
					raster.rotate(-1); 
				
					//decrement our event angle
					eventList[x].amount--;
					angle--; //increment our turtle angle
				}
				else {
					//check if we have to increment to next event, or are we done
					if (x < eventList.length-1) {
				
					x++; 
			
					}
				}
			}
			
			
			if (eventList[x].command == "forward") {
				
				if (eventList[x].amount > 0) {
				
					//we need to figure out x and y points to reach
					var xDest;
					var yDest;
					angle = -angle;
					//convert to radians
					var angleRadians = (angle * (Math.PI / 180));
									
					//calculate coordinate 
					yDest = 1 * Math.sin(angleRadians);
					yDest = -yDest; //y coord increase in down direction 
					xDest = 1 * Math.cos(angleRadians);
				
					// increase path
					turtlePath.add(new paper.Point (xcoord - xDest, ycoord - yDest)); 
					
					//move turtle to new point
					raster.position.x = xcoord - xDest;
					raster.position.y = ycoord - yDest;
					
					//update new coordinate for turtle position
					xcoord = xcoord - xDest;
					ycoord = ycoord - yDest;
					
					//set angle back
					angle = -angle;
					eventList[x].amount--;
				}
				else {
					if (x < eventList.length-1) {
				
					x++; 
			
					}
				}
			}
			
			
			if (eventList[x].command == "backward") {
				
				if (eventList[x].amount > 0) {
				
					//we need to figure out x and y points to reach
					var xDest;
					var yDest;
					angle = -angle;
					//convert to radians
					var angleRadians = (angle * (Math.PI / 180));
									
					//calculate coordinate 
					yDest = 1 * Math.sin(angleRadians);
					yDest = -yDest; //y coord increase in down direction 
					xDest = 1 * Math.cos(angleRadians);
				
					// increase path
					turtlePath.add(new paper.Point (xcoord - xDest, ycoord - yDest)); 
					
					//move turtle to new point
					raster.position.x = xcoord + xDest;
					raster.position.y = ycoord + yDest;
					
					//update new coordinate for turtle position
					xcoord = xcoord + xDest;
					ycoord = ycoord + yDest;
					
					//set angle back
					angle = -angle;
					eventList[x].amount--;
				}
				else {
					if (x < eventList.length-1) {
				
					x++; 
			
					}
				}
			}
			
			
			if (eventList[x].command == "home") {
				
				
				
					
					
					//move turtle to new point
					raster.position.x = xhome;
					raster.position.y = yhome;
					
					//update new coordinate for turtle position
					xcoord = xhome;
					ycoord = yhome;
					
					//set angle back
					raster.rotate(-angle + 90);
					angle = 90;
					
					turtlePath.add(new paper.Point (xcoord, xcoord));
								
					if (x < eventList.length-1) {
				
					x++; 
			
					}
				
			}
			
			
			
		}
	}  //END ON FRAME FUNCTION
	
	// test function for onkeydown
	  
	function onKeyDown(event) {
	raster.translate(-1,0); 
	raster.rotate(1);
		console.log("test");
	
	} 
	
		//	var raster = new paper.Raster('/static/notebook/js/turtle.png');		
		
			
			var test1 = ($(".myString")).text();
			alert(test1);
			
			
			