         	
			alert("mypaper.js is running.");
			var d = document.getElementById('canvas1');

			paper.setup(d);

			
			//var whatIf = document.getElementById('myString');
			//alert(whatIf);
			
			d.style = "border:1px solid #000000;";
			
			var xcoord = 50;
			var ycoord = 70;
			
			
			var turtlePath = new paper.Path();
			turtlePath.strokeColor = 'black';
			turtlePath.add(new paper.Point (xcoord, ycoord));
			
			turtlePath.add(new paper.Point (100, 100));

			var raster = new paper.Raster('/static/notebook/js/turtle.png');		
			raster.position = (100, 100);
			
			var test1 = ($(".myString")).text();
			alert(test1);
			
			
			