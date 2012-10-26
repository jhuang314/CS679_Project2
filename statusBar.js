var popCount = 0;
function drawStatusBar() {
	ctx.clearRect(0, canvas.height-50, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.globalAlpha = 0.1;
	ctx.fillRect(0, canvas.height-50, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "black";
	ctx.font = "20px Verdana";	
	ctx.textBaseline = 'bottom';	
	ctx.fillText("Bubble : " + popCount/2, 5, canvas.height-15);
	ctx.fillText("Time : " + Math.round(clock.getElapsedTime()*10)/10, 150, canvas.height-15);
	
}