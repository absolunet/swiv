"use strict";

module.exports = class GoogleEnhancedEcommerceService {

	constructor(eventService, mapperService, configs) {
		this.eventService = eventService;
		this.mapperService = mapperService;
		this.configs = configs;

		configs.events.forEach((event) => {
			this.registerEvent(this.getCleanEventName(event));
		});
	}

	registerEvent(event) {
		this.eventService.subscribe(this.getEventName(event), (data) => {
			window[this.configs.get('dataLayer', 'dataLayer')].push(data);
		});

		this[`trigger${this.getCleanEventName(this.getEventModelClass(event), true)}`] = (data) => {
			return this.trigger(event, data);
		};

		return this;
	}

	trigger(event, data = {}) {
		const mappedData = this.mapperService.map(data, this.getEventModel(event));

		if (mappedData && Object.keys(mappedData).length > 0) {
			this.eventService.publish(this.getEventName(event), mappedData);
		}

		return this;
	}

	getEventName(event, withPrefix = true) {
		const prefix = withPrefix ? this.configs.get('eventPrefix', '') : '';

		return `${prefix}${event}`;
	}

	getEventModel(event) {
		const EventModel = this.getEventModelClass(event);

		return new EventModel();
	}

	getEventModelClass(event) {
		const eventCollection = this.configs.get('events', []);

		for (let i = eventCollection.length - 1; i >= 0; i--) {
			if (this.getCleanEventName(eventCollection[i]) === event) {
				return eventCollection[i];
			}
		}

		for (let j = 0; j < eventCollection.length; j++) {
			if (/^[dD]efault/.test(eventCollection[j].name)) {
				return eventCollection[j];
			}
		}

		return eventCollection[0];
	}

	getCleanEventName(event, toPascalCase = false) {
		const cleanName = event.modelName.replace(/(Event)?Model$/, '');

		return `${cleanName.charAt(0)[`to${(toPascalCase ? 'Upper' : 'Lower')}Case`]()}${cleanName.slice(1)}`;
	}

};
