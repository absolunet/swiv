const AbstractDataModel = require('./../abstract/data');

module.exports = class ProductDataModel extends AbstractDataModel {

    getDefaultModelData() {
        return {
            name: '',
            id: '',
            price: '',
            brand: '',
            category: '',
            variant: '',
            list: require('./../../config').get('defaultList', 'Search Results'),
        };
    }
}
