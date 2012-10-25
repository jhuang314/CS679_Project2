//

var BallTest = function(radius, x, y, z){
	// we'll use conservation of energy to compinsate for sampling errors 
	// define mass to be 1 kg, energy is in joules
	// since particle is at rest at time t = 0, energy is purely potential
	this.energy = 1 * 9.81 * (y - radius);   

	// check energy of system every n frames	
	this.recalcTime = 50;
	this.counter = 0;
	
	this.timeAlive = 0;
	
	this.radius = radius;

	var geometry =  new THREE.SphereGeometry(radius,50,50);
/*		
	var material = new THREE.ShaderMaterial({
	  uniforms: THREEx.UniformsLib['ball'],
	  attributes: THREEx.AttributesLib['ball'],
	  vertexShader: THREEx.ShaderLib['ball'].vertexShader,
	  fragmentShader: THREEx.ShaderLib['ball'].fragmentShader,
	  transparent: true
	});
*/	
	//var material = new THREE.MeshPhongMaterial({color: 0x000088, ambient: 0x000088, specular: 0x008888, emissive: 0x000044, shininess:3});
	
	this.collisionMaterial =  new THREE.MeshPhongMaterial({color: 0x008800, ambient: 0x008800, specular: 0x008888, emissive: 0x004400, shininess:3});
	
	
// Modified Part	
	var urls = [
		'textures/cube/skybox/px.jpg','textures/cube/skybox/nx.jpg',
		'textures/cube/skybox/py.jpg','textures/grass4.jpg',
		'textures/cube/skybox/pz.jpg','textures/cube/skybox/nz.jpg'
		];


	var textureCube = THREE.ImageUtils.loadTextureCube( urls );
	textureCube.format = THREE.RGBFormat;

	var shader = THREE.ShaderUtils.lib[ "fresnel" ];
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	uniforms[ "tCube" ].value = textureCube;

	var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms };
	var material = new THREE.ShaderMaterial( parameters );
// Modified Part		
	
	this.mesh = new THREE.Mesh(geometry, material);
	this.mesh.castShadow = true; 
	this.pVec = new THREE.Vector3(x,y,z);
	this.mesh.position = this.pVec;
	this.position = this.pVec;
	this.vVec = new THREE.Vector3(0,0,0);
	this.aVec = new THREE.Vector3(0,-9.81,0);
	
	scene.add(this.mesh);
}

BallTest.prototype = {
	
	constructor: BallTest,

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
		
		if (!Player.isWalking){
			try{ // try block because Player doesn't get loaded until later. 
				if(distanceSqrd(Player.fly_pVec, this.pVec) < Math.pow(this.radius + 5, 2)){
					this.mesh.material = this.collisionMaterial;
					sound1 = new Sound( ['sound/qubodup-crash.ogg'], 50, 1 );
					sound1.play();
				}
			}catch(e){
				console.log(e.message)
			}
			
		}
		
		
		this.timeAlive += timeElapsed;
		
		this.pVec.x += this.vVec.x * timeElapsed * 0.001		
		this.pVec.y += this.vVec.y * timeElapsed * 0.001
		this.pVec.z += this.vVec.z * timeElapsed * 0.001
		
		this.vVec.x += this.aVec.x * timeElapsed * 0.001		
		this.vVec.y += this.aVec.y * timeElapsed * 0.001
		this.vVec.z += this.aVec.z * timeElapsed * 0.001
		
		var tH = 0;
		
		try{
			tH = getTerrainHeight(terrainMesh, this.pVec.x, this.pVec.z);
		} catch (e) {
		
		}		
		
		// use this to fix the energy
		var bounce = false;
		
		if(this.pVec.y - this.radius < tH){
		    bounce = true; 
			this.pVec.y = tH + this.radius;
			
			this.vVec.multiplyScalar(-1);	
		}
		
		if(bounce){
		    // recalculate energy of system:
			var new_P_E = (9.81) * (this.pVec.y - this.radius);
			var new_K_E = 0.5 * Math.pow(this.vVec.y, 0);
			
			if(this.energy - new_P_E >= 0){
				var vMag = Math.sqrt( 2 * (this.energy - new_P_E ));
				if(Math.abs(this.vVec.y) > 0.00001){
					this.vVec.y = vMag * this.vVec.y / Math.abs(this.vVec.y);
				}
			} else {
			    this.pVec.y = (this.energy - new_K_E) / (9.81);
			}
			
			
			
			this.counter = 0;
		}
		
		this.mesh.position = this.pVec;
		
		return STATE.ALIVE;		
	}

}
