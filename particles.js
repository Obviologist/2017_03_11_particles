var canvas = document.getElementById('particleCanvas');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var halfWidth = width / 2;
var halfHeight = height / 2;
var tau = Math.PI * 2;

var draw = function () {
    context.save();
    context.translate(halfWidth, halfHeight);
    particleList.forEach(particleLoop);
    context.restore();
};

var particleLoop = function(particle){
    circle(
        particle.x,
        particle.y,
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
    this.x = this.rng.nextRange(-halfWidth, halfWidth);
    this.y = this.rng.nextRange(-halfHeight, halfHeight);
    this.hue = this.rng.nextFloat();
    this.sat = this.rng.nextFloat();
};

var particleList = [];
var a = 1000;
var particleSeedRng = new RNG(2);
while(a-- > 0){
    var extraRandomSeed = particleSeedRng.nextFloat() * 200000;
    var particleInstance = new Particle(extraRandomSeed);
    particleList.push(particleInstance);
}

draw();