// GameElementManager


// var ELEMENT = {
//	: 0,
//	: 1,
//	: 2,
//	: 3,
//	: 4
//  }

var playerList = new List();
var enemyList = new List();
var p_bulletList = new List();
var e_bulletList = new List();
var sceneryList = new List();
var particleList = new List();


var spawnElement = function ( gameElement, type ){
	switch(type)
	{
	case ELEMENT.PLAYER:
		playerList.pushBack(gameElement);
		break;
	case ELEMENT.PLAYER_BULLET:
		p_bulletList.pushBack(gameElement);
		break;
	case ELEMENT.ENEMY_SHIP:
		enemyList.pushBack(gameElement);
		break;
	case ELEMENT.ENEMY_BULLET:
		e_bulletList.pushBack(gameElement);
		break;
	case ELEMENT.SCENERY:
		sceneryList.pushBack(gameElement);
		break;
	case ELEMENT.PARTICLE:
		particleList.pushBack(gameElement);
		break;
	}
				
};

var updateAllElements(timeElapsed){
	
}

