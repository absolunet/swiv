const AbstractEventModel = require('./../abstract/event');
const ProductDataModel = require('./../data/impression');

module.exports = class ProductImpressionEventModel extends AbstractEventModel {

	getDefaultModelData() {
		return {
			event: 'productImpression',
			ecommerce: {
				currencyCode: require('./../../config').get('currencyCode', 'USD'),
				impressions: []
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.impressions';
	}

	getMainDataType() {
		return ProductDataModel;
	}

};

module.exports.eventName = 'ProductImpressionEventModel';
