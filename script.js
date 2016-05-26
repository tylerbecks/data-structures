// Create the LinkedList Constructor
function LinkedList() {
	this._length = 0;
	this._head = null;
};

LinkedList.prototype = {

	add: function(data) {
		//create a new node, place data in
		var node = {
			data: data,
			next: null
		};

		//used to traverse the structure
		var current;

		//special case: no items in the list yet
		if(this._head === null) {
			this._head = node;
		} else {
			current = this._head;

			while(current.next) {
				current = current.next;
			}

			current.next = node;
		}

		//don't forget to update the count
		this._length++
	},


	item: function(index) {
		//check for out-of-bounds values
		if(index > -1 && index < this._length) {
			var current = this._head;
			var i = 0;

			while(i++ < index) {
				current = current.next;
			}

			return current.data;
		} else {
			return null;
		}
	},


	remove: function(index) {
		// Check for out-of-bounds values
		if(index > -1 && index < this._length) {

			var current = this._head;
			var previous;
			var i = 0;

			// Special case: removing first item
			if(index === 0) {
				this._head = current.next;
			} else {

				//find the right location
				while(i++ < index) {
					previous = current;
					current = current.next;
				}

				//skip over the item to remove
				previous.next = current.next;
			}

			// Decrement the length
			this._length--;

			//return the value
			return current.data;
		} else {
			return null;
		}
	},

	toArray: function() {
		var arr = [];
		var current = this._head;

		while(current.next) {
			arr.push(current.data);
			current = current.next;
		}

		arr.push(current.data);

		return arr;
	}

}


// Create the DoublyLinkedList Constructor
function DoublyLinkedList() {
	this._length = 0;
	this._head = null;
	this._tail = null;
};

DoublyLinkedList.prototype = {

	add: function(data) {

		var node = {
			data: data,
			next: null,
			prev: null
		};

		if(this._length === 0) {
			this._head = node;
			this._tail = node;
		} else {
			this._tail.next = node;
			node.prev = this._tail;
			this._tail = node;
		}

		//don't forget to update the count
		this._length++;
	},

	remove: function(index) {

		//check for out-of-bounds values
		if(index > -1 && index < this._length) {

			var current = this._head;
			var i = 0;

			//special case: removing the first item
			if(index === 0) {
				this._head = current.next;

                /*
                 * If there's only one item in the list and you remove it,
                 * then this._head will be null. In that case, you should
                 * also set this._tail to be null to effectively destroy
                 * the list. Otherwise, set the previous pointer on the
                 * new this._head to be null.
                 */

                 if(!this._head) {
                 	this._tail = null;
                 } else {
                 	this._head.prev = null;
                 }

			//special case: removing the last item
			}else if(index === this._length - 1) {
				current = this._tail;
				this._tail = current.prev;
				this._tail.next = null;
			}else {

				//find the right location
				while(i++ < index) {
					current = current.next;
				}

				//skip over the item to remove
				current.prev.next =  current.next;
				current.next.prev = current.prev;
			}
		} else {
			return null;
		}
	},

}

// Create the BinarySearchTree Constructor
function BinarySearchTree() {
	this._root = null;
};

BinarySearchTree.prototype = {

	// restore constructor
	constructor: BinarySearchTree,

	add: function(value) {
		var current = this._root;
		var node = {
			value: value,
			right: null,
			left: null
		};

		//special case: no items in tree yet
		if(this._root === null) {
			this._root = node;
		} else {

			while(true) {
				//if the value is greater than this node's value, go right
				 if(value > current.value) {
				 	//if there's no value there, this is our new node's home
				 	if(current.right === null) {
				 		current.right = node;
				 		break;
				 	}
				 	//otherwise, keep going
				 	current = current.right;
				 //if the value is less than this node's value, go left
				 } else if(value < current.value){
				 	//if there's no value there, this is our new node's home
				 	if(current.left === null) {
				 		current.left = node;
				 		break;
				 	}
				 	//otherwise, keep going
				 	current = current.left;
				 //if the new value is equal to the current one, just ignore
				 } else {
				 	console.log("Already exists in the tree.");
				 	break;
				 }
			}

		}
	},

	// Accepts a value as an argument and returns true if the value is present in the tree of false if not.
	contains: function(value) {
		var found = false;
		var current = this._root;

		//make sure there's a node to search
		while(!found && current.value){

			// if the value is less than the curret node's, go left
			if(value < current.value) {
				current = current.left;
			// or if the value is greated than the current node's, go right
			} else if(value > current.value) {
				current = current.right;
			// if the value is not greater nor less, it is equal! Found it!
			} else {
				found = true;
			}
		}

		return found;
	},

	traverse: function(process) {

		//helper function
		function inOrder(node) {
			if(node) {
				// traverse the left subtree
				if(node.left !== null) {
					inOrder(node.left);
				}

				process.call(this, node);

				//travers the right subtree
				if(node.right !== null) {
					inOrder(node.right);
				}
			}
		}

		//start with the root
		inOrder(this._root);
	},

	remove: function(value) {
		var found = false;
		var parent = null;
		var current = this._root;
		var childCount;
		var replacement;
		var replacementParent;

		//make sure there's a node to search
		while(!found && current) {

			//if the value is less than the current node's, go left
			if(value < current.value) {
				parent = current;
				current = current.left;

			//if the value is greater than the current node's, go right
			} else if(value > current.value) {
				parent = current;
				current = current.right;

			// values are equal.  found it!
			} else {
				found = true;
			}
		}

		//only proceed if the node was found
		if(found) {

			//figure out how many children
			childCound = (current.left !== null ? 1 : 0) + 
						 (current.right !== null ? 1: 0);

			//special case: the value is the root
			if(current === this._root){
				if(childCount === 0) {
					this._root = null;
				}
				if(childCount === 1) {
					this._root = (current.right === null ? current.left : current.right);
				}
				if(childCount === 2) {
					// start by going left
					replacement = this._root.left;
					// and then find the right-most leaf node to be the real new root
					while(replacement.right !== null) {
						replacementParent = replacement;
						replacement = replacement.right;
					}

					// if it's not the first node on the left
					if(replacementParent !== null) {
						// remove the new root from it's previous position 
						replacementParent.right = replacement.left;

						// give the new root all of the old root's children
						replacement.right = this._root.right;
						replacement.left = this._root.left;
					} else {
						// just assign the children
						replacement.right = this._root.right;
					}

					//ofiicially assign the new root
					this._root = replacement;
				}


			// non-root values
			} else {
				// if no children, just remove it from the parent
				if(childCount === 0) {
					// if the current value is less than its parent's, null out the left pointer
					if(current.value < parent.value) {
						parent.left = null;
					// if the current value is greater than the parent value, null out the right pointer
					} else {
						parent.right = null;
					}
				}
				if(childCount === 1) {
					// if the current value is less than its parent's, reset the left pointer
					if(current.value < parent.value) {
						parent.left = (current.left !== null ? current.left : current.right);
					// if the current value is greater than the parent value, null out the right pointer
					} else {
						parent.right = (current.left !== null ? current.left : current.right);
					}
				}
				if(childCount === 2) {
					// reset pointers for new traversal
					replacement = current.left;
					replacementParent = current;

					//find the right-most node
					while(replacement.right !== null) {
						replacementParent = replacement;
						replacement = replacement.right;
					}

					replacementParent.right = replacement.left;

					// assign children to the replacement
					replacement.left = current.left;
					replacement.right = current.right;

					//place the replacement in the right spot
					if(current.value < parent.value) {
						parent.left = replacement;
					} else {
						parent.right = replacement;
					}
				}
			}
		}
	},

	size: function(){
		var count = 0;

		this.traverse(function() {
			count++;
		});

		return count;
	},

	toArray: function(){
		var result = [];

		this.traverse(function(node) {
			result.push(node.value);
		});

		return result;
	},

	toString: function(){
		return this.toArray().toString();
	}

};