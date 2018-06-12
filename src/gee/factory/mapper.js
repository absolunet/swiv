const AbstractQueuableServiceFactory = require('./abstract/queuable-factory');
const DefaultMapperService = require('./../service/mapper');

module.exports = class MapperServiceFactory extends AbstractQueuableServiceFactory {

	constructor() {
		super();
		this.queueService(new DefaultMapperService());
	}

};
