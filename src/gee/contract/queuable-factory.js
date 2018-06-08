const FactoryContract = require('./factory');

module.exports = class QueuableFactoryContract extends FactoryContract {

    queueService() {
        throw new Error(`The service ${this.constructor.name} must implement queueService() method.`);
    }
};
