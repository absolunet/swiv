'use strict';

const AbstractEventModel = require('./../abstract/event');
const ProductDataModel = require('./../data/product');

module.exports = class PurchaseEventModel extends AbstractEventModel {

	static get modelName() {
		return 'PurchaseEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'purchase',
			ecommerce: {
				purchase: {
					actionField: {},
					products: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.purchase.products';
	}

	getMainDataType() {
		return ProductDataModel;
	}

};
