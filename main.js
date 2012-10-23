// JavaScript Document
// MAIN

function onLoad(){

	// get the animation frame
	reqFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */callback, /* DOMElement Element */element) {
            window.setTimeout(callback, 1000 / 60);
        };
	
	// container is in globals.js
	container = document.getElementById("container");

	var jsonLoader = new THREE.JSONLoader();
        

	// Create the Three.js renderer, add it to our div
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	renderer.setClearColorHex(0x0088ff, 1);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	
	container.appendChild( renderer.domElement );
	
	// Create a new Three.js scene
	scene = new THREE.Scene();
	
	// Put in a camera
	mainCamera = new THREE.PerspectiveCamera( VIEW_ANGLE, container.offsetWidth / container.offsetHeight, NEAR, FAR );
	mainCamera.position.set( 0, 2, 3 );
	mainCamera.eulerOrder = 'YXZ';  // set the order in which the rotations are aplied to the object
	
	terrainGeometry = generateTerrain(2,40,40);
	
	var map = THREE.ImageUtils.loadTexture('textures/grass2.png', new THREE.UVMapping(), function() {renderer.render(scene);})
	
	terrainMaterial = new THREE.MeshPhongMaterial({ map: map,  shininess:0 }); //new THREE.MeshPhongMaterial({color: 0x004400, ambient: 0x888888, specular: 0x111111, emissive: 0x003300, shininess:0}) 
	
	
	terrainMesh = new THREE.Mesh( terrainGeometry, terrainMaterial);
	terrainMesh.receiveShadow = true;
	terrainMesh.scale.x = 1000;
	terrainMesh.scale.z = 1000;
	terrainMesh.position.x = -500;
	terrainMesh.position.z = -500;
	scene.add (terrainMesh);
	
	// Create a directional light to show off the object
	light = new THREE.DirectionalLight( 0xffffff, 1.5);
	light.position.set(0, 200, 200);
	light.castShadow = true;
	light.shadowDarkness = 0.5;
	light.shadowCameraRight = 100 ;
	light.shadowCameraLeft = -100 ;
	light.shadowCameraTop = 100 ;
	light.shadowCameraBottom = -100 ; 
	
	//light.shadowCameraVisible = true;
	scene.add( light );
	
	var light2 = new THREE.PointLight( 0xff0000, 10, 50 );
	light2.position.set(50, getTerrainHeight(terrainMesh, 50,50) + 10, 50); 
	scene.add( light2 );

	scene.fog =	new THREE.Fog( 0x00AAFF, 100, 1000 )
	
	lightSphere = new THREE.Mesh( new THREE.SphereGeometry( 1 ), new THREE.MeshPhongMaterial({color: 0xff0000, ambient: 0xff0000, specular: 0xff0000, emissive: 0xff0000, shininess:0}));
	lightSphere.position = light2.position;
	scene.add(lightSphere);	
	
	sound1 = new Sound( ['sound/techno.ogg','sound/techno.mp3'], 50, 1 );
	sound1.position.copy( lightSphere.position );
	sound1.play();
	 /*
	cubeGeometry = new THREE.CubeGeometry(0.5,0.5,0.5);
	cubeMaterial = new THREE.MeshPhongMaterial({color: 0x000088, ambient: 0x000088, specular: 0x008888, emissive: 0x000044, shininess:3});
	cubeMaterial2 = new THREE.MeshPhongMaterial({color: 0x008800, ambient: 0x008800, specular: 0x008888, emissive: 0x004400, shininess:3});
	cubeMaterial3 = new THREE.MeshPhongMaterial({color: 0x880000, ambient: 0x880000, specular: 0x008888, emissive: 0x440000, shininess:3});
	
	
		for( var j = 0; j < 100; j += 2){
			tempCube = new THREE.Mesh(cubeGeometry,cubeMaterial);
			var jitterX = 0; //Math.random() * 10 - 5;
			var jitterY = 0; //Math.random() * 10 - 5;
			try{
			    tempCube.position.set(i + jitterX, getTerrainHeight(terrainMesh, i + jitterX, j + jitterY), j + jitterY);
			    if(debug12 === 1){
				     tempCube.material = cubeMaterial2;
				} 
			}catch (e){
				tempCube.position.set(i + jitterX, 0, j + jitterY);
				tempCube.material = cubeMaterial3;
			}
			scene.add (tempCube);
			
		}
	}
	var w12 = terrainMesh.geometry.terrainVars.w
	var h12 = terrainMesh.geometry.terrainVars.h
	console.log(terrainMesh.geometry.vertices[0 + (h12 - 1) * w12])
	*/
	for( var i = 0; i < 100; i += 2){
		var randX = Math.random() * 1000 - 500;
		var randZ = Math.random() * 1000 - 500;
		var randR = Math.random() * 5 + Math.random() * 5 + 0.5;
		
		var tH = getTerrainHeight(terrainMesh, randX ,randZ);
		
		var randY = tH + randR + Math.random() * 10 + Math.random() * 10 + 1;
		
		spawnElement(new BallTest(randR, randX, randY , randZ), ELEMENT.PARTICLE );
	}
	
	spawnElement(new BoxTest(100, 100 , 100, 100,50,70), ELEMENT.PARTICLE);
	
	//spawnElement(new BallTest(0.7,25,getTerrainHeight(terrainMesh, 50,50) + 6,50), ELEMENT.PARTICLE );
	//spawnElement(new BallTest(0.2,50,getTerrainHeight(terrainMesh, 50,50) + 7,25), ELEMENT.PARTICLE );
//	spawnElement(new BallTest(1.5,75,getTerrainHeight(terrainMesh, 50,50) + 3,50), ELEMENT.PARTICLE );
//	spawnElement(new BallTest(1.0,50,getTerrainHeight(terrainMesh, 50,50) + 8,75), ELEMENT.PARTICLE );
	
	/* 
	for some reason, you need:
		 function(geo){Player.load(geo);}
	rather than
		 Player.load
		 
	calling Player.load dirrectly from this function will correctly add the mesh
	to the scene, but will not update the Player object. I suspect that this is
	because of the fact the loader uses a seperate thread to load the object,
	I still have not figured out how javascript threading works. 
	*/
	jsonLoader.load( "./meshes/fighter_obj.js", function(geo){Player.load(geo);} );
    
	updateInput = addInput();
	startT = Date.now();
	run();
}

var Sound = function ( sources, radius, volume ) {
	var audio = document.createElement( 'audio' );

	for ( var i = 0; i < sources.length; i ++ ) {
		var source = document.createElement( 'source' );
		source.src = sources[ i ];
		audio.appendChild( source );
	}

	this.position = new THREE.Vector3();

	this.play = function () {
		audio.play();
	}
	this.update = function ( camera ) {
		var distance = this.position.distanceTo( camera.position );
		if ( distance <= radius ) {
			audio.volume = volume * ( 1 - distance / radius );

		} else {
			audio.volume = 0;
		}
	}
}		

var startT = 0;
var elapsedT = 10;

function run() {
	elapsedT = Date.now() - startT;
	startT = Date.now();
	
	
	/* We have to slow down the Physics or we get results that are
	too far outside acceptable bounds. Admitedly we could be doing 
	physics better, but we are where we are. */
	
	if(elapsedT > 50){
		elapsedT == 50;
	}
	
	sound1.update(mainCamera);
	
	updateAllElements(elapsedT);
	updateInput();
	renderer.render( scene, mainCamera );
	
	reqFrame(run); 
}