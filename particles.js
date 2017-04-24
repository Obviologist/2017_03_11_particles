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
    particleList = particleList.filter(deadParticleFilter);
    context.restore();
};

var particleLoop = function(particle){
    particle.update();
    particle.render();
};
var deadParticleFilter = function (particle) {
    return particle.alive;
};

var circle = function(x, y, radius, hue, sat, alpha){
    context.beginPath();
    context.ellipse(x, y, radius, radius, 0, 0, tau, false);
    context.closePath();
    context.fillStyle = getHslaStringFromNormalizedValues(
        hue,
        sat,
        0.5,
        alpha
    );
    context.fill();
};

var getHslaStringFromNormalizedValues = function(h, s, l, a){
    return 'hsla(' + (h * 360) + ', ' + (s * 100) + '%, ' + (l * 100) + '%, ' + a + ')';
};

var Particle = function(seed, startX, startY){
    this.seed = seed;
    this.rng = new RNG(this.seed);
    this.xPos = startX;
    this.yPos = startY;
    this.hue = this.rng.nextFloat();
    this.sat = this.rng.nextFloat();
    var angle = this.rng.nextFloat() * tau;
    var speed = 1 + this.rng.nextFloat();
    this.xVel = Math.cos(angle) * speed;
    this.yVel = Math.sin(angle) * speed;
    this.lifespan = this.rng.nextRange(50, 200);
    this.life = this.lifespan;
    this.alive = true;
};
Particle.prototype = {
    update: function(){
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        this.life -= 1;
        if(this.life < 1){
            this.alive = false;
        }
    },
    render: function(){
        circle(
            this.xPos,
            this.yPos,
            5,
            this.hue,
            this.sat,
            this.life / this.lifespan
        );
    }
};

var particleList = [];
var particleSeedRng = new RNG(2);

var makeFirework = function(x, y){
    var numberOfParticles = particleSeedRng.nextRange(60, 120);
    while(numberOfParticles-- > 0){
        var extraRandomSeed = particleSeedRng.nextFloat() * 200000;
        var particleInstance = new Particle(
            extraRandomSeed,
            x,
            y
        );
        particleList.push(particleInstance);
    }
};

var handleClick = function(event){
    makeFirework(
        event.clientX - halfWidth,
        event.clientY - halfHeight
    );
};

canvas.addEventListener('click', handleClick);


var drawLoop = function(){
    requestAnimationFrame(drawLoop);
    draw();
};

drawLoop();