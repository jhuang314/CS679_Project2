// 

var SwitchGeometry = null;
var SwitchMaterialOff = null;
var SwitchMaterialOn = null;
var SwitchHandleMaterial = null;  

var SwitchObj = function(x,y,z, onToggle){
	if(SwitchGeometry === null){
		var RedMap =  THREE.ImageUtils.loadTexture('textures/SwitchRed.png', new THREE.UVMapping(), function() {renderer.render(scene);});
		var GreenMap =  THREE.ImageUtils.loadTexture('textures/SwitchGreen.png', new THREE.UVMapping(), function() {renderer.render(scene);});
		var handleMap = THREE.ImageUtils.loadTexture('textures/wood.png', new THREE.UVMapping(), function() {renderer.render(scene);});
		SwitchMaterialOn = new THREE.MeshPhongMaterial({map:RedMap, emissive: 0x333333, shininess:0});
		SwitchMaterialOff = new THREE.MeshPhongMaterial({map:GreenMap, emissive: 0x333333, shininess:0});
		SwitchHandleMaterial = new THREE.MeshPhongMaterial({map:handleMap, emissive: 0x333333, shininess:0});
	    SwitchGeometry = new THREE.CubeGeometry(1, 1, 1);
	    
	    
	}

	this.pVec= new THREE.Vector3(x,y,z);
	
	this.aVecMin = new THREE.Vector3(x-5,y-2,z-5);
	this.aVecMax = new THREE.Vector3(x+5,y+2,z+5);
	
	
	this.baseMesh = new THREE.Mesh(SwitchGeometry, SwitchMaterialOff);
	this.baseMesh.scale.set(4,4,4);
	this.baseMesh.position = this.pVec;
	
	this.sVecMin = new THREE.Vector3(x-2,y-2,z-2);
	this.sVecMax = new THREE.Vector3(x+2,y+2,z+2);
	
	this.onToggle = onToggle;
	this.dontAsk = false;
	this.on = true;
	
	scene.add(this.baseMesh);
}

SwitchObj.prototype = {
	constructor: SwitchObj,

	collisionResponse: function(responseVector, insideObject){},

	// gives a sphere which the object will collide with itself
	// returns null if no collision, response vector if there is a colision
	collideSphere: function(pos,radius, objectType){
		if(objectType === 4 && Player.isWalking){
			try{
				if(SphereAABB_Intersect(pos, radius, this.aVecMin, this.aVecMax )){
					
					setStatusAction("Press 'F' Toggle Switch.");
					if( 70 in keysDown && keysDown[70] && gState == GAMESTATE.PLAYING && !this.dontAsk){ // F
					    this.on = !this.on;
						this.baseMesh.material = (this.on)? SwitchMaterialOff : SwitchMaterialOn;
						
						this.onToggle(this.on);		
					    
					    this.dontAsk = true;
					} else {
						this.dontAsk = false;
					}					   
				}		
			}catch (e){console.log(e.message)}
		}
	
		
		try{
			if(SphereAABB_Intersect(pos, radius, this.sVecMin, this.sVecMax )){
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
