// Input Stuff Yay

function addInput(){
	var mouseDown = false;
    
    var dragOrigX = 0;
    var dragOrigY = 0;
    
    var preDragCamRotX = 0;
    var preDragCamRotY = 0;

    container.addEventListener("mousedown", function (e) {
        if (e.button === 0) {
            dragging = true;
            dragOrigX = e.pageX - container.offsetLeft;
            dragOrigY = e.pageY - container.offsetTop;

			dragPixX = 0;
            dragPixY = 0;
            
            frameDragPixX = 0;
            frameDragPixY = 0;

            //preDragCamRotX = camXrot;//mainCamera.rotation.x;
           	//preDragCamRotY = camYrot;//mainCamera.rotation.y;
			
        }

    }, false);

	container.addEventListener("mouseup", function (e) {
        if (e.button === 0) {
            dragging = false;
        }

    }, false);

	container.addEventListener("mousemove", function (e) {
        if (dragging) {
        	frameDragPixX =  ((e.pageX - container.offsetLeft) - dragOrigX) - dragPixX;
            frameDragPixY =  ((e.pageY - container.offsetLeft) - dragOrigY) - dragPixY;
            
            dragPixX = (e.pageX - container.offsetLeft) - dragOrigX;
            dragPixY = (e.pageY - container.offsetTop) - dragOrigY;

            
        }
        //mousex = (e.pageX - theCanvas.offsetLeft) - originX;
        //mousey = (e.pageY - theCanvas.offsetTop) - originY;

    }, false);



    window.addEventListener("keydown", function (e) {
        
        //console.log(e.keyCode);
        if(!( e.keyCode in keysDown)){
			keysDown[e.keyCode] = true;
		}
        

    }, false);
    
    window.addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
    
    
    // called once per frame
    function update(){
    	
    	for(keyKey in keysDown){
			keysDown[keyKey] = false;
		}
		
	}
    
    
    return update;
}
