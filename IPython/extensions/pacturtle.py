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
	turtleSpeed = 2
	checkPac = 0
	penDrawing = 1
	penSize = 1
	penColor = 'black'
			
				
	def forward(self, distance):
		#calculate endpoints
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
		print "PAC: rotate",angle
		#command = "rotate ",angle
		#publish_display_data('pacturtle.rotate', {'turtle':command})
		self.turtleAngle = self.turtleAngle + angle
		
	def left(self, angle):
		print "PAC: rotate", -angle
		angle = -angle
		#command = "rotate ",angle
		#publish_display_data('pacturtle.rotate', {'turtle':command})
		self.turtleAngle = self.turtleAngle - angle
		
	def home(self):
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
		print "PAC: penStatus", 0
		#command = "penStatus ",0
		#publish_display_data('pacturtle.penup', {'turtle':command})
		self.penDrawing = 0
		
	def pendown(self):
		print "PAC: penStatus", 1
		#command = "penStatus ",1
		#publish_display_data('pacturtle.pendown', {'turtle':command})
		self.penStatus = 1
	
	def pensize(self, size):
		print "PAC: penSize", size
		#command = "penSize ",size
		#publish_display_data('pacturtle.pensize', {'turtle':command})
		penSize = size;
		
	def pencolor(self, color):
		print "PAC: penColor", color
		#command = "penColor ",color
		#publish_display_data('pacturtle.pencolor', {'turtle':command})
		penColor = color;
		
		
	def circle(self, radius):
		for x in range(0, 360):
			self.forward(2*math.pi*radius/360.0)
			self.right(1)
	
	def isDown(self):
		if self.penDrawing == 1:
			print "True"
		else:
			print "False"
			
	def isUp(self):
		if self.penDrawing == 1:
			print "False"
		else:
			print "True"