// Input Stuff Yay

function addInput(){
	var mouseDown = false;
    var dragging = false;
    var dragOrigX = 0;
    var dragOrigY = 0;
    var dragPixX = 0;
    var dragPixY = 0;
    var preDragCamRotX = 0;
    var preDragCamRotY = 0;

    container.addEventListener("mousedown", function (e) {
        if (e.button === 0) {
            dragging = true;
            dragOrigX = e.pageX - container.offsetLeft;
            dragOrigY = e.pageY - container.offsetTop;

            preDragCamRotX = camXrot;//mainCamera.rotation.x;
           	preDragCamRotY = camYrot;//mainCamera.rotation.y;
			
        }

    }, false);

	container.addEventListener("mouseup", function (e) {
        if (e.button === 0) {
            dragging = false;
        }

    }, false);

	container.addEventListener("mousemove", function (e) {
        if (dragging) {
            dragPixX = (e.pageX - container.offsetLeft) - dragOrigX;
            dragPixY = (e.pageY - container.offsetTop) - dragOrigY;

            camXrot = preDragCamRotX + dragPixY * .005;
            camYrot = preDragCamRotY + dragPixX * .005;
        }
        //mousex = (e.pageX - theCanvas.offsetLeft) - originX;
        //mousey = (e.pageY - theCanvas.offsetTop) - originY;

    }, false);

	var keysDown = {}; //holds all keys currently pressed
    window.addEventListener("keydown", function (e) {
        //if (!(e.keyCode in keysDown)) {
        //    firstKeyHit(e.keyCode);
        //}
        keysDown[e.keyCode] = true;

    }, false);
    
    window.addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
    
    
    // called once per fram
    function update(){
    	//console.log(camXrot + ", "+ camYrot)
    	
    	if(camXrot > Math.PI / 2){
			camXrot = Math.PI/ 2;		                    
		} else if (camXrot < -Math.PI / 2){
			camXrot = -Math.PI/ 2;
		}
    	
    	mainCamera.rotation.y = camYrot;
		mainCamera.rotation.x = camXrot;
    	
    
		if ( 87 in keysDown) {	//Up
             mainCamera.position.z -= Math.cos(mainCamera.rotation.y) * 0.1;
             mainCamera.position.x -= Math.sin(mainCamera.rotation.y ) * 0.1;
        }
        if ( 83 in keysDown) {	//Down
             mainCamera.position.z += Math.cos(mainCamera.rotation.y) * 0.1;
             mainCamera.position.x += Math.sin(mainCamera.rotation.y) * 0.1;
        }
        if ( 65 in keysDown) {	//Left
            mainCamera.position.z += Math.sin(mainCamera.rotation.y) * 0.1;
            mainCamera.position.x -= Math.cos(mainCamera.rotation.y) * 0.1;
        }
        if ( 68 in keysDown) {	//Right
            mainCamera.position.z -= Math.sin(mainCamera.rotation.y) * 0.1;
            mainCamera.position.x += Math.cos(mainCamera.rotation.y) * 0.1;
        }
	    mainCamera.updateMatrix();
	}
    
    
    return update;
}
