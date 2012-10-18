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


    window.addEventListener("keydown", function (e) {
        //if (!(e.keyCode in keysDown)) {
        //    firstKeyHit(e.keyCode);
        //}
        keysDown[e.keyCode] = true;

    }, false);
    
    window.addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
    
    
    // called once per fram
    function update(){
    	
	}
    
    
    return update;
}
