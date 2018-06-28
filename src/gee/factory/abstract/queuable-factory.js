'use strict';

const AbstractServiceFactory = require('./factory');
const NoQueueServiceError = require('./../../error/no-queue-service');

module.exports = class AbstractQueuableServiceFactory extends AbstractServiceFactory {

	constructor() {
		super();
		this.queuedServices = [];
	}

	queueService(service) {
		this.queuedServices.push(service);

		return this;
	}

	getService() {
		if (this.queuedServices.length === 0) {
			throw new NoQueueServiceError();
		}

		return this.queuedServices[this.queuedServices.length - 1];
	}

};
