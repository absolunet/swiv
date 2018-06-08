const AbstractEventModel = require('./../abstract/event');
const ActionFieldModel = require('./../data/action-field');

module.exports = class RefundEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
            ecommerce: {
                refund: {
                    actionField: new ActionFieldModel()
                }
            }
        };
    }

    getMainDataKey() {
        return 'ecommerce.refund.actionField';
    }

    getMainDataType() {
        return ActionFieldModel;
    }
}
