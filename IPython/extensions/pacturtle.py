import math
""" Replacement for the python turtle library. This class is intended to work with the
    IPython notebook to transmit the coordinates of the lines the turtle will draw
    through the socket, instead of just displaying the final picture. """

class pacattackturtle(object):
    x, y = 0 , 0  # X and Y cartesian coordinate
    dirx, diry = 0, 1   #the direction vector
    drawstate = True # determines if the draw state is true

    """ Whatever convention is decided upon to transmit the coordinates and required information
        through the socket will go here."""
    def transmit(self,startx, starty, endx, endy):
        print ("%d,%d,%d,%d,%b")(startx,starty,endx,endy,drawstate)

    """ Moves the turtle forward relative to the direction vector. Note that if the length
        of the direction vector is not one this function will fail to work properly. """
    def forward(self, distance):
        tempx=int(this.x + (distance*dirx))
        tempy=int(this.y + (distance*diry))
        this.transmit(x,y,tempx,tempy,this.drawstate)
        this.x=newx
        this.y=newy

    """ Moves the turtle to the cartesian coordinate specified. To maintain proper
        turtle functionality this function must paint depending on the state of drawstate """
    def setposition(self,x,y):
        tempx = this.x
        tempy = this.y
        this.x = x
        this.y = y
        trasmit(x,y,this.x,this.y,this.drawstate)

    """ Moves the turtle position to the origin, (0,0). Direction vector and pen state are
        unchanged """
    def home(self):
        tempx = this.x
        tempy = this.y
        this.x=0
        this.y=0
        trasmit(x,y,this.x,this.y,this.drawstate)

    """ Converts the direction vector to an angle, adds in the value of
        the parameter angle, in radians, and then converts the angle back
        into a direction vector. It is important that the length of the direction
        remain 1 or the speed of the turtle will be affected. In the codes current state the direction
        vector will always remain length 1, unless the code is modified without keeping this in mind """
    def left(self,angle):
        this.dirx = math.cos(math.acos(this.dirx)+math.radians(angle))
        this.diry = math.sin(math.asin(this.diry)+math.radians(angle))

    """ Converts the direction vector to an angle, adds in the value of
        the parameter angle, in radians, and then converts the angle back
        into a direction vector. It is important that the length of the direction
        remain 1 or the speed of the turtle will be affected. In the codes current state the direction
        vector will always remain length 1, unless the code is modified without keeping this in mind """
    def right(self,angle):
        this.left(-angle)

    """ Sets the direction vector to the value of angle. The angle is converted into
        vector coordinates using arc cos and arc sin functions. It is important that the length of the direction
        remain 1 or the speed of the turtle will be affected. """
    def setangle(self,angle):
        this.dirx=math.acos(math.radians(angle))
        this.diry=math.asin(math.radians(angle))

    """ Sets the turtle to draw lines """
    def pendown(self):
        drawstate = True

    """ Sets the turtle to stop drawing lines """
    def  penup(self):
        drawstate = False
        