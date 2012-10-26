
var boxMaterial = null;

var BoxTest = function(x,y,z, w,h,l){

	var geometry =  new THREE.CubeGeometry(w, h, l);
	
	this.vectorMin = new THREE.Vector3(-w/2 + x, -h/2 + y, -l/2 + z);
	this.vectorMax = new THREE.Vector3(w/2 + x, h/2 + y, l/2 + z);
	
	this.material = new THREE.MeshPhongMaterial({color: 0x000088, ambient: 0x000088, specular: 0x008888, emissive: 0x000044, shininess:3});
	this.material2 = new THREE.MeshPhongMaterial({color: 0x008800, ambient: 0x008800, specular: 0x008888, emissive: 0x004400, shininess:3});

	if(boxMaterial === null){
		var boxMap =  THREE.ImageUtils.loadTexture('textures/basalt-tiles.png', new THREE.UVMapping(), function() {renderer.render(scene);})
		boxMaterial = new THREE.MeshPhongMaterial({map:boxMap, emissive: 0x333333, shininess:0});
		
			
	}
	
	this.mesh = new THREE.Mesh(geometry, boxMaterial);
	
	
	this.pVec = new THREE.Vector3(x,y,z);
	
	this.mesh.position = this.pVec;
	this.mesh.castShadow = true; 
	scene.add (this.mesh);

}

BoxTest.prototype = {
	
	constructor: BoxTest,

	collideSphere: function(pos,radius, objectType){
	    try{
			if(SphereAABB_Intersect(pos, radius, this.vectorMin, this.vectorMax )){
				return InterDistVect.clone();    
			}		
		}catch (e){}
		
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
	
		this.counter ++;
		
		/*if (!Player.isWalking){
			try{ // try block because Player doesn't get loaded until later. 
				if(SphereAABB_Intersect(Player.fly_pVec, 5, this.vectorMin, this.vectorMax )){
				
					var vec = InterDistVect;
					
					var vecUnit = InterDistVect.clone().normalize();
					
					var vecPrime = vecUnit.clone().multiplyScalar((5 - InterDistVect.length()));
					//console.log(vecPrime);
					Player.fly_pVec.addSelf(vecPrime);
				    this.mesh.material = this.material2;
				}  else{
				    this.mesh.material = this.material;
				}
				
				
			}catch(e){
				console.log(e.message)
			}
			
		} else {
			try{ // try block because Player doesn't get loaded until later. 
				if(SphereAABB_Intersect(Player.pVecWalk, 2, this.vectorMin, this.vectorMax )){
				
					var vec = InterDistVect;
					
					var vecUnit = InterDistVect.clone().normalize();
					
					var vecPrime = vecUnit.clone().multiplyScalar((2 - InterDistVect.length()));
					//console.log(vecPrime);
					Player.pVecWalk.addSelf(vecPrime);
					if(eqlsTol(vecUnit.y, 1 , 0.1)){
						Player.walkVY = 0;
						Player.groundContact = true;					
					} else if(eqlsTol(vecUnit.y, -1 , 0.1)){
						Player.walkVY = 0;
					}
				    this.mesh.material = this.material2;
				}  else{
				    this.mesh.material = this.material;
				}
				
				
			}catch(e){
				console.log(e.message)
			}
		}*/
		
		this.timeAlive += timeElapsed;
		
		
		return STATE.ALIVE;		
	}

}
