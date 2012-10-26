// 

var LandingPadMap = null;
var LandingPadMaterial = null;
var LandingPadGeometry = null;

var LandingPad = function(x,y,z){
	if(LandingPadMap === null){
		LandingPadMap =  THREE.ImageUtils.loadTexture('textures/LandingPad.png', new THREE.UVMapping(), function() {renderer.render(scene);})
		LandingPadMaterial = new THREE.MeshPhongMaterial({map:LandingPadMap, emissive: 0x333333, shininess:0});
		LandingPadGeometry = new THREE.CubeGeometry(30, 10, 30);
	}
	this.pVec = new THREE.Vector3(x,y,z);
	
	this.landMin = new THREE.Vector3(x - 12,y+5,z - 12);
	this.landMax = new THREE.Vector3(x + 12,y+5 + 40,z + 12);
	
	this.padMin = new THREE.Vector3(x - 15, y-5, z - 15);	
	this.padMax = new THREE.Vector3(x + 15, y+5, z + 15);
	
	this.mesh = new THREE.Mesh(LandingPadGeometry, LandingPadMaterial);
	this.mesh.position = this.pVec;
	scene.add(this.mesh);
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
					setStatusAction("Press 'f' to Land.");					   
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