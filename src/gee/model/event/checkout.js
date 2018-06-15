const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class CheckoutEventModel extends AbstractEventModel {

	getDefaultModelData() {
		return {
			event: 'checkout',
			ecommerce: {
				actionField: {
					step: 1,
					option: this.getConfigRepository().get('defaultCreditCard', '')
				},
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

module.exports.eventName = 'CheckoutEventModel';