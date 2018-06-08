const AbstractEventModel = require('./../abstract/event');
const ActionFieldModel = require('./../data/action-field');

module.exports = class CheckoutOptionEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
            event: 'checkoutOption',
            ecommerce: {
                checkout_option: {
                    actionField: {
                        step: 1,
                        option: require('./../../config').get('defaultCreditCard', '')
                    }
                }
            }
        };
    }

    getMainDataKey() {
        return 'ecommerce.checkout_option.actionField';
    }

    getMainDataType() {
        return ActionFieldModel;
    }
}
