const AbstractModel = require('./model');
const NotImplementedError = require('./../../error/not-implemented');
const resolve = require('./../../utils/resolve');
const filter = require('./../../utils/filter');

module.exports = class AbstractEventModel extends AbstractModel {

    constructor() {
        super();
        this.mainDataType = Object;
    }

    setMainData(data = {}) {
        const keyList = this.getMainDataKey().split('.');
        const lastKey = keyList.pop();
        const key = keyList.join('.');
        const container = resolve(key, this) || {};

        if (container) {
            const isOfMainType = data.constructor !== Array ? this.isOfMainType(data) : data.every((d) => {
                return this.isOfMainType(d);
            });

            if (!isOfMainType) {
                console.warn(`The main data does not fit the expected type: ${this.getMainDataType().name}`);
            }

            if (container[lastKey] && container[lastKey].constructor === Array) {
                container[lastKey].push(data);
            } else {
                container[lastKey] = data;
            }
        }
    }

    getMainDataKey() {
        if (this.mainDataKey) {
            return this.mainDataKey;
        }

        throw new NotImplementedError();
    }

    getMainDataType() {
        return this.mainDataType || Object;
    }

    isOfMainType(data) {
        const mainDataType = this.getMainDataType();

        if (data.prototype instanceof mainDataType) {
            return true;
        }

        const requiredKeys = Object.keys(filter((new mainDataType()).getData(), (val, key) => {
            return !val;
        }));
        
        for (let i = requiredKeys.length - 1; i >= 0; i--) {
            if (typeof data[requiredKeys[i]] === 'undefined') {

                return false;
            }
        }

        return true;
    }

    getWhitelistedFunctions() {
        return ['eventCallback'];
    }
};
