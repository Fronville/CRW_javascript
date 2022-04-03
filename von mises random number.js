// Implementation following instructions from DOI: https://doi.org/10.1017/CBO9780511564345.005

function  rand_von_Mises(mu, kappa){
    if (typeof mu !== "number") {
        console.log("mu must be number");
        return; 
    }
    if (typeof kappa !== "number") {
        console.log("kappa must be number");
        return; 
    }
    if (kappa < 0) {
        console.log("kappa must be positive");
        return; 
    }

    if (kappa == 0) {
        rad_angle = 2.0*Math.PI * (Math.random() -0.5);  // number between -pi and +pi
        return rad_angle ;
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



var mu = 0;
var kappa = 3;


var arr = [];
for (i = 0; i < 10; i++) {
    var test = rand_von_Mises(0, 1);
    arr.push(test);
}

console.log(arr);

function setup() {
    createCanvas(900, 600);    
}
  