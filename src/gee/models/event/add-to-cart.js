const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class AddToCartEventModel extends AbstractEventModel {

	getDefaultModelData() {
		return {
			event: 'addToCart',
			ecommerce: {
				currencyCode: require('./../../config').get('currencyCode', 'USD'),
				add: {
					products: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.add.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};
