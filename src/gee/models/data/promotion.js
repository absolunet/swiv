const AbstractDataModel = require('./../abstract/data');
const config = require('./../../config');

module.exports = class PromotionDataModel extends AbstractDataModel {

    getDefaultModelData() {
        return {
            id: '',
            name: '',
            creative: '',
            position: ''
        };
    }
}