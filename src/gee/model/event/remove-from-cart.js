const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class RemoveFromCartEventModel extends AbstractEventModel {

	static get modelName() {
		return 'RemoveFromCartEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'removeFromCart',
			ecommerce: {
				remove: {
					products: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.remove.products';
	}

	getMainDataType() {
		return ProductModel;
	}

};
