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
    circle(0, 0, 50);
    context.restore();

}

var circle = function(x, y, radius){
    context.beginPath();
    context.ellipse(x, y, radius, radius, 0, 0, tau, false);
    context.closePath();
    context.fill();
};

draw();