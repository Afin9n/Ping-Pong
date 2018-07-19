var canvas, ctx, num, num1, y, y1, time, X, Y, el;
var id 			= 'easeBot';
var score 		= 0;
var scoreEnemy  = 0;
var speedX  	= 10;
var speedY  	= Math.ceil(-10 + Math.random() * 20);
var radius  	= 15;

window.onload = function(){
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth - 2;
	canvas.height = window.innerHeight - 2;
	canvas.onmousemove = move;	
	time = setInterval(draw,1000/70);
	y = canvas.height/2;	
	X = canvas.width/2;
	Y = canvas.height/2;
	y1 = canvas.height/2;
	clear();
}

function rec() {
    if(y > canvas.height-50) y = canvas.height-50;
    if(y < 50) y = 50; 
    if(y1 > canvas.height-50) y1 = canvas.height-50;
    if(y1 < 50) y1 = 50;   
    ctx.fillRect(50, y - 50, 20, 100);	
    ctx.fillRect(canvas.width - 70, y1 - 50, 20, 100); 
    for(var i = 1; i<canvas.height/60;i++){
    	ctx.fillRect(canvas.width/2, i*60, 5, 30); 
	}
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);	
    Text();
    rec(); 
    bounce();
    ball();
    statusBot();
}

function ball(){ 
	Y +=  speedY;
	X +=  speedX;
    ctx.beginPath();
    ctx.arc(X, Y, radius, 0, 2 * Math.PI, false);
    ctx.fill();

}

function move(e){
	y = e.pageY;
}

function botEase(){
	if(Y > y1 - 50) y1 += 5;
	if(Y < y1 - 50) y1 -= 5;
}

function botMedium(){
	if(Y > y1 - 50) y1 += 10;
	if(Y < y1 - 50) y1 -= 10;
}

function botUnreal(){
	y1 = Y;
}

function bounce(){
	if(Y > canvas.height - radius){
		Y = canvas.height - radius; 
		speedY *= -1;
	}	
	if( Y < radius ){
		Y = 15;
		speedY *= -1;
	}
	if(X < radius){
		X = canvas.width/2;
		Y = canvas.height/2;
		score++;
		speedX *= -1;
		speedY *= -1;
		speedX = 10;
		speedY = Math.ceil(-10 + Math.random() * 20);
	}
	if(X > canvas.width - radius){
		X = canvas.width/2;
		Y = canvas.height/2;
		scoreEnemy++;
		speedX *= -1;
		speedY *= -1;
		speedX = 10;
		speedY = Math.ceil(-10 + Math.random() * 20);
	}
	if(X < 85 && X > 84 - Math.abs(speedX) && Y > y - 65 && Y < y + 65){
		speedX *=-1;
		speedX++;
		speedY = (Y - y)/5;
	}
	if(X > canvas.width -85 && X < canvas.width - (84 - Math.abs(speedX)) && Y > y1 - 65 && Y < y1 + 65){
		speedX *=-1;
		speedX--;
		speedY = (Y - y1)/5;
	}
}

function Text(){
	ctx.font = "30px Trattatello";
	ctx.fillText("Score: " + score, canvas.width/2 + 80, 50);
	ctx.fillText("Score: " + scoreEnemy, canvas.width/2 - 180, 50);
}
 
 function clear(){
	document.getElementById('clear').addEventListener('click', function() {
        score = 0;
        scoreEnemy = 0;
    });
}

function difficulty(click){
		id = click;
		score = 0;
		scoreEnemy = 0;
	}

function statusBot(){
	if(id == 'easeBot'){
 	botEase();
 	el = document.getElementById("easeBot");
 	el.classList.add("easeBotClick");
 	}
 	else{
 		el = document.getElementById("easeBot");
 		el.classList.remove("easeBotClick");
 	}

	if(id == 'mediumBot'){
		botMedium();
	el = document.getElementById("mediumBot");
 	el.classList.add("mediumBotClick");
	}
	else{
 		el = document.getElementById("mediumBot");
 		el.classList.remove("mediumBotClick");
 	}

	if(id == 'unrealBot'){
 	botUnreal();
 	el = document.getElementById("unrealBot");
 	el.classList.add("unrealBotClick");
	}
	else{
 		el = document.getElementById("unrealBot");
 		el.classList.remove("unrealBotClick");
 	}
}	


