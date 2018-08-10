let canvas, ctx, mousePositionY:number, botPositionY:number, time:number, positionBallX:number, positionBallY:number;
let id:string 		    = 'easeBot';
let score:number 	   	= 0;
let scoreEnemy:number   = 0;
let speedX:number    	= 10;
let speedY:number   	= Math.ceil(-10 + Math.random() * 20);
let radius:number   	= 15;




window.onload = function(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 2;
    window.onresize = resize;
    canvas.onmousemove = moveMouse.prototype.move;
    time = setInterval(Drawing.prototype.draw,1000/70);
    mousePositionY = canvas.height/2;
    positionBallX = canvas.width/2;
    positionBallY = canvas.height/2;
    botPositionY = canvas.height/2;
    clearScore.prototype.clear();
}

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Rectangle{
    rec() {
        if(mousePositionY > canvas.height-50) mousePositionY = canvas.height-50;
        if(mousePositionY < 50) mousePositionY = 50;
        if(botPositionY > canvas.height-50) botPositionY = canvas.height-50;
        if(botPositionY < 50) botPositionY = 50;
        ctx.fillRect(50, mousePositionY - 50, 20, 100);
        ctx.fillRect(canvas.width - 70, botPositionY - 50, 20, 100);
        for(let i = 1; i<canvas.height/60;i++){
            ctx.fillRect(canvas.width/2, i*60, 5, 30);
        }
    }
}

class DrawBall{
    ball(){
        positionBallY +=  speedY;
        positionBallX +=  speedX;
        ctx.beginPath();
        ctx.arc(positionBallX, positionBallY, radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

class moveMouse{
    move(e){
        mousePositionY = e.pageY;
    }
}

class Bots{
    botEase(){
        if(positionBallY > botPositionY - 50) botPositionY += 5;
        if(positionBallY < botPositionY - 50) botPositionY -= 5;
    }

    botMedium(){
        if(positionBallY > botPositionY - 50) botPositionY += 10;
        if(positionBallY < botPositionY - 50) botPositionY -= 10;
    }

    botUnreal(){
        botPositionY = positionBallY;
    }
}

class bounseBall{
    bounce(){
        if(positionBallY > canvas.height - radius){
            positionBallY = canvas.height - radius;
            speedY *= -1;
        }
        if( positionBallY < radius ){
            positionBallY = 15;
            speedY *= -1;
        }
        if(positionBallX < radius){
            positionBallX = canvas.width/2;
            positionBallY = canvas.height/2;
            score++;
            speedX *= -1;
            speedY *= -1;
            speedX = 10;
            speedY = Math.ceil(-10 + Math.random() * 20);
        }
        if(positionBallX > canvas.width - radius){
            positionBallX = canvas.width/2;
            positionBallY = canvas.height/2;
            scoreEnemy++;
            speedX *= -1;
            speedY *= -1;
            speedX = 10;
            speedY = Math.ceil(-10 + Math.random() * 20);
        }
        if(positionBallX < 85 && positionBallX > 84 - Math.abs(speedX) && positionBallY > mousePositionY - 65 && positionBallY < mousePositionY + 65){
            speedX *=-1;
            speedX++;
            speedY = (positionBallY - mousePositionY)/5;
        }
        if(positionBallX > canvas.width -85 && positionBallX < canvas.width - (84 - Math.abs(speedX)) && positionBallY > botPositionY - 65 && positionBallY < botPositionY + 65){
            speedX *=-1;
            speedX--;
            speedY = (positionBallY - botPositionY)/5;
        }
    }
}

class textScore{
    text(){
        ctx.font = "30px Trattatello";
        ctx.fillText("Score: " + score, canvas.width/2 + 80, 100);
        ctx.fillText("Score: " + scoreEnemy, canvas.width/2 - 180, 100);
    }
}


class clearScore{
    clear(){
        document.getElementById('clear').addEventListener('click', function() {
            score = 0;
            scoreEnemy = 0;
        });
    }
}


class statusBot extends Bots{
    difficulty(click){
        id = click;
        score = 0;
        scoreEnemy = 0;
    }
    status(){
        let el;
        if(id == 'easeBot'){
            this.botEase();
            el = document.getElementById("easeBot");
            el.classList.add("easeBotClick");
        }
        else{
            el = document.getElementById("easeBot");
            el.classList.remove("easeBotClick");
        }

        if(id == 'mediumBot'){
            this.botMedium();
            el = document.getElementById("mediumBot");
            el.classList.add("mediumBotClick");
        }
        else{
            el = document.getElementById("mediumBot");
            el.classList.remove("mediumBotClick");
        }

        if(id == 'unrealBot'){
            this.botUnreal();
            el = document.getElementById("unrealBot");
            el.classList.add("unrealBotClick");
        }
        else{
            el = document.getElementById("unrealBot");
            el.classList.remove("unrealBotClick");
        }
    }
}

class Drawing{
    draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        textScore.prototype.text();
        Rectangle.prototype.rec();
        bounseBall.prototype.bounce();
        DrawBall.prototype.ball();
        statusBot.prototype.status();
    }
}


