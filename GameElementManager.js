// GameElementManager

var playerList = null;
var enemyList = null;
var p_bulletList = null;
var e_bulletList = null;
var sceneryList = null;
var particleList = null;

var allLists = new Array();

// we need to make sure that items arn't being added to the list while we are 
// iterating over it, as it could lead to the item being lost.
var updatingLists = false;

var tempList = null;


allLists[0] = p_bulletList;
allLists[1] = enemyList;
allLists[2] = sceneryList; // scenery should be non-moving, 	
allLists[3] = e_bulletList; 	
allLists[4] = playerList;	
allLists[5] = particleList; 	

var collisionMap = null;// new List();

var initGameElementManager = function(){
	playerList = new List();
	enemyList = new List();
	p_bulletList = new List();
	e_bulletList = new List();
	sceneryList = new List();
	particleList = new List();
	
	tempList = new List();
	
	collisionMap = new List();
	
	// in collision maps, the first element is treated as non-moving.
	 
	// enemies, bullets and scenery collide with player
	collisionMap.pushFront({a:4,b:3});
	collisionMap.pushFront({a:4,b:1});
	collisionMap.pushFront({a:2,b:4});
	
	// player bullets and scenery collide with enemies
	collisionMap.pushFront({a:1,b:0});
	collisionMap.pushFront({a:2,b:1});
	
	// bullets collide with scenery
	collisionMap.pushFront({a:2,b:0});
	collisionMap.pushFront({a:2,b:3});
	
	// particles collide with scenery
	collisionMap.pushFront({a:2,b:4});
	
}

var spawnElement = function ( gameElement, type ){
	if(updatingLists){
		tempList.pushBack({"type":type, "e":gameElement});
	} else {
		allLists[type].pushBack(gameElement);
	}

			
};

var addTempsToLists = function(){
	while(tempList.size > 0){
		var tempRecord = tempList.popFront();
		allLists[tempRecord.type].pushBack(tempRecord.e);
	}
}

var updateAllElements = function (timeElapsed){
	updatingLists = true;
	for(list in allLists){
		
		var iter = allLists[list].__iterator__();
		
		var curr = null;
		while(iter.hasNext()){
			
		    curr = iter.next();
		    
		    if(curr.update(timeElapsed) === STATE.DEAD){
				iter.removeCurrent();
			}
			
		}
		
	}
	
	for(cMap in collisionMap){
		var list_b = updatingLists[cMap.b];
		var list_a = updatingLists[cMap.a];
		// stationary object
		for(stat_obj in list_a){
			for(mov_obj in list_b){
				var responseVec = stat_obj.collideSphere(mov_obj.position, mov_obj.radius);
				if(responseVec !== null){
					mov_obj.collisionResponse(responseVec);	
				}
			}
		
		}
	}
	
	updatingLists = false;
	addTempsToLists();
	
}

