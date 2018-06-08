const AbstractEventModel = require('./../abstract/event');
const ProductModel = require('./../data/product');

module.exports = class ProductClickEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
            event: 'productClick',
            ecommerce: {
                click: {
                    actionField: {},
                    products: []
                }
            },
            eventCallback: () => {}
        };
    }

    getMainDataKey() {
        return 'ecommerce.click.products';
    }

    getMainDataType(){
        return ProductModel;
    }
}
