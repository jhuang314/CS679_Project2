var popCount = 0;

var StatusBarTip = "Test Tip -- - - - - - - -- -";
var tipTimeLeft = 2000;


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
		ctx.fillStyle = "black";
		ctx.font = "20px Verdana";	
		ctx.textBaseline = 'bottom';	
		ctx.fillText("Bubble : " + popCount/2, 5, canvas.height-15);
		ctx.fillText("Time : " + Math.round(clock.getElapsedTime()*10)/10, 150, canvas.height-15);
		
		
		if(tipTimeLeft > 0){
			
			if(tipTimeLeft < 1000){
				ctx.globalAlpha = tipTimeLeft * 0.001	
			}
			tipTimeLeft -= 20;
			ctx.textAlign = "middle";
			ctx.font = "30px Verdana";
			ctx.fillText(StatusBarTip, canvas.width/2 -(Math.round(ctx.measureText(StatusBarTip).width/2)), 100);
		}		
		
	}	
}


function drawMainMenu() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.globalAlpha = 0.8;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.font = "bold 50px Verdana";	
	ctx.fillText("Flight Simulator", (canvas.width/2) - 230, canvas.height/2);
	ctx.fillStyle = "yellow";
	ctx.font = "bold 30px Verdana";	
	ctx.fillText("Press Enter to Start", (canvas.width/2) - 180, canvas.height/2 + 50);
}