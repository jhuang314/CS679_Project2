// Balloon 

var Balloon = function(x,y,z, radius, w,h,l, ropeLen){




	var geometryBlock =  new THREE.CubeGeometry(w, h, l);
	var geometrySphere =  new THREE.SphereGeometry(radius);
	
	this.vectorMin = new THREE.Vector3(-w/2 + x, -h/2 + y - ropeLen, -l/2 + z);
	this.vectorMax = new THREE.Vector3(w/2 + x, h/2 + y - ropeLen, l/2 + z);
	
	this.w = w;
	this.h = h;
	this.l = l;
	
	this.radius = radius;
	
	
	
	this.materialBlock = new THREE.MeshPhongMaterial({color: 0x664488, ambient: 0x000088, specular: 0x008888, emissive: 0x332244, shininess:0});
	this.materialSphere = new THREE.MeshPhongMaterial({color: 0xff0000, ambient: 0x880000, specular: 0xffffff, emissive: 0xaa0000, shininess:6});

	this.meshBlock = new THREE.Mesh(geometryBlock, this.materialBlock);
	this.meshSphere = new THREE.Mesh(geometrySphere, this.materialSphere);
	
	this.pVecSph = new THREE.Vector3(x,y,z);
	
	this.pVecBlk = new THREE.Vector3(x,y-ropeLen,z);
	
	this.meshSphere.position = this.pVecSph;
	this.meshBlock.position = this.pVecBlk;
	
	this.meshSphere.castShadow = true;
	this.meshBlock.castShadow = true; 
	scene.add (this.meshSphere);
	scene.add (this.meshBlock);
}

Balloon.prototype = {
	
	constructor: Balloon,

	collideSphere: function(pos, radius, objectType){
	    
	    if(objectType === 4 && !Player.isWalking){
			try{
				if(Sphere_Sphere(this.pVecSph, this.radius, pos, radius  )){
					var r = InterDistVect.clone();    
				} else if(SphereAABB_Intersect(pos, radius, this.vectorMin, this.vectorMax )){
					var r = InterDistVect.clone();
					return r;    
				} else {
				    return null;
				}		
			}catch (e){return null;}
			
			if(responseInside){
			    var vecPrime = r.clone().normalize().multiplyScalar((Player.radius + r.length()));
			} else {
				var vecPrime = r.clone().normalize().multiplyScalar((Player.radius - r.length()));
			
			}
		
			this.move(-vecPrime.x,-vecPrime.y,-vecPrime.z);
			
			return null;
			
		}else{
			try{
				if(Sphere_Sphere(pos, radius, this.pVecSph, this.radius )){
					var r = InterDistVect.clone();    
				} else if(SphereAABB_Intersect(pos, radius, this.vectorMin, this.vectorMax )){
					var r = InterDistVect.clone();
					   
				} else {return null;}
				return r; 		
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
	},
	
	move: function(x,y,z){
	    this.vectorMin.x += x;
	    this.vectorMin.y += y;
	    this.vectorMin.z += z;
	    
		this.vectorMax.y += y;
		this.vectorMax.z += z;
		this.vectorMax.x += x;
	    
		this.pVecSph.y += y;
	    this.pVecSph.z += z;
	    this.pVecSph.x += x;
	    
	    this.pVecBlk.y += y;
		this.pVecBlk.z += z;
		this.pVecBlk.x += x; 
	}

}

