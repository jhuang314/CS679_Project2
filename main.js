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
	
	var light2 = new THREE.AmbientLight( 0x555555 ); 
	scene.add( light2 );

	scene.fog =	new THREE.Fog( 0x00AAFF, 10, 200 )
	
	
	
	var terrainMesh = new THREE.Mesh( generateTerrain(4,5,5), new THREE.MeshPhongMaterial({color: 0x004400, ambient: 0x888888, specular: 0x111111, emissive: 0x003300, shininess:0}) );
	terrainMesh.position.y = -4;
	console.log(terrainMesh.material.opacity);
	//terrainMesh.position.y = 40;
	terrainMesh.scale.x = 100;
	terrainMesh.scale.z = 100;
	terrainMesh.material
	scene.add (terrainMesh);
	
	
	jsonLoader.load( "./meshes/fighter_obj.js", function( geometry ) { addToScene( geometry ) } );

	updateInput = addInput();

	function addToScene( geometry ) {
		console.log("addToScene()");
		
        playerMesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		
		
		//playerMesh.rotation.x = Math.PI / 5;
		//playerMesh.rotation.y = Math.PI / 5;
		playerMesh.scale.x = 0.7;
		playerMesh.scale.y = 0.7;
		playerMesh.scale.z = 0.7;
		
		//playerMesh.position.x = 0.5;
		//playerMesh.position.y = 0.5;
		playerMesh.position.z = -4;
		scene.add(playerMesh);
    }
	run();
}

function run() {
	updateInput();
	renderer.render( scene, mainCamera );
	
	if(playerMesh !== null){
		playerMesh.rotation.y -= 0.01;	
	}

	reqFrame(run); 
}