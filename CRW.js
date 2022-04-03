// Implementation following instructions from DOI: https://doi.org/10.1017/CBO9780511564345.005

function  random_von_Mises(mu, kappa){
  if (typeof mu !== "number") {
      return console.log("mu must be number");
      
  }
  if (typeof kappa !== "number") {
      return console.log("kappa must be number");
       
  }
  if (kappa < 0) {
      return console.log("kappa must be positive");
       
  }

  if (kappa == 0) {
      return rad_angle = 2.0*Math.PI * (Math.random() -0.5);  // number between -pi and +pi
      
  }

  a = 1.0 + Math.sqrt(1.0 + 4.0*(kappa ** 2));
  b = (a - Math.sqrt(2.0 * a)) / (2.0 * kappa);
  r = (1.0 + b ** 2) / (2.0 * b);

  n = 0;
  rad_angle = 0;
  
  while (n == 0) {

      U1 = Math.random();
      U2 = Math.random();
      U3 = Math.random();

      z = Math.cos(Math.PI * U1);
      f = (1.0 + r * z) / (r + z);
      c = kappa * (r - f);


      if (((c * (2.0 - c) - U2) > 0.0) || ((Math.log(c / U2) + 1.0 - c) > 0.0)){
          rad_angle = (Math.sign(U3 - 0.5) * Math.acos(f) + mu) % (2 * Math.PI)
          n += 1;
          
      }
          
      
    }
  return rad_angle;
}


// CRW Model ---------------------------------------------------------------

// init variables

var mu_var = 0;
var kappa_var = 15;
var init_pos_x = 2000/2;
var init_pos_y = 2000/2;

// class CRW

class CRW {
  constructor(x,y){
    this.position = createVector(x,y);
    this.velocity = p5.Vector.random2D();
    this.von_mises = random_von_Mises(mu_var, kappa_var);
    
  }

  define_velocity(){
    this.von_mises = random_von_Mises(mu_var, kappa_var);
    this.velocity.rotate(this.von_mises);
  }

  move() {
    this.position.add(this.velocity);
  }

  show(){
    strokeWeight(3);
    stroke(225);
    point(this.position.x, this.position.y);

  }
}

//  draw

const Agent = []

function setup() {
  createCanvas(2000, 2000);
  background(51);
  Agent.push(new CRW(init_pos_x, init_pos_y));
}

function draw() {
  for (let individual of Agent) {
    individual.define_velocity();
    individual.move();
    individual.show();
  }
}

  