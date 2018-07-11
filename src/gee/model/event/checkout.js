'use strict';

const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class CheckoutEventModel extends AbstractEventModel {

	static get modelName() {
		return 'CheckoutEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'checkout',
			ecommerce: {
				actionField: {},
				products: []
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};
