const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class ImpressionEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
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
        return ProductModel;
    }
}
