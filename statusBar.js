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
		ctx.fillText("Bubble : " + popCount/2, 10, canvas.height-15);
		ctx.fillStyle = "#57E964";
		score = Math.round(popCount/2 * 300 * 10) / 10;
		ctx.fillText("Score : " + score, canvas.width/2 - 80, canvas.height-15);
		ctx.fillStyle = "yellow";
		ctx.fillText("Time : " + Math.round(clock.getElapsedTime()*10)/10, canvas.width - 140, canvas.height-15);
		
		
		
		if(ActionSet){
			ctx.fillStyle = "dark-green";
			tipTimeLeft = 0;
			ActionSet = false;
			ctx.textAlign = "middle";
			ctx.font = "30px Verdana";
			ctx.fillText(StatusAction, canvas.width/2 -(Math.round(ctx.measureText(StatusAction).width/2)), 100);
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
	
	if	(Math.round(clock.getElapsedTime()*10)/10 > 3000)
		gState = GAMESTATE.END;
}

function drawMainMenu() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.globalAlpha = 0.8;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.font = "bold 50px Verdana";	
	ctx.fillText("Flight Simulator", (canvas.width/2) - 230, canvas.height/2);
	ctx.fillStyle = "blue";
	ctx.font = "bold 30px Verdana";	
	ctx.fillText("Press Enter to Start", (canvas.width/2) - 180, canvas.height/2 + 50);
}

function drawEnding() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.globalAlpha = 1;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.font = "bold 80px Verdana";	
	ctx.fillText("Game Over", (canvas.width/2) - 250, canvas.height/2 - 50);
	ctx.fillStyle = "yellow";
	ctx.font = "bold 30px Verdana";	
	ctx.fillText("Press F5 to Restart", (canvas.width/2) - 170, canvas.height/2 + 50);
	
	ctx.fillStyle = "#F9B7FF";
	ctx.font = "20px Verdana";	
	ctx.fillText("Bubble : " + popCount/2, 10, canvas.height-15);
	ctx.fillStyle = "#57E964";
	ctx.fillText("Score : " + score, canvas.width/2 - 80, canvas.height-15);
	
	Player.flySpeed = 0;
	clock.stop(); 
	bgElement.pause();
}