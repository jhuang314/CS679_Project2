var popCount = 0;

var StatusBarTip = "Pop all the Bubbles!";
var tipTimeLeft = 2000;

var StatusAction = "";

var ActionSet = false;

var setStatusAction = function(action){
	StatusAction = action;
	ActionSet = true;
}

var SetStatusTip = function(tip, time){
	 StatusBarTip = tip;
	 tipTimeLeft = time;

}

function drawStatusBar() {
	if (gState == GAMESTATE.PLAYING){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		ctx.globalAlpha = 0.1;
		ctx.fillRect(0, canvas.height-50, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#F9B7FF";
		ctx.font = "20px Verdana";	
		ctx.textBaseline = 'bottom';	
		ctx.fillText("Bubbles Left : " + totalBubbles, 10, canvas.height-15);
		ctx.fillStyle = "#57E964";
		//score = Math.round(popCount/2 * 300 * 10) / 10;
		ctx.fillText("Score : " + score, canvas.width/2 - 80, canvas.height-15);
		ctx.fillStyle = "yellow";
		ctx.fillText("Time : " + Math.round(clock.getElapsedTime()*10)/10 + " sec", canvas.width - 170, canvas.height-15);
		if (!Player.isWalking){
			ctx.fillStyle = "Red";
			ctx.fillText("Speed : " + Player.flySpeed + " MPH", canvas.width - 350, canvas.height-15);
		}

		if(ActionSet){
			ctx.fillStyle = "#00EE00";
			ctx.strokeStyle = "black"                                                                          
			tipTimeLeft = 0;
			ActionSet = false;
			ctx.textAlign = "middle";
			ctx.font = "30px Verdana";
			ctx.fillText(StatusAction, canvas.width/2 -(Math.round(ctx.measureText(StatusAction).width/2)), 100);
			ctx.strokeText(StatusAction, canvas.width/2 -(Math.round(ctx.measureText(StatusAction).width/2)), 100)
		} else if(tipTimeLeft > 0){
			ctx.fillStyle = "black";
			if(tipTimeLeft < 1000){
				ctx.globalAlpha = tipTimeLeft * 0.001	
			}
			tipTimeLeft -= 20;
			ctx.textAlign = "middle";
			ctx.font = "30px Verdana";
			ctx.fillText(StatusBarTip, canvas.width/2 -(Math.round(ctx.measureText(StatusBarTip).width/2)), 100);
		}		
		
	}
	
	if	(Math.round(clock.getElapsedTime()*10)/10 >= 3000)
		gState = GAMESTATE.END;
}

function drawMainMenu() {
	var t = null;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.globalAlpha = 0.8;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.font = "bold 60px Verdana";	
	t = "Bubble Menace";
	ctx.fillText(t, canvas.width/2 -(Math.round(ctx.measureText(t).width/2)), canvas.height/2);
	ctx.fillStyle = "blue";
	ctx.font = "bold 30px Verdana";	
	t = "Press Enter to Start";
	ctx.fillText(t, canvas.width/2 -(Math.round(ctx.measureText(t).width/2)), canvas.height/2 + 70);
}

function drawEnding() {
	var t = null;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.globalAlpha = 1;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.font = "bold 80px Verdana";	
	t = "Game Over";
	ctx.fillText(t, canvas.width/2 -(Math.round(ctx.measureText(t).width/2)), canvas.height/2 - 50);
	ctx.fillStyle = "yellow";
	ctx.font = "bold 30px Verdana";	
	t = "Press F5 to Restart";
	ctx.fillText(t, canvas.width/2 -(Math.round(ctx.measureText(t).width/2)), canvas.height/2 + 50);
	
	ctx.fillStyle = "#F9B7FF";
	ctx.font = "20px Verdana";	
	ctx.fillText("Bubbles Left : " + totalBubbles, 10, canvas.height-15);
	ctx.fillStyle = "#57E964";
	t = "Score : " + score;
	ctx.fillText(t, canvas.width/2 -(Math.round(ctx.measureText(t).width/2)), canvas.height-15);
	ctx.fillStyle = "yellow";
	ctx.fillText("Time : " + Math.round(clock.getElapsedTime()*10)/10 + " sec", canvas.width - 160, canvas.height-15);
		
	Player.flySpeed = 0;
	clock.stop(); 
	bgElement.pause();
}