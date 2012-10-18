// Player Object

var Player = {
	mesh: null, // for now, the mesh will be loaded in later.
	
	load: function(geometry){
		
		this.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		
		
		//playerMesh.rotation.x = Math.PI / 5;
		//playerMesh.rotation.y = Math.PI / 5;
		this.mesh.scale.x = 1.7;
		this.mesh.scale.y = 1.7;
		this.mesh.scale.z = 1.7;
		
		
		
		//playerMesh.position.x = 0.5;
		//playerMesh.position.y = 0.5;
		//this.mesh.position.z = 0;
		this.mesh.position.y = 10;
		scene.add(this.mesh);
		
		spawnElement(this, ELEMENT.PLAYER);
	
	},
	
	update: function(timeElapsed){
		this.mesh.rotation.y -= 0.01;	
	}
	
	
	
	


}
