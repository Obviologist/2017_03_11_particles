var canvas = document.getElementById('particleCanvas');
var context = canvas.getContext('2d');
var width =  canvas.width;
var height = canvas.height
var halfWidth = width / 2;
var halfHeight = height / 2;
var tau = Math.PI*2;

var draw = function () {
    context.save();
    context.translate(halfWidth, halfHeight);
    particleList.forEach(particleLoop);
    context.restore();
};


var particleLoop = function (particle){
    circle(
        particle.position.x,
        particle.position.y,
        5,
        particle.hue
    );
};

var circle = function(x, y, radius, hue){
    context.beginPath();
    context.ellipse(x, y, radius, radius, 0, 0, tau, false);
    context.closePath();
    context.fillStyle = 'hsl(' + (hue * 360) + ', 100%, 50%)';
    context.fill();
};

var Particle = function(seed){
    this.rng = new RNG(seed);
    this.position = {
        x: this.rng.nextRange(-halfWidth, halfWidth),
        y: this.rng.nextRange(-halfWidth, halfWidth)
    };
    this.hue =this.rng.nextFloat();
};

var particleList = [
    new Particle(1),
    new Particle(2),
    new Particle(3)
];

draw();