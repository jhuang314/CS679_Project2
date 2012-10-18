// GameElement
var GameElement = function(mesh){
	this.mesh = mesh;
	
	this.timeAlive = 0;
	
	

}



GameElement.prototype = {
	
	constructor: GameElement,

	onPlayerCollide: function ( ) {
		return STATE.ALIVE;	
	},
	
	onElementCollide: function ( element ) {
		return STATE.ALIVE;
	},

	update: function ( timeElapsed ) {
		this.timeAlive += timeElapsed;
		return STATE.ALIVE;		
	}

}