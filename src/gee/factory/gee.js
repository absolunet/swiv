const FactoryContract = require('./abstract/factory');
const GoogleEnhancedEcommerceService = require('./../service/gee');

const eventServiceFactory = new (require('./event'))();
const mapperServiceFactory = new (require('./mapper'))();
const configs = require('./../config');

let _singleton;

module.exports = class GoogleEnhancedEcommerceServiceFactory extends FactoryContract {

	constructor() {
		super();
		this.configs = configs;
	}

	setEventService(service) {
		eventServiceFactory.queueService(service);

		return this;
	}

	setMapperService(service) {
		mapperServiceFactory.queueService(service);

		return this;
	}

	getService() {
		if (!_singleton) {
			const eventService = eventServiceFactory.getService();
			const mapperService = mapperServiceFactory.getService();
			_singleton = new GoogleEnhancedEcommerceService(eventService, mapperService, this.configs);
		}

		return _singleton;
	}

};
