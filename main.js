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
	container.appendChild( renderer.domElement );
	
	// Create a new Three.js scene
	scene = new THREE.Scene();
	
	// Put in a camera
	mainCamera = new THREE.PerspectiveCamera( VIEW_ANGLE, container.offsetWidth / container.offsetHeight, NEAR, FAR );
	mainCamera.position.set( 0, 2, 3 );
	mainCamera.eulerOrder = 'YXZ';  // set the order in which the rotations are aplied to the object
	// Create a directional light to show off the object
	var light = new THREE.DirectionalLight( 0xffffff, 1.5);
	light.position.set(0, 200, 200);
	scene.add( light );
	
	var light2 = new THREE.PointLight( 0xff0000, 10, 50 );
	light2.position.set(50, -5, 50); 
	scene.add( light2 );

	scene.fog =	new THREE.Fog( 0x00AAFF, 10, 200 )
	
	lightSphere = new THREE.Mesh( new THREE.SphereGeometry( 1 ), new THREE.MeshPhongMaterial({color: 0xff0000, ambient: 0xff0000, specular: 0xff0000, emissive: 0xff0000, shininess:0}));
	lightSphere.position.set(50, -5, 50);
	scene.add(lightSphere);
	 
	var terrainMesh = new THREE.Mesh( generateTerrain(4,5,5), new THREE.MeshPhongMaterial({color: 0x004400, ambient: 0x888888, specular: 0x111111, emissive: 0x003300, shininess:0}) );
	terrainMesh.position.y = -4;
	console.log(terrainMesh.material.opacity);
	//terrainMesh.position.y = 40;
	terrainMesh.scale.x = 100;
	terrainMesh.scale.z = 100;
	terrainMesh.material
	scene.add (terrainMesh);
	
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
    spawnObject(null, null);
	updateInput = addInput();

	run();
}

function run() {
	updateInput();
	renderer.render( scene, mainCamera );
	
	if(Player.mesh !== null){
		Player.mesh.rotation.y -= 0.01;
		
	}

	reqFrame(run); 
}