
var InterDistVect = null;// should have named this "responseVector"
var responseInside = false;


/*
pos1 - THREE.Vector3
r1   - float
pos2 - THREE.Vector3
r2   - float

The response vector is for sphere 2 
*/
function Sphere_Sphere(pos1, r1, pos2, r2){
	var res = new THREE.Vector3( pos2.x - pos1.x,  pos2.y - pos1.y,  pos2.z - pos1.z);
	responseInside = false;
	var dd = res.x * res.x + res.y * res.y + res.z * res.z;
	var rad2 = (r1 + r2) * (r1 + r2);
	var rad3 = (r1 - r2) * (r1 - r2) 
	if(dd < rad2){
		var res2 = res.clone().normalize();
		res2.multiplyScalar(r1);
		
		if(dd < rad3){
			responseInside =  true;
			InterDistVect = res2.subSelf(res);
			return true;
		}
	
		
		
		InterDistVect = res.subSelf(res2);
		return true;	
	}
	
	return false; 

}


/*

Algorithm from Real Time Rendering, 3rd Ed, Page 764

pos  	= THREE.Vector3
rad 	= float
boxMin 	= THREE.Vector3
boxMax 	= THREE.Vector3

*/
function SphereAABB_Intersect(pos, r, boxMin, boxMax){
	InterDistVect = new THREE.Vector3(0,0,0);
	//var closestEdge = new THREE.Vector3(0,0,0);
	var d = 0;
	// x
	var e = 0;
	var inside = true;
	var AxisSet = {"x":null, "y":null, "z":null}
	var i;
	for(i in AxisSet){
		if((e = pos[i] - boxMin[i]) < 0){
			if( e < -r){
				return false;
			}
			inside = false;
			InterDistVect[i] = e;
			d += (e * e)
		
		} else if ((e = pos[i] - boxMax[i]) > 0){
			if( e > r){
				return false;
			}
			inside = false;
			InterDistVect[i] = e;
			d += (e * e)
		} else { // we know it collides, just figure out the direction of the response vector:
		
		
			var e2 = (pos[i] - boxMin[i]);
			// at this point the e vectors are along the line of action of the
			// response vector, but point in the wrong direction. 
			AxisSet[i] = (e2 < -e) ? -e2: -e;
		}
	}
	if(inside){
		var minDist = Math.abs(AxisSet["x"]);
		var axis = "x"
		for (i in AxisSet){
			if(Math.abs(AxisSet[i]) < minDist){
				minDist = Math.abs(AxisSet[i]);
				axis = i;	
			}
							
		}
		
		InterDistVect[axis] = AxisSet[axis];
		
	}
	responseInside = inside;
	
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