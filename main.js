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
	container.appendChild( renderer.domElement );
	
	// Create a new Three.js scene
	scene = new THREE.Scene();
	
	// Put in a camera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, container.offsetWidth / container.offsetHeight, NEAR, FAR );
	camera.position.set( 0, 0, 3 );
	
	// Create a directional light to show off the object
	var light = new THREE.DirectionalLight( 0xffffff, 1.5);
	light.position.set(0, 0, 1);
	scene.add( light );
	
	
	jsonLoader.load( "./meshes/fighter_obj.js", function( geometry ) { addToScene( geometry ) } );


	function addToScene( geometry ) {
		console.log("addToScene()");
		
        playerMesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		
		
		playerMesh.rotation.x = Math.PI / 5;
		playerMesh.rotation.y = Math.PI / 5;
		playerMesh.scale.x = 0.5;
		playerMesh.scale.y = 0.5;
		playerMesh.scale.z = 0.5;
		
		//playerMesh.position.x = 0.5;
		//playerMesh.position.y = 0.5;
		playerMesh.position.z = -4;
		scene.add(playerMesh);
    }
	run();
}

function run() {

	renderer.render( scene, camera );
	
	if(playerMesh !== null){
		playerMesh.rotation.y -= 0.01;	
	}

	reqFrame(run); 
}