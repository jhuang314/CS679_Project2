// Player Object

var Player = {
	mesh: null, // for now, the mesh will be loaded in later.
	
	load: function(geometry){
		
		
		// set up various things
		this.pVecWalk = new THREE.Vector3(0, getTerrainHeight(terrainMesh, 0, 0) + 2, 0);
		this.rotWalk = new THREE.Vector3(0,0,0);
	
		this.walkSpeed = 5; // 5 m/s, a brisk jogging speed. 
	
		this.walkVY = 0; // velocity in the y direction
	
		this.groundContact = false;
		
		var rotationFix = new THREE.Matrix4();
		//rotationFix.rotateY(-Math.PI);
		geometry.applyMatrix(rotationFix);
			
		this.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		this.mesh.eulerOrder = 'YXZ';
		this.mesh.scale.x = 3;
		this.mesh.scale.y = 3;
		this.mesh.scale.z = 3;
		this.mesh.castShadow = true;
		this.isWalking = false;//true;
		
		// flying vectors and things:
		
		this.fly_pVec = new THREE.Vector3(0,getTerrainHeight(terrainMesh, 0, -50) + 10,-50);
		
		this.flyRoll = 0;
			
		//this.fly_vVec = new THREE.Vector3(10,0,0);
		this.fly_dir = new THREE.Vector3(0,0,0);
		this.flySpeed = 40;
		
		this.flyRotMat4 = new THREE.Matrix4();
		
		// mesh stuff
		
		this.mesh.position = this.fly_pVec;
		scene.add(this.mesh);
		
		spawnElement(this, ELEMENT.PLAYER);
	
	},
	
	update: function(timeElapsed){
		if(this.isWalking){
			this.updateWalking(timeElapsed);
        
		} else {
		    this.updateFlying(timeElapsed);
		}
		
		if ( 70 in keysDown && keysDown[70]) {	// F
            this.isWalking = !this.isWalking;
            this.pVecWalk.x = this.fly_pVec.x;
            this.pVecWalk.z = this.fly_pVec.z;
            this.pVecWalk.y = getTerrainHeight(terrainMesh, this.pVecWalk.x, this.pVecWalk.z);
        }
		
		
		
	    mainCamera.updateMatrix();	
	},
	
	// ================== F L Y I N G ==================
	
	updateFlying: function(timeElapsed){
		
		this.flyRotMat4.setRotationFromEuler(this.fly_dir,"YXZ");
		
		var vVec = new THREE.Vector3(0,0,this.flySpeed);
		vVec = this.flyRotMat4.multiplyVector3(vVec);		
		
		this.fly_pVec.addSelf(vVec.multiplyScalar(timeElapsed * 0.001));
		
		//this.fly_pVec.z -= Math.cos(this.fly_dir.y) * this.flySpeed * timeElapsed * 0.001;
    	//this.fly_pVec.x -= Math.sin(this.fly_dir.y ) * this.flySpeed * timeElapsed * 0.001;
             
		if ( 65 in keysDown) {	//A
			this.fly_dir.y += timeElapsed * 0.001 * 1;
			this.flyRoll -= timeElapsed * 0.001 * 0.5;
        } else if ( 68 in keysDown) {	//D
            
			this.fly_dir.y -= timeElapsed * 0.001 * 1;
			this.flyRoll += timeElapsed * 0.001 * 0.5;
		} else {
			if(this.flyRoll < 0.1){
				this.flyRoll += timeElapsed * 0.001 * 0.5;
				if(this.flyRoll > 0){
				   this.flyRoll = 0;
				}
			} else if(this.flyRoll > 0.1){
				this.flyRoll -= timeElapsed * 0.001 * 0.5;
				if(this.flyRoll < 0){
				   this.flyRoll = 0;
				}
			}
		}
		
		if (this.flyRoll > Math.PI / 4){
		    this.flyRoll = Math.PI/4;
		} else if (this.flyRoll < - Math.PI/4){
		    this.flyRoll = -Math.PI/4;
		}
	
		if ( 87 in keysDown) {	// S
            this.fly_dir.x += timeElapsed * 0.001 * 1;
            
			//this.flySpeed = 20;
			
		} else 	if ( 83 in keysDown) {	// W
            this.fly_dir.x -= timeElapsed * 0.001 * 1;
            
			//this.flySpeed = 60;
			
		}
	    
		if(this.fly_dir.x > Math.PI / 2){
			this.fly_dir.x = Math.PI/ 2;		                    
		} else if (this.fly_dir.x < -Math.PI / 2){
			this.fly_dir.x = -Math.PI/ 2;
		}
		
		
		this.mesh.rotation.x = this.fly_dir.x;
		this.mesh.rotation.y = this.fly_dir.y;
		this.mesh.rotation.z = this.flyRoll;
		var tH = 0;
        
        try{
        	tH = getTerrainHeight(terrainMesh, this.fly_pVec.x, this.fly_pVec.z);
			
		} catch (e){}// in case we are off the mesh
		
		if(this.fly_pVec.y - 2 < tH){
			this.fly_pVec.y = tH + 2;
			
		}
		
		light.shadowCamera.right = 100 + this.fly_pVec.x ;
		light.shadowCamera.left = -100 + this.fly_pVec.x ;
		
		light.shadowCamera.top = 100 - this.fly_pVec.z * 0.7071067811865476;
		light.shadowCamera.bottom = -100 - this.fly_pVec.z * 0.7071067811865476; 
       	
		light.shadowCamera.near = 0 - this.fly_pVec.z * 0.7071067811865476;
		light.shadowCamera.far = 1000 - this.fly_pVec.z * 0.7071067811865476; 
		
	   	light.shadowCamera.updateProjectionMatrix();
		
		var cX = Math.sin(this.fly_dir.y) * 30;
		var cZ = Math.cos(this.fly_dir.y) * 30;
		
		mainCamera.position.set(this.fly_pVec.x - cX, this.fly_pVec.y + 10, this.fly_pVec.z - cZ);
		
		mainCamera.lookAt(this.fly_pVec); 	
	},
	
	// ============= W A L K I N G ====================
	
	updateWalking: function(timeElapsed){
		this.mesh.rotation.y -= 0.01;
		//console.log(camXrot + ", "+ camYrot)
    	
    	if(dragging){
			this.rotWalk.x += frameDragPixY * 0.005;
			this.rotWalk.y += frameDragPixX * 0.005;
		
		}
    	
    	//camXrot = preDragCamRotX + dragPixY * .005;
        //camYrot = preDragCamRotY + dragPixX * .005;
    	
    	if(this.rotWalk.x > Math.PI / 2){
			this.rotWalk.x = Math.PI/ 2;		                    
		} else if (this.rotWalk.x < -Math.PI / 2){
			this.rotWalk.x = -Math.PI/ 2;
		}
    	
    	//mainCamera.rotation.y = camYrot;
		//mainCamera.rotation.x = camXrot;
    	
    	//var speed = 0.5
    
		
		if ( 87 in keysDown) {	//Up
             this.pVecWalk.z -= Math.cos(this.rotWalk.y) * this.walkSpeed * timeElapsed * 0.001;
             this.pVecWalk.x -= Math.sin(this.rotWalk.y ) * this.walkSpeed * timeElapsed * 0.001;
        } else 
        if ( 83 in keysDown) {	//Down
             this.pVecWalk.z += Math.cos(this.rotWalk.y) * this.walkSpeed * timeElapsed * 0.001;
             this.pVecWalk.x += Math.sin(this.rotWalk.y) * this.walkSpeed * timeElapsed * 0.001;
        }
        if ( 65 in keysDown) {	//Left
            this.pVecWalk.z += Math.sin(this.rotWalk.y) * this.walkSpeed * timeElapsed * 0.001;
            this.pVecWalk.x -= Math.cos(this.rotWalk.y) * this.walkSpeed * timeElapsed * 0.001;
        }
        if ( 68 in keysDown) {	//Right
            this.pVecWalk.z -= Math.sin(this.rotWalk.y) * this.walkSpeed * timeElapsed * 0.001;
            this.pVecWalk.x += Math.cos(this.rotWalk.y) * this.walkSpeed * timeElapsed * 0.001;
        }
        
        // these shortcut physics
        if ( 81 in keysDown) {	//Q
            this.pVecWalk.y += this.walkSpeed * timeElapsed * 0.001;
        }
        if ( 69 in keysDown) {	//E
            this.pVecWalk.y -= this.walkSpeed * timeElapsed * 0.001;
        }
        
        if(32 in keysDown && keysDown[32] && this.groundContact){
			this.walkVY = 10;				
		}
        
        this.walkVY += -9.81 * timeElapsed * 0.001;
        
        this.pVecWalk.y += this.walkVY * timeElapsed * 0.001;
        
        
        var tH = 0;
        
        try{
        	tH = getTerrainHeight(terrainMesh, this.pVecWalk.x, this.pVecWalk.z);
			
		} catch (e){}// in case we are off the mesh
		
		if(this.pVecWalk.y - 2 < tH){
			this.pVecWalk.y = tH + 2;
			this.walkVY = 0
			//this.groundContact = true;
		} 
		
		
		if (this.pVecWalk.y - 2 < tH + 0.5 ){ 
			this.groundContact = true;
		} else {
			this.groundContact = false;
		} 
		
		light.shadowCamera.right = 100 + this.pVecWalk.x ;
		light.shadowCamera.left = -100 + this.pVecWalk.x ;
		
		light.shadowCamera.top = 100 - this.pVecWalk.z * 0.7071067811865476;
		light.shadowCamera.bottom = -100 - this.pVecWalk.z * 0.7071067811865476; 
       	
		light.shadowCamera.near = 0 - this.pVecWalk.z * 0.7071067811865476;
		light.shadowCamera.far = 1000 - this.pVecWalk.z * 0.7071067811865476; 
		
	   	light.shadowCamera.updateProjectionMatrix();
		
		mainCamera.rotation = this.rotWalk;
		mainCamera.position = this.pVecWalk;	
	
	}
	
	
	
	


}
