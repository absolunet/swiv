const QueuableServiceFactory = require('./abstract/queuable-factory');
const DefaultEventService = require('./../service/event');

module.exports = class EventServiceFactory extends QueuableServiceFactory {

    constructor() {
        super();
        this.queueService(new DefaultEventService());
    }
}
