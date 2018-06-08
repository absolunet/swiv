module.exports = class FactoryContract {

    getService() {
        throw new Error(`The service ${this.constructor.name} must implement getService() method.`);
    }
};
