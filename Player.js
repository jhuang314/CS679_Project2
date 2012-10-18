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
	
		//this.vVecWalk = new THREE.Vector3(0,0,0);
		//this.aVecWalk = new THREE.Vector3(0,0,0);
		
		this.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		
		this.mesh.scale.x = 3;
		this.mesh.scale.y = 3;
		this.mesh.scale.z = 3;
		
		this.isWalking = true;
		
		this.mesh.position = new THREE.Vector3(0,getTerrainHeight(terrainMesh, 0, -50) + 10,-50);
		scene.add(this.mesh);
		
		spawnElement(this, ELEMENT.PLAYER);
	
	},
	
	update: function(timeElapsed){
		
		this.updateWalking(timeElapsed);
        
	    mainCamera.updateMatrix();	
	},
	
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
		
		
		if (this.pVecWalk.y - 2 < tH + 0.1 ){ 
			this.groundContact = true;
		} else {
			this.groundContact = false;
		} 
		mainCamera.rotation = this.rotWalk;
		mainCamera.position = this.pVecWalk;	
	
	}
	
	
	
	


}
