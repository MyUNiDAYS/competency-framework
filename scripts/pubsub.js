window.bus = (function () {
	'use strict';

	/*
	A function to represent a queue
	Created by Stephen Morley - http://code.stephenmorley.org/ - and released under the terms of the CC0 1.0 Universal legal code: http://creativecommons.org/publicdomain/zero/1.0/legalcode
	*/
	var Queue = function () {
		var queue = [];
		var offset = 0;
		var me = {};

		me.isEmpty = function () {
			return (queue.length === 0);
		};

		me.enqueue = function (item) {
			queue.push(item);
		};

		me.dequeue = function () {
			if (queue.length === 0)
				return undefined;

			var item = queue[offset];

			if (++offset * 2 >= queue.length) {
				queue = queue.slice(offset);
				offset = 0;
			}

			return item;
		};

		me.peek = function () {
			return (queue.length > 0 ? queue[offset] : undefined);
		};

		return me;
	};


	var me = {};
	var handlers = {};
	var queue = new Queue();
	var processing = false;

	function log(message, indent) {
		return;
		
		if (window.console) {
			var n = '';
			for (var i = 0; i < indent; i++)
				n += '  ';
			
			window.console.log(n + message);
		}
	}

	function processQueue() {
		while (!queue.isEmpty()) {
			var action = queue.dequeue();
			action.call(null);
		}
	}

	function enqueue(type, handler, args) {
		queue.enqueue(function () {
			log('Executing handler `' + type + '`');
			handler.apply(null, args);
		});
	}

	me.subscribe = function (type, func) {
		if (!handlers[type])
			handlers[type] = [];

		for (var i = 0; i < handlers[type].length; i++)
			if (handlers[type][i] === func)
				throw "Handler already subscribed to this message";

		handlers[type].push(func);

		return this;
	};

	me.subscribeOnce = function (type, func) {
		me.subscribe(type, func);
		me.subscribe(type, function () {
			me.unsubscribe(func);
		});
	};

	me.publish = function (type) {
		log('Publishing `' + type + '`');

		if (!handlers[type])
			return this;

		for (var i = 0; i < handlers[type].length; i++) {
			var args = [];
			for (var j = 1; j < arguments.length; j++) {
				args.push(arguments[j]);
			}

			enqueue(type, handlers[type][i], args);
		}

		if (!processing) {
			while (!queue.isEmpty()) {
				processing = true;
				processQueue();
			}
			processing = false;
		}

		return this;
	};

	me.unsubscribeAll = function (type) {
		if (type)
			delete handlers[type];
		else
			handlers = {};
	};

	me.unsubscribe = function (handler) {
		for (var type in handlers) {
			var handlerCount = handlers[type].length;
			for (var i = handlerCount - 1; i >= 0; i--) {
				if (handlers[type][i] === handler) {
					handlers[type].splice(i, 1);
					if (handlers[type].length === 0) {
						delete handlers[type];
						break;
					}
				}
			}
		}
	};

	return me;

})();
