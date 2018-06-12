const AbstractQueuableServiceFactory = require('./abstract/queuable-factory');
const DefaultEventService = require('./../service/event');

module.exports = class EventServiceFactory extends AbstractQueuableServiceFactory {

	constructor() {
		super();
		this.queueService(new DefaultEventService());
	}

};
