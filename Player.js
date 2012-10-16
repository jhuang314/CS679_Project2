// Player Object

var Player = {
	mesh: null, // for now, the mesh will be loaded in later.
	
	load: function(geometry){
		console.log("Player.load()");
		this.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		
		
		//playerMesh.rotation.x = Math.PI / 5;
		//playerMesh.rotation.y = Math.PI / 5;
		this.mesh.scale.x = 0.7;
		this.mesh.scale.y = 0.7;
		this.mesh.scale.z = 0.7;
		
		//playerMesh.position.x = 0.5;
		//playerMesh.position.y = 0.5;
		this.mesh.position.z = -4;
		scene.add(this.mesh);
		
		if(this.mesh !== null){
			console.log("mesh created");
		}
	
	}


}
