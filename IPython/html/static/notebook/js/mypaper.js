	var d = document.getElementById('canvas1');
	paper.setup(d);
	d.style = "border:1px solid #000000;";

	 // Create a raster item using the image tag with id='raster'
	var raster = new paper.Raster('/static/notebook/js/turtle.png');
	var help = new paper.Raster('/static/notebook/js/qmark.png');
	help.scale(0.2);
	help.position.x=10;
	help.position.y=10;
	help.onMouseDown = function (event){
		alert("Hello and welcome to the pacAttack turtle project. Try help(pacattack) to see function to see what methods are available and what they do.");
		}
	 // home coordinates
	 //will adjust this approprietly to center
	var xhome = 300;
	var yhome = 200;
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
	var speed = 1;
	 // create path object for turtle
	var turtlePath = new paper.Path();
	 //set color of stroke
	turtlePath.strokeColor = penColor;
	 //set thickness
	turtlePath.strokeWidth = penSize;
	turtlePath.add(new paper.Point(xcoord, ycoord));
	 //turtle starts at 90 degrees (looking up) to x-axis
	var turtleAngle = 90;
	var angle = 90; //this is to keep track of the turtles angle.
	var newAngle = 0;
	var getAngle = true;
	var getGoToAngle = true;
	var oldAngle = turtleAngle;
	 //Get the events from output area.
	//var myEvents = ($(".myString")).text();
	//myEvents = myEvents.split(" ");
	
	var myEvents = IPython.turtleCommands;
	myEvents = myEvents.split(" ");
	
	
	 //list of events
	var eventList = [];
	 //create events, push them into list...
	var index;
	 //var event = [];

	var rasterAngle = 90; //claduine mootity

	 //loop through array and create events
	for (index = 0; index < myEvents.length; ++index) {
	    var event = [];
	    console.log("Current word is " + myEvents[index]);

	    if (myEvents[index].indexOf('rotate') >= 0) {
	        event.command = myEvents[index];
	        ++index;
	        event.rotate = 0;
	        event.rotate = Number(myEvents[index]);

	        eventList.push(event);
	    }

	    if (myEvents[index].indexOf('penColor') >= 0) {
	        event.command = myEvents[index];
	        ++index;
	        event.penColor = myEvents[index];

	        eventList.push(event);
	    }

	    if (myEvents[index].indexOf('line') >= 0) {
	        var event = [];
	        console.log("make line cmd");
	        event.command = "line";
	        ++index;
	        event.xend = myEvents[index];
	        ++index;
	        event.yend = myEvents[index];
	        eventList.push(event);
	    }

	    if (myEvents[index].indexOf('speed') >= 0) {
	        var event = [];
	        console.log("got a speed");
	        event.command = "speed";
	        ++index;
	        event.speed = Number(myEvents[index]);
	        eventList.push(event);
	    }

	    if (myEvents[index].indexOf('penStatus') >= 0) {
	        var event = [];
	        console.log("got penstatus change cmd");
	        event.command = "penStatus";
	        ++index;
	        event.toggle = myEvents[index];
	        eventList.push(event);
	    }

	    if (myEvents[index].indexOf('penSize') >= 0) {
	        var event = [];
	        console.log("pensize cmd");
	        event.command = "penSize";
	        ++index;
	        event.penSize = myEvents[index];
	        eventList.push(event);
	    }

	    if (myEvents[index].indexOf('backward') >= 0) {
	        var event = [];
	        console.log("goto cmd made");
	        event.command = "backward";
	        ++index;
	        event.xend = myEvents[index];
	        ++index;
	        event.yend = myEvents[index];

	        eventList.push(event);
	    }

	    if (myEvents[index].indexOf('goTo') >= 0) {
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



	} // see <---
	 // bad!
	var distancex;
	var distancey;
	var x = 0; //event index

	 //every frame execute current command at index x
	 //increment x if done current command
	paper.view.onFrame = function (event) {
	    //check if we have an event to be done
	    if (x < eventList.length) {
	        if (eventList[x].command == "line") {
	            //calculate distancex and distancey if not calculated yet
	            if (!eventList[x].hasOwnProperty("distancex")) {

	                if (eventList[x].xend > xcoord) eventList[x].distancex = eventList[x].xend - xcoord;
	                else eventList[x].distancex = xcoord - eventList[x].xend;


	                //maybe try putting prevous x-1 event's xend yend
	                if (eventList[x].yend > ycoord) eventList[x].distancey = eventList[x].yend - ycoord;
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
	            if ((Math.floor(difx) < 1) && (Math.floor(dify) < 1)) {
	                x++;
	            } else if (difx < speed && dify < speed) {
	                //if speed is greater than distance to end location
	                //we will just jump straight to end location
	                var newx = Number(eventList[x].xend);
	                var newy = Number(eventList[x].yend);
	                turtlePath.add(new paper.Point(Number(newx), Number(newy)));

	                //move turtle to new point
	                raster.position.x = eventList[x].xend;
	                raster.position.y = eventList[x].yend;
	                //update current xcoord and ycoord
	                ycoord = eventList[x].yend;
	                xcoord = eventList[x].xend;
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

	                if (speed <= eventList[x].distanceh) {
	                    xDest = xDest * speed;
	                    yDest = yDest * speed;

	                    //updsate distanceh (appropriately)
	                    eventList[x].distanceh = Math.sqrt(((eventList[x].xend - xcoord) * (eventList[x].xend - xcoord)) + ((eventList[x].yend - ycoord) * (eventList[x].yend - ycoord)))

	                    // increase path
	                    turtlePath.add(new paper.Point(Number(xcoord - xDest), Number(ycoord - yDest)));

	                    //move turtle to new point
	                    raster.position.x = xcoord - xDest;
	                    raster.position.y = ycoord - yDest;

	                    //update new coordinate for turtle position
	                    xcoord = xcoord - xDest;
	                    ycoord = ycoord - yDest;
	                } else {
	                    //go to end location
	                    turtlePath.add(new paper.Point(Number(xcoord), Number(ycoord)));
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




	        // end of line




	        //turtleAngle is the current angle
	        //rotate is the amount we want to move
	        //speed controls how fast
	        if (x < eventList.length) {
	            if (eventList[x].command == "rotate") {

	                if (getAngle) {
	                    getAngle = false; //got newAngle
	                    //set the new angle WE CALCULATE NEW ANGLE ONCE
	                    //ITS JUST THE END ANGLE WE WANT 
	                    newAngle = turtleAngle + eventList[x].rotate;
	                }

	                if (parseFloat(eventList[x].rotate) > 0) {
	                    raster.rotate(speed); //rotate turtle image clockwise by speed
	                    rasterAngle += speed; //rasterAngle is pointing where raster is
	                    turtleAngle = turtleAngle + speed; //update the actual angle
	                    eventList[x].rotate = eventList[x].rotate - speed; //decrease angle by the amount weve rotated
	                    
	                    
	                    if (eventList[x].rotate < 0) {
	                        turtleAngle = newAngle; //this automatically SETS turtleAngle to newAngle
	                        raster.rotate(-rasterAngle); //rotate back to 0
	                        raster.rotate(newAngle);
	                        rasterAngle = newAngle;
	                        eventList[x].rotate = 0; //k one sec
	                    }

	                }
	                //wont it jump into this func instead of our special casethis should be elseif and we set rotate to 0, so no it shouldn
	                //jump into here
	                else if (parseFloat(eventList[x].rotate) < 0) {
	                    raster.rotate(-speed); //rotate turtle image clockwise by speed
	                    rasterAngle -= speed;
	                    //shouldnt newAngle be updated here?
	                    turtleAngle = turtleAngle - speed; //update the actual angle
	                    eventList[x].rotate = eventList[x].rotate + speed; //decrease angle by the amount weve rotated

	                    if (eventList[x].rotate > 0) {

	                        turtleAngle = newAngle; //this automatically SETS turtleAngle to newAngle
	                        //now we want to set raster back to 0, then rotate it right by newAngle
	                        raster.rotate(-rasterAngle); //
	                        raster.rotate(turtleAngle); //this does the rotating part, were just telling rasterAngle what the image is pointat
	                        rasterAngle = newAngle;    //this part sho that uld set the raster rotate to our angle, not just 'rotate it b
	                        eventList[x].rotate = 0; //k one sec
	                    }

	                } 
					
					else {
						
	                    // we are done rotating 
	                    rasterAngle = newAngle;
	          		    getAngle = true; //need to get a new Angle next time
	                    x++;
	                }
	            }
	        }




	        /*
		
		
	    .-.      
       /_ _\           -aRTOOOOo i told you to use math.something
       |o^o|
       \ _ /
      .-'-'-.
    /`)  .  (`\
   / /|.-'-.|\ \
   \ \| (_) |/ /  .-""-.     - beep beep boop
    \_\'-.-'/_/  /[] _ _\
    /_/ \_/ \_\ _|_o_LII|_
      |'._.'|  / | ==== | \
      |  |  |  |_| ==== |_|
       \_|_/    ||" ||  ||
       |-|-|    ||LI  o ||
       |_|_|    ||'----'||
      /_/ \_\  /__|    |__\
		
		*/



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
	                turtlePath.add(new paper.Point(Number(xcoord), Number(ycoord)));

	                penSize = eventList[x].penSize;

					//alert(penStatus);
	                if (penStatus == 1) {
	                    turtlePath.strokeWidth = penSize;
	                }
					
					else {
						//alert("setting to 0");
						turtlePath.strokeWidth = 0;

					
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
	                turtlePath.add(new paper.Point(Number(xcoord), Number(ycoord)));

					if (penStatus == 1) {
	                    turtlePath.strokeWidth = penSize;
	                }
					
					else {
					
						turtlePath.strokeWidth = 0;

					
					}

	                x++;

	            }
	        }


	        if (x < eventList.length) {
	            if (eventList[x].command == "penStatus") {

	                // change pen status (penup or pendown)
					
	                //if pen should be drawing
	                if (eventList[x].toggle == 1) {
						//raster = new paper.Raster('/static/notebook/js/turtle.png');
						//raster.rotate(turtleAngle);
	                    // make new path!
	                    turtlePath = new paper.Path();
	                    turtlePath.add(new paper.Point(Number(xcoord), Number(ycoord)));

	                    turtlePath.strokeWidth = penSize;
	                    //set color of stroke
	                    turtlePath.strokeColor = penColor;
						penStatus = 1;

	                    x++;


	                }
	                //if pen shouldnt be drawing
	                else {
						penStatus = 0;
	                    // make new path!
	                    turtlePath = new paper.Path();
	
	                    turtlePath.add(new paper.Point(Number(xcoord), Number(ycoord)));

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
	                    if (eventList[x].xend > xcoord) eventList[x].distancex = eventList[x].xend - xcoord;
	                    else eventList[x].distancex = xcoord - eventList[x].xend;
	                    console.log("x distance is " + eventList[x].distancex);
	                    //setydistance
	                    //maybe try putting prevous x-1 event's xend yend
	                    if (eventList[x].yend > ycoord) eventList[x].distancey = eventList[x].yend - ycoord;
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
	                if ((Math.floor(difx) == 0) && (Math.floor(dify) == 0)) {
	                    x++;

	                } else if (difx < speed && dify < speed) {
	                    //go to end location
	                    console.log("Current x is: " + xcoord + " endx is " + eventList[x].xend);
	                    console.log("Current y is: " + ycoord + " endy is " + eventList[x].yend);


	                    var newx = Math.floor(eventList[x].xend);
	                    var newy = Math.floor(eventList[x].yend);

	                    //draw the turtle
	                    //fix turtle path stuff
	                    // whe have eventList[x].xend it goes there
	                    turtlePath.add(new paper.Point(Number(newx), Number(newy)));

	                    //move turtle to new point
	                    raster.position.x = eventList[x].xend;
	                    raster.position.y = eventList[x].yend;

	                    ycoord = eventList[x].yend;
	                    xcoord = eventList[x].xend;

	                    console.log("Now x is " + xcoord + " Now y is " + ycoord);
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

	                    console.log("xDest is " + xDest);
	                    console.log("ydest is " + yDest);

	                    if (speed <= eventList[x].distanceh) {
	                        xDest = xDest * speed;
	                        yDest = yDest * speed;

	                        //updsate distanceh (appropriately...)
	                        eventList[x].distanceh = Math.sqrt(((eventList[x].xend - xcoord) * (eventList[x].xend - xcoord)) + ((eventList[x].yend - ycoord) * (eventList[x].yend - ycoord)))

	                        // increase path
	                        turtlePath.add(new paper.Point(xcoord - xDest, ycoord - yDest));

	                        //move turtle to new point
	                        raster.position.x = xcoord - xDest;
	                        raster.position.y = ycoord - yDest;

	                        //update new coordinate for turtle position
	                        xcoord = xcoord - xDest;
	                        ycoord = ycoord - yDest;
	                    } else {
	                        console.log("should see me once!!");
	                        //go to end location

	                        turtlePath.add(new paper.Point(xcoord, ycoord));

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

	                // go go go go1!!
	                if (getGoToAngle) {
	                	//alert(eventList[x].angle);
	                    oldAngle = turtleAngle; //save turtle's real angle
	                    turtleAngle = eventList[x].angle; //temporarily point turtleAngle to new endPoint
	                    getGoToAngle = false;
	                }
	                //regular line stuff until the x++, then we do turtleAngle = oldAngle and set getGOTOangle = true
	                //only problem would be if newAngle is not from the right 0 spot (left side)
	                //calculate distancex and distancey if not calculated yetru
	                if (!eventList[x].hasOwnProperty("distancex")) {

	                    if (eventList[x].xend > xcoord) eventList[x].distancex = eventList[x].xend - xcoord;
	                    else eventList[x].distancex = xcoord - eventList[x].xend;


	                    //maybe try putting prevous x-1 event's xend yend
	                    if (eventList[x].yend > ycoord) eventList[x].distancey = eventList[x].yend - ycoord;
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
	                if ((Math.floor(difx) < 1) && (Math.floor(dify) < 1)) {
	                    turtleAngle = oldAngle;
						getGoToAngle = true;
						x++;
	                } else if (difx < speed && dify < speed) {
	                    //if speed is greater than distance to end location
	                    //we will just jump straight to end location
	                    var newx = Number(eventList[x].xend);
	                    var newy = Number(eventList[x].yend);
	                    turtlePath.add(new paper.Point(Number(newx), Number(newy)));

	                    //move turtle to new point
	                    raster.position.x = eventList[x].xend;
	                    raster.position.y = eventList[x].yend;
	                    //update current xcoord and ycoord
	                    ycoord = eventList[x].yend;
	                    xcoord = eventList[x].xend;
	                    turtleAngle = oldAngle;
	                    getGoToAngle = true;
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

	                    if (speed <= eventList[x].distanceh) {
	                        xDest = xDest * speed;
	                        yDest = yDest * speed;

	                        //updsate distanceh (appropriately)
	                        eventList[x].distanceh = Math.sqrt(((eventList[x].xend - xcoord) * (eventList[x].xend - xcoord)) + ((eventList[x].yend - ycoord) * (eventList[x].yend - ycoord)))

	                        // increase path
	                        turtlePath.add(new paper.Point(Number(xcoord - xDest), Number(ycoord - yDest)));

	                        //move turtle to new point
	                        raster.position.x = xcoord - xDest;
	                        raster.position.y = ycoord - yDest;

	                        //update new coordinate for turtle position
	                        xcoord = xcoord - xDest;
	                        ycoord = ycoord - yDest;
	                    } else {
	                        //go to end location
	                        turtlePath.add(new paper.Point(Number(xcoord), Number(ycoord)));
	                        //move turtle to new point
	                        raster.position.x = xcoord;
	                        raster.position.y = ycoord;
	                        ycoord = eventList[x].yend;
	                        xcoord = eventList[x].xend;
	                        turtleAngle = oldAngle;
	                        getGoToAngle = true;
	                        ++x;
	                    }
	                    //set angle back
	                    turtleAngle = -turtleAngle;



	                }
	            }
	        }
	    }
	}