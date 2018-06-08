const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class CheckoutEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
            event: 'checkout',
            ecommerce: {
                actionField: {
                    step: 1,
                    option: require('./../../config').get('defaultCreditCard', '')
                },
                products: []
            },
            eventCallback: () => {}
        };
    }

    getMainDataKey() {
        return 'ecommerce.products';
    }

    getMainDataType() {
        return ProductModel;
    }
}
