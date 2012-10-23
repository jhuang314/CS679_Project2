
var InterDistVect = null;//new THREE.Vector3();

/*

Algorithm from Real Time Rendering, 3rd Ed, Page 764

pos  	= THREE.Vector3
rad 	= float
boxMin 	= THREE.Vector3
boxMax 	= THREE.Vector3

*/
function SphereAABB_Intersect(pos, r, boxMin, boxMax){
	InterDistVect = new THREE.Vector3();
	
	var d = 0;
	// x
	var e = 0;
	var AxisSet = {"x":null, "y":null, "z":null}
	var i;
	for(i in AxisSet){
		if((e = pos[i] - boxMin[i]) < 0){
			if( e < -r){
				return false;
			}
			InterDistVect[i] = e;
			d += (e * e)
		
		} else if ((e = pos[i] - boxMax[i]) > 0){
			if( e > r){
				return false;
			}
			InterDistVect[i] = e;
			d += (e * e)
		}
	}
	
	return ! (d > (r * r) );

	

}
