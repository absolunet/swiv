const AbstractEventModel = require('./../abstract/event');
const ImpressionModel = require('./../data/impression');

module.exports = class ImpressionEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
            event: 'impressions',
            ecommerce: {
                currencyCode: require('./../../config').get('currencyCode', 'USD'),
                impressions: [],
            }
        };
    }

    getMainDataKey() {
        return 'ecommerce.impressions';
    }

    getMainDataType() {
        return ImpressionModel;
    }
}
