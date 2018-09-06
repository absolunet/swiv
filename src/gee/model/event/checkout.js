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
				checkout: {
					actionField: {},
					products: []
				}
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.checkout.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};
