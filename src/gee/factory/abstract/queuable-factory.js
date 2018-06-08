const QueuableServiceFactoryContract = require('../../contract/queuable-factory');

module.exports = class QueuableServiceFactory extends QueuableServiceFactoryContract {

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
            throw new Error('There is no queued service to return');
        }

        return this.queuedServices[this.queuedServices.length - 1];
    }
}
