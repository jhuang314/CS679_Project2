
var InterDistVect = null;//new THREE.Vector3();

/*

Algorithm from Real Time Rendering, 3rd Ed, Page 764

pos  	= THREE.Vector3
r	 	= float
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
/*
Collides a sphere with an axis aligned torus. sets the InterDistVect

pos  	= THREE.Vector3
r	 	= float
tCent 	= THREE.Vector3 - Torus center
t_r		= float  - radus from the center to the ring
t_r2 	= float  - radius of the torus ring 
axis    = element of {"x", "y", "z" } axis  pointing through the ring  

*/
function SphereAATorus_Intersect(pos, r, boxMin, boxMax){
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