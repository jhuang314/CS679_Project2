// 

var SlidingBox = function(x,y,z, w,h,l, walkPush){

	var geometry =  new THREE.CubeGeometry(w, h, l);
	
	this.vectorMin = new THREE.Vector3(-w/2 + x, -h/2 + y, -l/2 + z);
	this.vectorMax = new THREE.Vector3(w/2 + x, h/2 + y, l/2 + z);
	
	this.w = w;
	this.h = h;
	this.l = l;

	this.walkPush = walkPush;
	
	this.material = new THREE.MeshPhongMaterial({color: 0x664488, ambient: 0x000088, specular: 0x008888, emissive: 0x332244, shininess:3});
	//this.material2 = new THREE.MeshPhongMaterial({color: 0x008800, ambient: 0x008800, specular: 0x008888, emissive: 0x004400, shininess:3});

	this.mesh = new THREE.Mesh(geometry, this.material);
	
	
	this.pVec = new THREE.Vector3(x,y,z);
	
	this.mesh.position = this.pVec;
	this.mesh.castShadow = true; 
	scene.add (this.mesh);

}

SlidingBox.prototype = {
	
	constructor: SlidingBox,

	collideSphere: function(pos, radius, objectType){
	    
	    if(objectType === 4 && Player.isWalking === this.walkPush){
			try{
				if(SphereAABB_Intersect(pos, radius, this.vectorMin, this.vectorMax )){
					var r = InterDistVect.clone();    
				} else {
				    return null;
				}		
			}catch (e){return null;}
			
			var vecPrime = r.clone().normalize().multiplyScalar((Player.radius - r.length()));
			
			this.pVec.x += -vecPrime.x;
			this.pVec.z += -vecPrime.z;
			r.x = 0;
			r.z = 0;
			
			this.vectorMin = new THREE.Vector3(-this.w/2 + this.pVec.x, -this.h/2 + this.pVec.y, -this.l/2 + this.pVec.z);
			this.vectorMax = new THREE.Vector3(this.w/2 + this.pVec.x, this.h/2 + this.pVec.y, this.l/2 + this.pVec.z);
	
			
			return r;
			
		}else{
			try{
				if(SphereAABB_Intersect(pos, radius, this.vectorMin, this.vectorMax )){
					return InterDistVect.clone();    
				}		
			}catch (e){}
		}
		
		
		
		return null; 
	},
	
	collisionResponse: function(responseVector, insideObject){
		// none yet. 
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
