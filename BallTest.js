//

var BallTest = function(radius, x, y, z){
	
	
	this.timeAlive = 0;
	
	this.radius = radius;
	
	var geometry =  new THREE.SphereGeometry(radius);
	
	var material = new THREE.MeshPhongMaterial({color: 0x000088, ambient: 0x000088, specular: 0x008888, emissive: 0x000044, shininess:3});
	
	this.mesh = new THREE.Mesh(geometry, material);
	
	this.pVec = new THREE.Vector3(x,y,z);
	
	this.mesh.position = this.pVec;
	
	this.vVec = new THREE.Vector3(0,0,0);
	this.aVec = new THREE.Vector3(0,-9.81,0);
	console.log("Ball Mesh: " + this.mesh.position.y + " pVec" + this.pVec.y)
	scene.add(this.mesh);
}

var debug11 = 10;
var debug12 = 10;

BallTest.prototype = {
	
	constructor: BallTest,

	onPlayerCollide: function ( ) {
		return STATE.ALIVE;	
	},
	
	onElementCollide: function ( element ) {
		return STATE.ALIVE;
	},

	update: function ( timeElapsed ) {
	
		
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
		
		
		if(this.pVec.y - this.radius < tH){
		    
		    var overShoot = tH - this.pVec.y + this.radius ;
		    
			this.pVec.y = tH + this.radius;
			
			this.vVec.multiplyScalar(-1);	
		}
		
		this.mesh.position = this.pVec;
		
		return STATE.ALIVE;		
	}

}
