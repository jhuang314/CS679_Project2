// JavaScript Document


// returns a geometry object
function generateTerrain(order, rows, cols){
	
	var w = Math.pow(2, order) * rows - 1;
	var h = Math.pow(2, order) * cols - 1;
		
	var gridMesh = new THREE.Geometry();
	
	var i = 0;
	var j = 0;
	for(i = 0; i < w; i++){
		for(j = 0; j < h; j++){
			gridMesh.vertices.push( new THREE.Vector3( i / w, -Math.random() * .5, j/h ));
		}
		
	}
	
	for(i = 0; i < w - 1; i++){
		for(j = 0; j < h - 1; j++){
			gridMesh.faces.push( new THREE.Face3( j*w + i, j*w + i+1, (j+1)*w + i));
			gridMesh.faces.push( new THREE.Face3((j+1)*w + i, j*w + i+1, (j+1)*w + i+1 ));
		}
	}
	
	//console.log(gridMesh);
	//var ar = function(x,y,set){
	//	gridMesh.vertices[x + y*h];
	//} 
	
	gridMesh.computeFaceNormals();
	
	return gridMesh;

}