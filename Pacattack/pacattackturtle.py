import math
# Replacement for the python turtle library. This class is intended to work with the
# IPython notebook to transmit the coordinates of the lines the turtle will draw
# through the socket, instead of just displaying the final picture.
#
# Paul Schmermund Feb/09/2014
class pacattackturtle(object):
    x = 0  # X cartesian coordinate
    y = 0  # Y cartesian coordinate
    dirx = 0   # X coordinate of the direction vector
    diry = 1   # Y coordinate of the direction vector
    drawstate = True
    
    # Whatever convention is decided upon to transmit the coordinates and required information
    # through the socket will go here.
    def transmit(self,startx, starty, endx, endy):
        print ("message to go to the socket goes here")
        
    # Moves the turtle forward relative to the direction vector. Note that if the length
    # of the direction vector is not one this function will fail to work properly.
    def forward(self, distence):
        this.x=int(this.x + (distence*dirx))
        this.y=int(this.y + (distence*diry))
    
    # Moves the turtle to the cartesian coordinate specified. To maintain proper
    # turtle functionality this function must pain depending on the state of drawstate
    def setposition(self,x,y):
        this.x = x
        this.y = y
        
    # Moves the turtle position to the origin, (0,0). Direction vector and pen state are
    # unchanged
    def home(self):
        this.x=0
        this.y=0
        
    # Converts the direction vector to an angle, adds in the value of
    # the parameter angle, in radians, and then converts the angle back
    # into a direction vector. It is important that the length of the direction
    # remain 1 or the speed of the turtle will be affected
    def left(self,angle):
        this.dirx = math.cos(math.acos(this.dirx)+math.radians(angle))
        this.diry = math.sin(math.asin(this.diry)+math.radians(angle))
        
    def right(self,angle):
        this.left(-angle)
        
    # Sets the direction vector to the value of angle. The angle is converted into
    # vector coordinates using arc cos and arc sin functions. It is important that the length of the direction
    # remain 1 or the speed of the turtle will be affected.
    def setangle(self,angle):
        this.dirx=math.acos(math.radians(angle))
        this.diry=math.asin(math.radians(angle))
        
    # Sets the turtle to draw lines
    def pendown(self):
        drawstate = True
        
    # Sets the turtle to stop drawing lines
    def  penup(self):
        drawstate = False