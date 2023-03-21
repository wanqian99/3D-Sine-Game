var distance;
var length;
var confLocs = [];
var confTheta = [];

function setup() {
    createCanvas(900, 800, WEBGL);
    
    //sliders
    Confslider();
    Boxslider();
    Camslider();
    
    //step5: push confetti location and rotation angle to their array based on the slider value
    for(var i = 0; i < confettiSlider.value(); i++) {
        var xLoc = random(-500, 500);
        var yLoc = random(-800, 0);
        var zLoc = random(-500, 500);
        confLocs.push(createVector(xLoc, yLoc, zLoc));
        confTheta.push(random(0, 360));
    } 
}

function draw() {
    background(125);
    angleMode(DEGREES);
    
    
    //step4: camera settings
    var xLoc = cos((frameCount/5)*camSlider.value()) * 1200;
    var yLoc = sin((frameCount/5)*camSlider.value()) - 1000;
    var zLoc = sin((frameCount/5)*camSlider.value()) * 1200;
    camera(xLoc, yLoc, zLoc, 0, 0, 0, 0, 1, 0);
    
    
    confetti();
    
    
    //light settings
    ambientLight(150);
    directionalLight(255, 255, 255, 0, height, 0);
    
    
    ////step2: material settings
    //normalMaterial();
    stroke(0);
    strokeWeight(2);
    
    
    ////step1: boxes
    var pink = color(255, 125, 245);
    var blue = color(65, 135, 245);
    
    for(var x = -400; x <= 400; x+=50) {
        for(var z = -400; z <= 400; z+=50) {
            push();
            //translate each box to its correct position
            translate(x, 0, z);
            
            //step3:
            distance = dist(0, 0, x, z) + frameCount;
            length = map(sin(distance), -1, 1, 100, 300);
            
            //map height of each box from 0 to 300 to between 0 and 1 and use it for lerpColor, to change each box's colour based on its height.
            //the value 300 is based on an estimation of the box's max height by doing a noLoop() and a console.log(length).
            //From the console, I noticed a pattern whereby after the height of the box(length) reached a peak of 299.95 (when the slider value is 300) it continues to decrease.
            var n = map(length+boxSlider.value(), 0, 300+boxSlider.value(), 0, 1);
            
            //lerpColor is used for smooth box color change
            var col = lerpColor(pink, blue, n-0.3);
            
            //box material
            ambientMaterial(col);
            
            box(50, length+boxSlider.value()-300, 50);
            pop();
        }
    }
    //noLoop();
}



//step5:
function confetti() {
    normalMaterial();
    noStroke();
    
    //loop through the confettis based on the slider value
    for(var i = 0; i < confettiSlider.value(); i++) {
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15, 15);
        pop();
        
        //step 6: continue the rotation of the confettis
        confLocs[i].y += 1;
        confTheta[i] += 10;
        
        //if the confetti'y y value is more than 0, reset it to the top, -800
        if(confLocs[i].y > 0) {
            confLocs[i].y = -800;
        }
    }
}



//step 7: extension
function Confslider() {
    //confetti slider
    confettiSlider = createSlider(0, 200, 200);
    confettiSlider.position(0, 50);
    
    //get the element of the confetti slider
    var conf = document.getElementById("ConfSlider");
    confettiSlider.parent(conf);
    
    //make the html be the slider value
    var output = document.getElementById("confval");
    output.html = confettiSlider.value();
    
    //update the html based on the slider value oninput
    conf.oninput = function() {
      output.innerHTML = confettiSlider.value();
    }
}



//step 7: extension
function Boxslider() {
    //cbox slider
    boxSlider = createSlider(300, 1000, 300);
    boxSlider.position(0, 100);
    
    //get the element of the box slider
    var box = document.getElementById("BoxSlider");
    boxSlider.parent(box);
    
    //make the html be the slider value
    var output = document.getElementById("boxval");
    output.html = boxSlider.value();
    
    //update the html based on the slider value oninput
    box.oninput = function() {
      output.innerHTML = boxSlider.value();
    }
}



//step 7: extension
function Camslider() {
    //camer slider
    camSlider = createSlider(-5, 5, 1, 0.5);
    camSlider.position(0, 150);
    
    //get the element of the camera slider
    var box = document.getElementById("CamSlider");
    camSlider.parent(box);
    
    //make the html be the slider value
    var output = document.getElementById("camval");
    output.html = camSlider.value();
    
    //update the html based on the slider value oninput
    box.oninput = function() {
      output.innerHTML = camSlider.value();
    }
}