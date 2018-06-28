'use strict';

const AbstractEventModel = require('./../abstract/event');
const ImpressionDataModel = require('./../data/impression');

module.exports = class ProductImpressionEventModel extends AbstractEventModel {

	static get modelName() {
		return 'ProductImpressionEventModel';
	}

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
