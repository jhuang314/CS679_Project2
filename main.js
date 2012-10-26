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
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext('2d');
	
	var jsonLoader = new THREE.JSONLoader();
    initGameElementManager();     

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
	
	terrainMaterial = new THREE.MeshPhongMaterial({ map: map, emissive:0x00AA00,  shininess:0 }); //new THREE.MeshPhongMaterial({color: 0x004400, ambient: 0x888888, specular: 0x111111, emissive: 0x003300, shininess:0}) 
	
	
	terrainMesh = new THREE.Mesh( terrainGeometry, terrainMaterial);
	terrainMesh.receiveShadow = true;
	terrainMesh.scale.x = 1000;
	terrainMesh.scale.z = 1000;
	terrainMesh.position.x = -500;
	terrainMesh.position.z = -500;
	scene.add (terrainMesh);
	

	// Create a directional light to show off the object
	light = new THREE.DirectionalLight( 0xffffff, 1.5);
	light.position.set(-200, 200, 200);
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

	scene.fog =	new THREE.Fog( 0xFFFFD0, 100, 1000 )
	
	lightSphere = new THREE.Mesh( new THREE.SphereGeometry( 1 ), new THREE.MeshPhongMaterial({color: 0xff0000, ambient: 0xff0000, specular: 0xff0000, emissive: 0xff0000, shininess:0}));
	lightSphere.position = light2.position;
	scene.add(lightSphere);	
	
	
	stats = new Stats();
	stats.setMode( 0 );	// 0: fps, 1: ms
	document.body.appendChild( stats.domElement );
	
	bgElement = document.getElementById('bgSound');
	imageObj = new Image();
	imageObj.onload = function() {};
	imageObj.src = 'textures/control.png';
	
	var map2 = THREE.ImageUtils.loadTexture('textures/04muroch256.png', new THREE.UVMapping(), function() {renderer.render(scene);})
	cubeMaterial = new THREE.MeshPhongMaterial({map:map2, emissive: 0x333333, shininess:0});
	var cubeGeometry = new THREE.CubeGeometry(10,40,10);
//	var tempCube = new THREE.Mesh(cubeGeometry,cubeMaterial);	
	
//	tempCube.position.set(-10,10,-20);
	
//	scene.add (tempCube); 
	
	var RedShield1 = new RedShield (-300, 0, -300, 100);
	
	spawnElement(RedShield1, ELEMENT.SCENERY);
	
	spawnElement(new GreenShield (300, 0, -300, 100), ELEMENT.SCENERY);
	spawnElement(new SlidingBox(100, 25 + 5, 100, 15,10,15, false), ELEMENT.SCENERY)	
	
	spawnElement(new LandingPad (0, getTerrainHeight(terrainMesh, 0 ,300), 300), ELEMENT.SCENERY);
	spawnElement(new LandingPad (150, getTerrainHeight(terrainMesh, 150 ,-300), -300), ELEMENT.SCENERY);
	
	spawnElement(new  Coin (150, getTerrainHeight(terrainMesh, 150 ,-300) + 30, -300), ELEMENT.SCENERY);
	
	//spawnElement(new Balloon(-300,100,300, 20, 30,10,15, 50), ELEMENT.SCENERY)
	
	 
	for( var i = 0; i < 100; i += 2){
		var randX = Math.random() * 1000 - 500;
		var randZ = Math.random() * 1000 - 500;
		var randR = Math.random() * 5 + Math.random() * 5 + 0.5;
		
		var tH = getTerrainHeight(terrainMesh, randX ,randZ);
		
		var randY = tH + randR + Math.random() * 10 + Math.random() * 10 + 1;
		
		spawnElement(new BallTest(randR, randX, randY , randZ), ELEMENT.SCENERY );
	}
	
	for( var i = 0; i < 50; i += 1){
		var randX = Math.random() * 1000 - 500;
		var randZ = Math.random() * 1000 - 500;
		
		
		var tH = getTerrainHeight(terrainMesh, randX ,randZ);
		
		var randY = tH + randR + Math.random() * 10 + Math.random() * 10 + 1;
		
		spawnElement(new Coin (randX, getTerrainHeight(terrainMesh, randX ,randZ) + 7, randZ), ELEMENT.SCENERY );
	}
	
	spawnElement(new BoxTest(100, 0, 100, 100,50,70), ELEMENT.SCENERY);
	
	spawnElement(new SwitchObj(100, 27, 100, function(state){
		if(state){
			RedShield1.activate();
		} else {
		    RedShield1.deactivate();
		}
	}), ELEMENT.SCENERY);
	
	var stairWidth = 2;
	for( var i = 0; i < 100; i += 2){
	  	spawnElement(new BoxTest(100, 25 - i/4 - .5, 135 + stairWidth/2 * i +stairWidth/2, 10 , 1, stairWidth), ELEMENT.SCENERY);
	    
		//spawnElement(new BoxTest(112, 25 - i/4 - .5, 135 + 4 * i + 4, 10 , 1, 8), ELEMENT.SCENERY);
	}

	FloatingTemple(Math.random() * 1000 - 500, Math.random() * 100 + 100 ,Math.random() * 1000 - 500 )

	var skyCube	= THREE.ImageUtils.loadTextureCube([
				'textures/cube/skybox/px.jpg','textures/cube/skybox/nx.jpg',
				'textures/cube/skybox/py.jpg','textures/cube/skybox/ny.jpg',
				'textures/cube/skybox/pz.jpg','textures/cube/skybox/nz.jpg'
			]);
	

	var shader = THREE.ShaderUtils.lib["cube"];
	shader.uniforms["tCube"].value = skyCube;
	
	var skyMaterial = new THREE.ShaderMaterial({
			fragmentShader	: shader.fragmentShader,
				vertexShader	: shader.vertexShader,
				uniforms	: shader.uniforms,
				depthWrite	: false,
				side		: THREE.BackSide
		});

	var skyGeometry	= new THREE.CubeGeometry( 8000, 8000, 8000 );
		var skyMesh	= new THREE.Mesh(skyGeometry, skyMaterial );
	scene.add(skyMesh);


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
	//startT = Date.now();
	
	clock = new THREE.Clock();
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
var stats;
	
function run() {
	elapsedT = Date.now() - startT;
	startT = Date.now();
	stats.begin();
	
	/* We have to slow down the Physics or we get results that are
	too far outside acceptable bounds. Admitedly we could be doing 
	physics better, but we are where we are. 
	
	if(elapsedT > 50){
		elapsedT == 50; // well, I see why that was not working *facepalm*
		
	}// Seems to run OK without this, so removing it for now*/
	playControl();
	if (gState == GAMESTATE.MENU){
		drawMainMenu();
	}
	else if(gState == GAMESTATE.PLAYING){
		drawStatusBar();
	}
	else if(gState == GAMESTATE.END) {
		drawEnding();
	}

	updateAllElements(elapsedT);
	updateInput();
	renderer.render( scene, mainCamera );

	stats.end();	
	reqFrame(run); 
}
