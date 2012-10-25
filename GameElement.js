// GameElement
var GameElement = function(mesh){
	this.mesh = mesh;
	
	this.timeAlive = 0;
	
	this.pos = new THREE.Vector3(0,0,0);
	
	this.radius = 0;
	

}



GameElement.prototype = {
	
	constructor: GameElement,

	collisionResponse: function(responseVector, insideObject, objectType){},

	// gives a sphere which the object will collide with itself
	// returns null if no collision, response vector if there is a colision
	collideSphere: function(pos,radius){
		return null; // the prototype returns null
	},

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