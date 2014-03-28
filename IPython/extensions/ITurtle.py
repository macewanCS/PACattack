import math

class ITurtle:
    
    color = {'black':0xffffff,
             'red':0xff0000,
             'blue':0x00ff00,
             'green':0x0000ff}
    homex =250
    homey = 250
    x =250
    y = 250
    angle = 90
    angleRadians = math.radians(angle)
    moveSpeed = 1
    drawState = 1
    size = 1
    lineColor = color['black']
    
    
    
    def transmit(self,startX, startY, endX, endY):
        print "PAC:%d,%d,%d,%d,%d,0x%d,%d,%d,%d." % (startX, startY, endX, endY, self.drawState, self.lineColor, self.moveSpeed, self.size, self.angle)
        
    """ Move the turtle forward relative to the current angle
        by the parameter distance. """
    def forward(self, distance):
        endX = self.x + (math.cos(self.angleRadians) * distance)
        endY = self.y - (math.sin(self.angleRadians) * distance)
        self.transmit(self.x,self.y,endX,endY)
        self.x = endX
        self.y = endY
        
    """ Setter for the speed that the turtle animates. """
    def speed(self, moveSpeed):
        self.moveSpeed = moveSpeed
        self.transmit(self.x,self.y,self.x,self.y)
        
    """ Move the turtle backward relative to the current angle
        by the parameter distance. """
    def backward(self, distance):
        self.forward(-distance)
        
    """ Rotate the turtle clockwise by the parameter angle measured
        in Euler angles. """        
    def right(self, angle):
        self.angle = self.angle + angle
        self.angleRadians = math.radians(self.angle)
        self.transmit(self.x,self.y,self.x,self.y)
        
    """ Rotate the turtle clockwise by the parameter angle measured
        in Euler angles. """
    def left(self, angle):
        self.right(-angle)
        
    """ Change the state of the pen, If the pen is up then the turtle will
        no longer draw when it moves. """
    def penup(self):
        self.drawState =0;
        self.transmit(self.x,self.y,self.x,self.y)
        
    """ Change the state of the pen, If the pen is down then the turtle will
        not draw when it moves. """
    def pendown(self):
        self.drawState = 0
        self.transmit(self.x,self.y,self.x,self.y)
    
    """ Change the size of the line drawn by the turtle to the parameter size. """
    def pensize(self, size):
        self.size = size;
        self.transmit(self.x,self.y,self.x,self.y)
        
    """ Change the color of the line drawn by the turtle to the parameter color. """
    def pencolor(self, color):
        self.lineColor=self.color[color]
        self.transmit(self.x,self.y,self.x,self.y)
        
    #FIXME: dosen't do anything
    def circle(self, radius):
        return
    
    #FIXME: dosen't do anything
    def goto(self, x, y):
        return
    
    #FIXME: dosen't do anything
    def home(self):
        return
    
    """ """
    def isDown(self):
        if self.drawState == 1:
            return True
        else:
            return False
    """ """    
    def isUp(self):
        if self.drawState == 0:
            return True
        else:
            return False
            