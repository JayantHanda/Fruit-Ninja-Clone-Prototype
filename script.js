var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var gravity = 0.1;

var mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;

    var colorarray = [
        "red",
        "yellow",
        "green",
        "orange",
    ]

    var color = colorarray[Math.floor(Math.random()*4)];

    this.draw = function() {
        c.beginPath();
        c.fillStyle = color;
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.fill();
        c.stroke(); 
    }

    this.update = function() {

        this.dy += gravity;
    
        this.x += this.dx
        this.y += this.dy

        var dist = Math.sqrt(Math.pow(mouse.x - this.x, 2) + Math.pow(mouse.y - this.y, 2));

        if (dist <= 60) {
            this.r = 0;
        }

        this.draw();
    }
}



var circlearray = [];

function spawncircle() {
    for ( var i = 0; i < Math.random()*4; i++ ) {
        var r = 60;
        var x = Math.random()*(innerWidth - r*2) + r;
        var y = 1.1*innerHeight;
        var dx;
        if (x > innerWidth / 2) {
            dx = -(Math.random() * 3 + 2);
        }
    
        else {
            dx = (Math.random() * 3 + 2);
        }
    
        var dy =-((Math.random()*2 + 9));
        circlearray.push(new Circle(x, y, dx, dy, r));
    }
}

setInterval(spawncircle, 3000);

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    for (var i = 0; i < circlearray.length; i++) {
        circlearray[i].update();
    } 
}

animate();