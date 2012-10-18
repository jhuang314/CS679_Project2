// GameElementManager

var playerList = new List();
var enemyList = new List();
var p_bulletList = new List();
var e_bulletList = new List();
var sceneryList = new List();
var particleList = new List();

var allLists = new Array();

// we need to make sure that items arn't being added to the list while we are 
// iterating over it, as it could lead to the item being lost.
var updatingLists = false;

var tempList = new List();


allLists[0] = p_bulletList;
allLists[1] = enemyList;
allLists[2] = sceneryList;	
allLists[3] = e_bulletList;	
allLists[4] = playerList;	
allLists[5] = particleList;	

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
	
	updatingLists = false;
	addTempsToLists();
	
}

