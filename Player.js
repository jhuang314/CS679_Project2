// Player Object

var Player = {
	mesh: null, // for now, the mesh will be loaded in later.
	
	load: function(geometry){
		
		this.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		
		
		//playerMesh.rotation.x = Math.PI / 5;
		//playerMesh.rotation.y = Math.PI / 5;
		this.mesh.scale.x = 3;
		this.mesh.scale.y = 3;
		this.mesh.scale.z = 3;
		
		this.isWalking = true;
		
		//playerMesh.position.x = 0.5;
		//playerMesh.position.y = 0.5;
		this.mesh.position.z = -50;
		this.mesh.position.x = 0;
		this.mesh.position.y = getTerrainHeight(terrainMesh, 0, -50) + 10;
		scene.add(this.mesh);
		
		spawnElement(this, ELEMENT.PLAYER);
	
	},
	
	update: function(timeElapsed){
		this.mesh.rotation.y -= 0.01;
		//console.log(camXrot + ", "+ camYrot)
    	
    	if(camXrot > Math.PI / 2){
			camXrot = Math.PI/ 2;		                    
		} else if (camXrot < -Math.PI / 2){
			camXrot = -Math.PI/ 2;
		}
    	
    	mainCamera.rotation.y = camYrot;
		mainCamera.rotation.x = camXrot;
    	
    	var speed = 0.5
    
		if ( 87 in keysDown) {	//Up
             mainCamera.position.z -= Math.cos(mainCamera.rotation.y) * speed;
             mainCamera.position.x -= Math.sin(mainCamera.rotation.y ) * speed;
        }
        if ( 83 in keysDown) {	//Down
             mainCamera.position.z += Math.cos(mainCamera.rotation.y) * speed;
             mainCamera.position.x += Math.sin(mainCamera.rotation.y) * speed;
        }
        if ( 65 in keysDown) {	//Left
            mainCamera.position.z += Math.sin(mainCamera.rotation.y) * speed;
            mainCamera.position.x -= Math.cos(mainCamera.rotation.y) * speed;
        }
        if ( 68 in keysDown) {	//Right
            mainCamera.position.z -= Math.sin(mainCamera.rotation.y) * speed;
            mainCamera.position.x += Math.cos(mainCamera.rotation.y) * speed;
        }
        
        if ( 81 in keysDown) {	//Q
            mainCamera.position.y += speed;
        }
        if ( 69 in keysDown) {	//E
            mainCamera.position.y -= speed;
        }
        
        if(32 in keysDown && keysDown[32]){
			mainCamera.position.y += 2;				
		}
        
        var tH = 0;
        
        try{
        	tH = getTerrainHeight(terrainMesh, mainCamera.position.x, mainCamera.position.z);
			
		} catch (e){}// in case we are off the mesh
		
		if(mainCamera.position.y - 2 > tH){
			mainCamera.position.y -= 0.1;
		} else {
			mainCamera.position.y = tH + 2;
		}
		 
        
	    mainCamera.updateMatrix();	
	}
	
	
	
	


}
