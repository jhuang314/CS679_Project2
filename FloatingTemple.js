// FloatingTemple.js



var FloatingTemple = function(x,y,z){
	
	var j = y;
	var r = 50;
	var ht = 5;
	
	
	
	var mtA = new THREE.MeshPhongMaterial({color: 0x444444, ambient: 0x444444, specular: 0x444444, emissive: 0x333333, shininess:0});
	var mtB = new THREE.MeshPhongMaterial({color: 0x003300, ambient: 0x003300, specular: 0x003333, emissive: 0x002200, shininess:0}); 
	
	var TempBox = new BoxTest(
			x, j - ht/2, z, 
			r , ht, r
		)
	
	
	
	TempBox.material = mtA
	TempBox.material2 =	mtB
	spawnElement( TempBox, ELEMENT.SCENERY);
	
	for (var i = 0; r > 10; i ++){
	    j -= ht/2
		r -= Math.random() * r/2;
		ht += Math.random() * ht ;
		    
		TempBox = new BoxTest(
				x, j - ht/2, z, 
				r , ht, r
			)
		TempBox.material = mtA
		TempBox.material2 =	mtB
		spawnElement( TempBox, ELEMENT.SCENERY);
	}
	
	j = y - 2.5;
	r = 20;
	ht = 5;
	
	
	for (var i = 0; i < 4; i ++){
	    j += ht/2
		r -= Math.random() * r/2;
		ht += Math.random() * ht * .5 ;
		
		for(var c = -1; c < 2; c += 2){
			for(var c2 = -1; c2 < 2; c2 += 2){
				TempBox = new BoxTest(
					x + 10 * c, j + ht/2, z +10 * c2, 
					r , ht, r
				);
				TempBox.material = mtA;
				TempBox.material2 =	mtB;
				spawnElement( TempBox, ELEMENT.SCENERY);
			
			}
		
		}	
	}
	r = 40;
	for (var i = 0; i < 4; i ++){
	    j += ht/2
		r -= Math.random() * r/2;
		ht += Math.random() * ht * .5;
		
		
		TempBox = new BoxTest(
			x, j + ht/2, z , 
			r , ht, r
		);
		TempBox.material = mtA
		TempBox.material2 =	mtB
		spawnElement( TempBox, ELEMENT.SCENERY);
			
			
		
			
	}
	
}

