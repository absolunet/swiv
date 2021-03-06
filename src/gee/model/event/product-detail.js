'use strict';

const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class ProductDetailEventModel extends AbstractEventModel {

	static get modelName() {
		return 'ProductDetailEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'productDetail',
			ecommerce: {
				detail: {
					actionField: {},
					products: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.detail.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};
