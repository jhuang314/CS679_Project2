// 

var LandingPadMap = null;
var LandingPadMaterial = null;
var LandingPadGeometry = null;

var LandingPad = function(x,y,z){
	if(LandingPadMap === null){
		LandingPadMap =  THREE.ImageUtils.loadTexture('textures/LandingPad.png', new THREE.UVMapping(), function() {renderer.render(scene);})
		LandingPadMaterial = new THREE.MeshPhongMaterial({map:LandingPadMap, emissive: 0x333333, shininess:0});
		LandingPadGeometry = new THREE.CubeGeometry(30, 5, 30);
	}
	this.pVec = new THREE.Vector3(x,y,z);
	
	this.landMin = new THREE.Vector3(x - 12,y+5,z - 12);
	this.landMax = new THREE.Vector3(x + 12,y+5 + 40,z + 12);
	
	this.padMin = new THREE.Vector3(x - 15, y-5, z - 15);	
	this.padMax = new THREE.Vector3(x + 15, y+5, z + 15);
	
	this.mesh = new THREE.Mesh(LandingPadGeometry, LandingPadMaterial);
	this.mesh.position = this.pVec;
	scene.add(this.mesh);
	
	this.hasShip = false;
	this.dontAsk = false;
}

LandingPad.prototype = {
	constructor: LandingPad,
	
	collisionResponse: function(responseVector, insideObject){},

	// gives a sphere which the object will collide with itself
	// returns null if no collision, response vector if there is a colision
	collideSphere: function(pos,radius, objectType){
		if(objectType === 4){
			try{
				if(SphereAABB_Intersect(pos, radius, this.landMin, this.landMax )){
					
					
					
					if(Player.isWalking && this.hasShip){
						setStatusAction("Press 'F' to Fly.");
						if( 70 in keysDown && keysDown[70] && gState == GAMESTATE.PLAYING && !this.dontAsk){ // F
					    	Player.toggleFlyWalk();	
					    	this.hasShip = false;
					    	this.dontAsk = true;
						} else {
						    this.dontAsk = false;
						}
					} else if(!Player.isWalking) {
						setStatusAction("Press 'F' to Land.");
						if( 70 in keysDown && keysDown[70] && gState == GAMESTATE.PLAYING && !this.dontAsk){ // F
					    	Player.fly_pVec.x = this.pVec.x;
					    	Player.fly_pVec.y = this.pVec.y + 5 + 3;
					    	Player.fly_pVec.z = this.pVec.z;
							Player.toggleFlyWalk();
							this.hasShip = true;
							this.dontAsk = true;	
						} else {
							this.dontAsk = false;
						}
					}
					
										   
				}		
			}catch (e){}
		}
	
		
		try{
			if(SphereAABB_Intersect(pos, radius, this.padMin, this.padMax )){
				return InterDistVect.clone();    
			}		
		}catch (e){}
		return null;
		
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