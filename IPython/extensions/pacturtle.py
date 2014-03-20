import math

class pacturtle:
	
	homex = 250 #home of turtle
	homey = 250 #xhome of turtle
	#get start coordinates from home
	starty = homex
	startx = homex 
	turtleAngle = 90 #turtle is point up, 90 degrees to the x-axis
	turtleSpeed = 2
	checkPac = 0
	penDrawing = 1
	penSize = 1
	#magic word
	#print "PAC:"
				
	def forward(self, distance):
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
		
		print "PAC: line",endx ,endy 
		
		#set up new startpoints
		self.startx = endx
		self.starty = endy
		#reset angle
		self.turtleAngle = -self.turtleAngle
		
	def speed(self, speed):
		print "PAC: speed", speed
		self.turtleSpeed = speed
		
	def backward(self, distance):
		#calculate endpoints
		self.turtleAngle = -self.turtleAngle
		radians = math.radians(self.turtleAngle)
		
		endx = math.cos(radians)
		endy = math.sin(radians)
		
		endx = -distance * endx
		endy = -distance * endy
		endy = endy #y goes down
	
		endx = self.startx - endx
		endy = self.starty + endy
		
		print "PAC: line", endx , endy 
		
		#set up new startpoints
		self.startx = endx
		self.starty = endy
		#reset angle
		self.turtleAngle = -self.turtleAngle
		
	def right(self, angle):
		print "PAC: rotate",angle
		self.turtleAngle = self.turtleAngle + angle
		
	def left(self, angle):
		print "PAC: rotate", -angle
		self.turtleAngle = self.turtleAngle - angle
		
	def home(self):
		endx = self.homex 
		endy = self.homey
		
		print "PAC: line",endx ,endy 
		
		#set up new startpoints
		self.startx = endx
		self.starty = endy
		#reset angle
		self.turtleAngle = -self.turtleAngle
		
	def penup(self):
		print "PAC: penStatus", 0
		self.penDrawing = 0
		
	def pendown(self):
		print "PAC: penStatus", 1
		self.penStatus = 1
	
	def pensize(self, size):
		print "PAC: penSize", size
		penSize = size;
		
	def goto(self, x, y):
		endx = x
		endy = -y
		
		print "PAC: line", endx , endy 
		
		#set up new startpoints
		self.startx = endx
		self.starty = endy
	
	#def isDown(self):
	#	if self.penDrawing == 1:
			#print "True"
			#else:
			#print "False"
			
	#def isUp(self):
	#	if self.penDrawing == 1:
			#print "True"
			#else:
			#print "False"