const QueuableServiceFactory = require('./abstract/queuable-factory');
const DefaultMapperService = require('./../service/mapper');

module.exports = class MapperServiceFactory extends QueuableServiceFactory {

    constructor() {
        super();
        this.queueService(new DefaultMapperService());
    }
}
