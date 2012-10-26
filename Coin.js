// JavaScript Document

var CoinGeometry = null; 
var CoinMaterial = null;
var CoinSound = null;

var Coin = function(x,y,z){
	if(CoinGeometry === null){
		CoinGeometry = new THREE.CylinderGeometry( 4, 4, 1, 20);
		var rotationFix = new THREE.Matrix4();
		rotationFix.rotateX(Math.PI/2);
		CoinGeometry.applyMatrix(rotationFix);
		CoinMaterial = new THREE.MeshPhongMaterial({color: 0xffff00, ambient: 0x888800, specular: 0x008888, emissive: 0x888800, shininess:10});
		
	}
	
	this.radius = 5;
	this.pVec = new THREE.Vector3(x,y,z);
	this.mesh = new THREE.Mesh(CoinGeometry,CoinMaterial);
	this.mesh.position = this.pVec;
	this.remove = false;
	scene.add(this.mesh);

}

Coin.prototype = {
	constructor: Coin,

	collisionResponse: function(responseVector, insideObject){},

	// gives a sphere which the object will collide with itself
	// returns null if no collision, response vector if there is a colision
	collideSphere: function(pos,radius, objectType){
		
		
		try{ // try block because Player doesn't get loaded until later. 
			if(distanceSqrd(pos, this.pVec) < Math.pow(this.radius + radius, 2)){
					//this.mesh.material = this.collisionMaterial;
				if(objectType === 4){ // player type constant is 4
				
				}	
				if(CoinSound === null){
					CoinSound = new Sound( ['sound/coinSound.wav'], 50, 1 );
				}
				//popCount++;
				score += 10;
				CoinSound.play();
				this.remove = true;
			}
		}catch(e){}
		
	
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
		this.mesh.rotation.y +=  timeElapsed * 0.001 * 6;
		
		if(this.remove){
			scene.remove(this.mesh);
			return STATE.DEAD;	
		}
		return STATE.ALIVE;		
	}

}