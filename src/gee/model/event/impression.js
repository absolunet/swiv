const AbstractEventModel = require('./../abstract/event');
const ImpressionDataModel = require('./../data/impression');

module.exports = class ProductImpressionEventModel extends AbstractEventModel {

	getDefaultModelData() {
		return {
			event: 'productImpression',
			ecommerce: {
				currencyCode: this.getConfigRepository().get('currencyCode', 'USD'),
				impressions: []
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.impressions';
	}

	getMainDataType() {
		return ImpressionDataModel;
	}

};

module.exports.eventName = 'ProductImpressionEventModel';
