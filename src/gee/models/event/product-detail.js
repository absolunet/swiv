const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class ProductDetailEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
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
}