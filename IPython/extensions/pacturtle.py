import math
from IPython.core.displaypub import publish_display_data
import sys
import tempfile
from glob import glob
from shutil import rmtree
from IPython.core.displaypub import publish_display_data
from IPython.core.magic import (Magics, magics_class, line_magic,
                                line_cell_magic, needs_local_scope)
from IPython.testing.skipdoctest import skip_doctest
from IPython.core.magic_arguments import (
    argument, magic_arguments, parse_argstring
    )
from IPython.external.simplegeneric import generic
from IPython.utils.py3compat import (str_to_unicode, unicode_to_str, PY3,
                                      unicode_type)
from IPython.utils.text import dedent

# Allow publish_display_data to be overridden for
# testing purposes.

class pacturtle:
	display_data = [];
	homex = 250 #home of turtle
	homey = 250 #xhome of turtle
	#get start coordinates from home
	starty = homex
	startx = homex 
	turtleAngle = 90 #turtle is point up, 90 degrees to the x-axis
	turtleSpeed = 1
	checkPac = 0
	penDrawing = 1
	penSize = 1
	penColor = 'black'
			
	def forward(self, distance):
		"""
        Move the turtle forward relative to the current angle by the parameter distance.
        """
		self.turtleAngle = -self.turtleAngle
		radians = math.radians(self.turtleAngle)
		endx = math.cos(radians)
		endy = math.sin(radians)
		endx = distance * endx
		endy =distance * endy
		endy = endy #y goes down
		endx = self.startx - endx
		endy = self.starty + endy
		print "PAC: line",endx,endy
		command = "line ",endx," ",endy
		display_data = []
		#display_data.append(('pacturtle.forward', {'turtle':command}))
		#at this point there would be something like:
		#for tag, disp_d in display_data:
			#publish_display_data(tag, disp_d)
		#publish_display_data('pacturtle.forward', {'turtle':command})
		
		#set up new startpoints
		self.startx = endx
		self.starty = endy
		#reset angle
		self.turtleAngle = -self.turtleAngle
		
	def speed(self, speed):
		"""
		Setter for the speed that the turtle animates.
		"""
		
		if (speed > 10):
			speed = 10
		print "PAC: speed", speed
		#command = "speed ",speed
		display_data = []
		#display_data.append(('pacturtle.speed', {'turtle':command}))
		#at this point there would be something like:
		#for tag, disp_d in display_data:
			#publish_display_data(tag, disp_d)
		#publish_display_data('pacturtle.speed', {'turtle':command})
		self.turtleSpeed = speed
		
	def backward(self, distance):
		"""
    	Move the turtle backward relative to the current angle by the parameter distance.
		"""
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
		
		print "PAC: backward", endx , endy 
		#command = "backward ",endx, " ", endy
		#display_data = []
		#display_data.append(('pacturtle.speed', {'turtle':command}))
		#at this point there would be something like:
		#for tag, disp_d in display_data:
			#publish_display_data(tag, disp_d)
		#publish_display_data('pacturtle.backward', {'turtle':command})
		#set up new startpoints
		self.startx = endx
		self.starty = endy
		#reset angle
		self.turtleAngle = -self.turtleAngle
		
	def right(self, angle):
		"""
		Rotate the turtle clockwise by the parameter angle measured in Euler angles.
		""" 
		print "PAC: rotate",angle
		#command = "rotate ",angle
		#publish_display_data('pacturtle.rotate', {'turtle':command})
		self.turtleAngle = self.turtleAngle + angle
		
	def left(self, angle):
		""" 
    	Rotate the turtle clockwise by the parameter angle measured in Euler angles.
     	"""
		print "PAC: rotate", -angle
		#command = "rotate ",angle
		#publish_display_data('pacturtle.rotate', {'turtle':command})
		self.turtleAngle = self.turtleAngle - angle
		
	def home(self):
		"""
		Returns the turtle to the default position.
		"""
		endx = self.homex 
		endy = self.homey
		
		print "PAC: line",endx ,endy 
		#command = "line ",endx, " ", endy
		#publish_display_data('pacturtle.home', {'turtle':command})
		#set up new startpoints
		self.startx = endx
		self.starty = endy
		#reset angle
		self.turtleAngle = -self.turtleAngle
	
	def penup(self):
		"""
		Change the state of the pen, If the pen is up then the turtle will no longer draw when it moves.
		"""
		print "PAC: penStatus", 0
		#command = "penStatus ",0
		#publish_display_data('pacturtle.penup', {'turtle':command})
		self.penDrawing = 0
		
	def pendown(self):
		"""
    	Change the state of the pen, If the pen is down then the turtle will not draw when it moves.
    	"""
		print "PAC: penStatus", 1
		#command = "penStatus ",1
		#publish_display_data('pacturtle.pendown', {'turtle':command})
		self.penStatus = 1
	
	def pensize(self, size):
		"""
    	Change the size of the line drawn by the turtle to the parameter size
    	"""
		print "PAC: penSize", size
		#command = "penSize ",size
		#publish_display_data('pacturtle.pensize', {'turtle':command})
		penSize = size;
		
	def pencolor(self, color):
		"""
    	Change the color of the line drawn by the turtle to the parameter color.
    	"""
		print "PAC: penColor", color
		#command = "penColor ",color
		#publish_display_data('pacturtle.pencolor', {'turtle':command})
		penColor = color;
		
	def circle(self, radius):
		"""
    	Draws a circle with a radius of the given parameter
    	"""
    	
		for x in range(0, 360):
			self.forward(2*math.pi*radius/360.0)
			self.right(1)
	
	def isdown(self):
		"""
    	Prints to output as a string if the turtle is currently drawing
    	"""
		if self.penDrawing == 1:
			print "True"
		else:
			print "False"

	def goto(self, x, y):
		"""
    	Moves the turtle to the point (x,y) specified by parameters
    	"""
		#calculate the angle...somehow

		#dif of x
		difx = self.startx - x
		#dif of y
		dify = self.starty - y
		difx = abs(difx)
		dify = abs(dify)
		
		print dify
		print difx
		
		if difx == 0:
			myAngle = 180
		elif dify == 0:
			myAngle = 0
		else:
			myAngle = math.degrees(math.atan2(dify,difx))
			myAngle = myAngle + 90
		print "PAC: goTo ",x,y,myAngle