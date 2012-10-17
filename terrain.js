// JavaScript Document


// some things to make accessing the elements of the mesh easier. They are 
// in this weird dictonart structure to avoid name collisions in the global
// namespace  
var NamespaceTerrain = {
	"yget":function(x,y){ 
		if(x >= 0 && y >= 0 && x < this.w && y < this.h){
			
			return this.v[y * this.w + x].y;
		} else {
			throw new RangeError("Terrain Index out of Range");
		}
	}, 
	
	"yset":function(x,y,set){
		if(x >= 0 && y >= 0 && x < this.w && y < this.h){
			
			this.v[y * this.w + x].y = set;
		} else {
			throw new RangeError("Terrain Index out of Range");
		}		
	},
	
	"setWorkingGeometry":function(geometry){
		this.g = geometry;
		this.w = geometry.terrainVars.w;
		this.h = geometry.terrainVars.h;
		this.v = geometry.vertices;	
	},
	
	"g":null, // working geometry
	"v":null, // working geometry verticies 
	"w":null, // working geometry w
	"h":null // working geometry h
	};

function skewTerrain(geometry){
	var NT = NamespaceTerrain;
	
	if("isTerrain" in geometry){
		var w = mesh.terrainVars.w;
		var h = mesh.terrainVars.h;
		
		//var tempArr = new Array(w * h);
		NT.setWorkingGeometry(geometry);
		
		var i = 0;
		var j = 0;
		
		
		var weight = 0; 
		var sum = 0; 
		
		
		// this here applys a blur filter to the y values in the heightmap	
		for(i = 0; i < w; i++){
			for(j = 0; j < h; j++){
				NT.yset(i,j, NT.yget(i,j) - i * .4 - j * .8);
			}
			
		}
	}
}

function smoothTerrain (geometry){
	var NT = NamespaceTerrain;
	
	if("isTerrain" in geometry){
	
		
		var w = geometry.terrainVars.w;
		var h = geometry.terrainVars.h;
		
		var tempArr = new Array(w * h);
		NT.setWorkingGeometry(geometry);
		
		var i = 0;
		var j = 0;
		
		var i2 = 0;
		var j2 = 0;
		
		var weight = 0; 
		var sum = 0; 
		
		
		// this here applys a blur filter to the y values in the heightmap	
		for(i = 0; i < w; i++){
			for(j = 0; j < h; j++){
				weight = 0; 
				sum = 0; 
				for(i2 = i-1; i2 < i+3; i2++){
					for(j2 = j-1; j2 < j+3; j2++){
						try{
							//debug ++;
							sum += NT.yget(i2,j2);
							weight ++; 
						} catch (e){}
					}
					
				}
				// store them in a temp array, or we get wierd stuff happening
				tempArr[j * w + i] = sum/weight;
				
			}
			
		}
		
		var k = 0;
		
		// copy from the temp array		
		for(k = 0; k < w * h; k++){
			NT.v[k].y = tempArr[k];
		}
		
			
	}
}

var terrainVars = function(w,h){
	this.w = w;
	this.height = h; 	
}

function getTerrainHeight(terrainMesh, x,z){
	if("isTerrain" in terrain.mesh){
	 	var w = terrain.terrainVars.w;
	 	var h = terrain.terrainVars.h;
	 	
	 	var xm = x - terrain.position.x
	 	
	}

}

// returns a geometry object
function generateTerrain(order, rows, cols){
	
	var aset = NamespaceTerrain.yset;
	var aget = NamespaceTerrain.yget;
	
	
	// The terrain is made up of an intger number of cells that 
	// each have size 2^order. The "+ 1" at the ends will mean somthing
	// when we have a more complex terrain generator.
	var w = Math.pow(2, order) * rows + 1;
	var h = Math.pow(2, order) * cols + 1;
		
	var gridGeometry = new THREE.Geometry();
	
	// modify the geometry object so that we know later if it is a terrain mesh.
	gridGeometry.isTerrain = true;
	gridGeometry.terrainVars = {"w":w, "h":h}; 


	// This is a very simple hacked together procidural terrian generator.
	// Hopefully we can improve the look later.
	var i = 0;
	var j = 0;
	for(i = 0; i < w; i++){
		for(j = 0; j < h; j++){
			var spike = 0;
			
			if(Math.random() < .02){
				spike = Math.random() * 300
			}
		
			gridGeometry.vertices.push( new THREE.Vector3( i / (w - 1), spike + Math.random() * 10 - 20, j/(h - 1) ));
		}
		
	}
	
	for(i = 0; i < w - 1; i++){
		for(j = 0; j < h - 1; j++){
			/*==================
			   i ->
			   +-----+
			j  |    /|
			|  |  /  |
			v  |/    |
			   +-----+
			================*/
			gridGeometry.faces.push( new THREE.Face3( j*w + i, j*w + i+1, (j+1)*w + i));
			gridGeometry.faces.push( new THREE.Face3((j+1)*w + i, j*w + i+1, (j+1)*w + i+1 ));
		}
	}
	
	
	
	smoothTerrain(gridGeometry);
	smoothTerrain(gridGeometry);
	smoothTerrain(gridGeometry);
	smoothTerrain(gridGeometry);
	smoothTerrain(gridGeometry);
	//skewTerrain(gridGeometry)
	//console.log(gridGeometry);
	//var ar = function(x,y,set){
	//	gridGeometry.vertices[x + y*h];
	//} 
	
	gridGeometry.computeFaceNormals();
	gridGeometry.computeVertexNormals();
	
	
	return gridGeometry;

}
