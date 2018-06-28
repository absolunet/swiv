"use strict";

const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class ProductClickEventModel extends AbstractEventModel {

	static get modelName() {
		return 'ProductClickEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'productClick',
			ecommerce: {
				click: {
					actionField: {},
					products: []
				}
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.click.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};
