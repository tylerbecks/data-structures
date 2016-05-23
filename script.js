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