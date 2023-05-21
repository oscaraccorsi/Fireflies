
let crickets;
let squares = [];

let numObjct;
let col;

//--------------------------------------preload

function preload() {
  crickets = new Tone.Player('assets/acuti.mp3').toDestination();
}

//--------------------------------------------------windowResized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let lph = 0;
let alpha, coeffAlpha;
let x, y, lung, velX, velY;
let velXarray = [-2, -1.5, -1, 1, 1.5, 2];
let velYarray = [-2, -1.5, 1.5, 2];

//------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER)
  numObjct = round(random(width / 300, width / 150));
  console.log(numObjct);
  
  
//----------------------------------sound player
  crickets.volume.value = 0;
  crickets.loop = true;
  crickets.autostart = true;       
  
  //---------------------------------------------------objects
  for (let i = 0; i < numObjct; i++) {
    squares[i] = {
      lung: 8,//random(lungArray),
      x: random(0, width),
      y: random(0, height),
      velX: random(velXarray),
      velY: random(velYarray),
      alpha: round(random(255)),
      coeffAlpha: random(9, 11),
      
      display: function() {
        
        noStroke();
        fill(255, 255, 255, this.alpha);
        
        this.alpha = this.alpha + this.coeffAlpha;
        
        if(this.alpha > 255 || this.alpha < 0) {
        this.coeffAlpha = this.coeffAlpha * -1;
        }
        if(this.alpha < 0) {
          this.x = random(0, width); //----scatto avanti o dietro 
        }
        
        ellipse(this.x, this.y, this.lung);
    },
      
      move: function() {
        
        this.x += this.velX;
        this.y += this.velY;
        if(this.x > width-this.lung/2 || this.x < this.lung/2) {
           this.velX = this.velX * -1;
       }
       if(this.y > height-this.lung/2 || this.y < this.lung/2) {
         this.velY = this.velY * -1;
       } 
    }
  }
}
 
}

//--------------------------------------------DRAW
function draw() {
  background(0,0, 25, 100);
  
  for (let i = 0; i < squares.length; i++) {
    let r = squares[i];
    squares[i].move();
    squares[i].display();
  } 
}

