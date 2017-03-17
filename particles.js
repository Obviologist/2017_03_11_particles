var canvas = document.getElementById('particleCanvas');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var halfWidth = width / 2;
var halfHeight = height / 2;
var tau = Math.PI * 2;

var draw = function () {
    context.save();
    context.clearRect(0, 0, width, height);
    context.translate(halfWidth, halfHeight);
    particleList.forEach(particleLoop);
    context.restore();
};

var particleLoop = function(particle){
    particle.update();
    circle(
        particle.xPos,
        particle.yPos,
        5,
        particle.hue,
        particle.sat
    );
};

var circle = function(x, y, radius, hue, sat){
    context.beginPath();
    context.ellipse(x, y, radius, radius, 0, 0, tau, false);
    context.closePath();
    context.fillStyle = getHslStringFromNormalizedValues(
        hue,
        sat,
        0.5
    );
    context.fill();
};

var getHslStringFromNormalizedValues = function(h, s, l){
    return 'hsl(' + (h * 360) + ', ' + (s * 100) + '%, ' + (l * 100) + '%)';
};

var Particle = function(seed){
    this.seed = seed;
    this.rng = new RNG(this.seed);
    this.xPos = this.rng.nextRange(-halfWidth, halfWidth);
    this.yPos = this.rng.nextRange(-halfHeight, halfHeight);
    this.hue = this.rng.nextFloat();
    this.sat = this.rng.nextFloat();
    this.xVel = this.rng.nextFloat() - 0.5;
    this.yVel = this.rng.nextFloat() - 0.5;
};
Particle.prototype = {
    update: function(){
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
};

var particleList = [];
var a = 100;
var particleSeedRng = new RNG(2);
while(a-- > 0){
    var extraRandomSeed = particleSeedRng.nextFloat() * 200000;
    var particleInstance = new Particle(extraRandomSeed);
    particleList.push(particleInstance);
}
var drawLoop = function(){
    requestAnimationFrame(drawLoop);
    draw();
};

drawLoop();