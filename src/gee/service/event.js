'use strict';

module.exports = class DefaultEventService {

	constructor() {
		this.events = {};
	}

	subscribe(event, callback) {
		const token = this.generateToken();
		this.events[event] = this.events[event] || [];
		this.events[event].push({ token, callback });

		return token;
	}

	unsubscribe(token) {
		for (const event in this.events) {
			if (this.events[event]) {
				for (let i = this.events[event].length - 1; i >= 0; i--) {
					if (this.events[event].token === token) {
						this.events[event].splice(i, 1);
					}
				}
			}
		}
	}

	publish(event, data = {}) {
		(this.events[event] || []).forEach((subscriber) => {
			subscriber.callback(data);
		});
	}

	generateToken() {
		return Math.random().toString(32).substr(2);
	}

};
