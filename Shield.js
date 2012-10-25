// shield 

var RedShield = function(x,y,z, radius){
	
	this.radius = radius;
	
	var geometry =  new THREE.SphereGeometry(radius, 16,12);
	
	var material = new THREE.MeshPhongMaterial({color: 0x880000, ambient: 0x880000, specular: 0xff0000, emissive: 0x440000, shininess:3});
	var material2 = new THREE.LineBasicMaterial({color: 0xFF0000});
	material.opacity = 0.5;
	material.side = THREE.DoubleSide;
	material.transparent = true;
	//geometry.materials[0] = material2;
	//geometry.materials[1] = material2;
	
	this.mesh = new THREE.Mesh(geometry,material);
	//this.mesh.castShadow = true; 
	this.pVec = new THREE.Vector3(x,y,z);
	
	this.mesh.position = this.pVec;
	this.position = this.pVec;
	
	
	scene.add(this.mesh);

}

RedShield.prototype = {
	
	constructor: RedShield,
	
	collisionResponse: function(responseVector, insideObject){
		// none yet. 
	},

	onPlayerCollide: function ( ) {
		return STATE.ALIVE;	
	},
	
	collideSphere: function(pos,radius){
	    try{ 
			if(Sphere_Sphere(this.position, this.radius, pos, radius)){
				return InterDistVect.clone();    
			}		
		}catch (e){}
		
		return null; 
	},
	onElementCollide: function ( element ) {
		return STATE.ALIVE;
	},

	update: function ( timeElapsed ) {
	
		var vecX = this.position.x - mainCamera.position.x;
	    var vecY = this.position.y - mainCamera.position.y;
	    var vecZ = this.position.z - mainCamera.position.z;
		var dd = vecX * vecX + vecY * vecY + vecZ * vecZ;		
		if(dd < this.radius * this.radius){
			this.mesh.material.side = THREE.BackSide;		
		}  else {
			this.mesh.material.side = THREE.FrontSide;
		}
		
		this.timeAlive += timeElapsed;
		
		
		return STATE.ALIVE;		
	}

}

var GreenShield = function(x,y,z, radius){
	
	this.radius = radius;
	
	var geometry =  new THREE.SphereGeometry(radius, 16,12);
	
	var material = new THREE.MeshPhongMaterial({color: 0x008800, ambient: 0x008800, specular: 0x00ff00, emissive: 0x004400, shininess:3});
	var material2 = new THREE.LineBasicMaterial({color: 0xFF0000});
	material.opacity = 0.5;
	material.side = THREE.DoubleSide;
	material.transparent = true;
	//geometry.materials[0] = material2;
	//geometry.materials[1] = material2;
	
	this.mesh = new THREE.Mesh(geometry,material);
	//this.mesh.castShadow = true; 
	this.pVec = new THREE.Vector3(x,y,z);
	
	this.mesh.position = this.pVec;
	this.position = this.pVec;
	
	
	scene.add(this.mesh);

}

GreenShield.prototype = {
	
	constructor: GreenShield,
	
	collisionResponse: function(responseVector, insideObject){
		// none yet. 
	},

	onPlayerCollide: function ( ) {
		return STATE.ALIVE;	
	},
	
	collideSphere: function(pos,radius){
	    if(Player.isWalking){
			return null;
		}
		
		try{ 
			if(Sphere_Sphere(this.position, this.radius, pos, radius)){
				return InterDistVect.clone();    
			}		
		}catch (e){}
		
		return null; 
	},
	onElementCollide: function ( element ) {
		return STATE.ALIVE;
	},

	update: function ( timeElapsed ) {
	
		var vecX = this.position.x - mainCamera.position.x;
	    var vecY = this.position.y - mainCamera.position.y;
	    var vecZ = this.position.z - mainCamera.position.z;
		var dd = vecX * vecX + vecY * vecY + vecZ * vecZ;		
		if(dd < this.radius * this.radius){
			this.mesh.material.side = THREE.BackSide;		
		}  else {
			this.mesh.material.side = THREE.FrontSide;
		}
		
		this.timeAlive += timeElapsed;
		
		
		return STATE.ALIVE;		
	}

}