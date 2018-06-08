module.exports = class AbstractModel {

    constructor(data = {}) {
        this.map(this.getDefaultModelData()).map(data);
    }

    map(data) {
        for(const prop in data) {
            if (typeof data[prop] !== 'undefined') {
                this.set(prop, data[prop], data);
            }
        }

        return this;
    }

    set(prop, value, context) {
        this[prop] = this.mapPropertyValue(prop, value, context);

        return this;
    }

    getData() {
        const data = {};
        const whitelistedFunctions = this.getWhitelistedFunctions();

        for (const prop in this) {
            const type = typeof this[prop];

            if (type !== 'undefined' && ((typeof this[prop]) !== 'function' || whitelistedFunctions.indexOf(prop) !== -1)) {
                data[prop] = this[prop];
            }
        }

        return data;
    }

    getWhitelistedFunctions() {
        return [];
    }

    mapPropertyValue(prop, value, context = {}) {
        return value;
    }

    getDefaultModelData() {
        return {};
    }
};
