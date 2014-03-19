import math

class pacturtle:
	
	homex = 250 #home of turtle
	homey = 250 #xhome of turtle
	#get start coordinates from home
	starty = homex
	startx = homex 
	turtleAngle = 90 #turtle is point up, 90 degrees to the x-axis
	checkPac = 0
	#magic word
	#print "PAC:"
	
	def rotate(self, angle):
		if self.checkPac == 0:
			self.checkPac = 1
			print "PAC:"
		print "rotate",angle
		self.turtleAngle = self.turtleAngle + angle
				
	def forward(self, distance):
		if self.checkPac == 0:
			self.checkPac = 1
			print "PAC:"
		#calculate endpoints
		self.turtleAngle = -self.turtleAngle
		radians = math.radians(self.turtleAngle)
		
		endx = math.cos(radians)
		endy =math.sin(radians)
		
		endx = distance * endx
		endy =distance * endy
		endy = endy #y goes down
	
		endx = self.startx - endx 
		endy = self.starty + endy
		
		print "forward",endx ,endy 
		
		#set up new startpoints
		self.startx = endx
		self.starty = endy
		#reset angle
		self.turtleAngle = -self.turtleAngle
		
		