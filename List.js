//======================================== 
// List.js
// Ben Reddersen
// reddersen@wisc.edu
// Version: v1.1
//========================================


/*===========================================
  _     _     _   _   _           _      
 | |   (_)___| |_| \ | | ___   __| | ___ 
 | |   | / __| __|  \| |/ _ \ / _` |/ _ \
 | |___| \__ \ |_| |\  | (_) | (_| |  __/
 |_____|_|___/\__|_| \_|\___/ \__,_|\___|
                                         
===========================================*/

function ListNode(data, prev, next){
	this.data = data;
	this.prev = prev;
	this.next = next;
}

/*======================================================
  _     _     _   ___ _                 _             
 | |   (_)___| |_|_ _| |_ ___ _ __ __ _| |_ ___  _ __ 
 | |   | / __| __|| || __/ _ \ '__/ _` | __/ _ \| '__|
 | |___| \__ \ |_ | || ||  __/ | | (_| | || (_) | |   
 |_____|_|___/\__|___|\__\___|_|  \__,_|\__\___/|_|   
                                                      
======================================================*/

function ListIterator(_List){
	this.currentNode = _List.head;
	this._List = _List;
	
	this.nodeDeleted = false;
	
	this.hasNext = function(){
	    
		return (this.currentNode.next !== this._List.tail);
	};
	
	this.removeCurrent = function(){
		if(this.nodeDeleted){
			throw new UserException("Can't delete the same node twice!");
		}
		this._List.deleteNode(this.currentNode);
		this.nodeDeleted = true;
	};
	
	this.addAfterCurrent = function(data){
		if(this.nodeDeleted){
			throw new UserException("can't add after a deleted element!");
		}
		this._List.addAfterNode(this.currentNode,data);				
	}
	
	this.addBeforeCurrent = function(data){
		if(this.nodeDeleted){
			throw new UserException("can't add before a deleted element!");
		}
		this._List.addBeforeNode(this.currentNode,data);	
	}
	
	this.next = function(){
		if(this.currentNode.next === this._List.tail){
			throw StopIteration;
		} else{
			this.currentNode = this.currentNode.next;
			this.nodeDeleted = false;
			return this.currentNode.data;
		}
	}
	
}


/*==========================
  _     _     _   
 | |   (_)___| |_ 
 | |   | / __| __|
 | |___| \__ \ |_ 
 |_____|_|___/\__|
                  
===========================*/

function List(){
	this.head = new ListNode(null, null, null);
	this.tail = new ListNode(null, this.head, null);
	this.size = 0;
	
	this.head.next = this.tail;
	
	this.pushBack = function(data){
		this.size += 1;
		var newNode = new ListNode(data, this.tail.prev, this.tail);
		this.tail.prev.next = newNode;
		this.tail.prev = newNode;		    
	} ;
	
	this.addAfterNode = function(node, data){
		if(node === this.tail){
			throw new RangeError("Can't add new node after tail marker!");
		}
		
		
		
		this.size += 1;
		var newNode = new ListNode(data, node, node.next);
		node.next.prev = newNode;
		node.next = newNode;
			
	};
	
	this.addBeforeNode = function(node, data){
		if(node === this.head){
			throw new RangeError("Can't add new node before head marker!");
		}
		
		this.size += 1;
		var newNode = new ListNode(data, node.prev, node);
		node.prev.next = newNode;
		node.prev = newNode;
			
	}
	
	this.pushFront = function(data){
		this.size += 1;
		var newNode = new ListNode(data, this.head, this.head.next);
		this.head.next.prev = newNode;
		this.head.next = newNode;		    
	}
	
	this.popFront = function(){
	    this.size -= 1;
		var retNode = this.head.next;
	    if (retNode === this.tail){
			return null;
		}
		
		retNode.prev.next = retNode.next;
		retNode.next.prev = retNode.prev;
		
		return retNode.data;
	}
	
	this.deleteNode = function(node){
	
		this.size -= 1;
	    
		if((node !== this.head) && (node !== this.tail)){
			
			node.prev.next = node.next;
			node.next.prev = node.prev;
			
			return node.next;
		} else {
			throw new RangeError("Can't delete marker nodes!");
		}
	}
	
	this.printList = function(){
		var cNode = this.head;
		do{
		   console.log(cNode.data);
		   cNode = cNode.next;
		} while(cNode != this.tail);
	}
	
	this.printListBackwards = function(){
		var cNode = this.tail;
		do{
		   console.log(cNode.data);
		   cNode = cNode.prev;
		} while(cNode != this.head);
	}
		
}

List.prototype.__iterator__ = function(){
  return new ListIterator(this);
};