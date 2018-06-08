const AbstractDataModel = require('./../abstract/data');
const config = require('./../../config');

module.exports = class ActionFieldDataModel extends AbstractDataModel {

    getDefaultModelData() {
        return {};
    }
}
