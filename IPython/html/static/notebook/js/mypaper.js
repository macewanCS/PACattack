         	
			alert("mypaper.js is running.");
			var c = document.createElement('canvas');
			c.id = 'canvas1';
			c.width = 400;
			c.height = 400;
			c.style = "border:1px solid #000000;";
			
			var xcoord = 50;
			var ycoord = 70;
			
			var ctx = c.getContext("2d");
			
			
			ctx.fillStyle = "#9ea7b8";
			ctx.opacity = 0.2;
			ctx.fill();
			
			var imageObj = new Image();
			imageObj.onload = function() {
 				//draw turtle where the coordinates of the line are
  				ctx.drawImage(imageObj, xcoord, ycoord);
   			 };
    	
    		imageObj.src = 'http://www.andrewkind.com/js/turtle60.png';
			
			
			