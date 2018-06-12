const AbstractEventModel = require('./../abstract/event');
const ActionFieldModel = require('./../data/action-field');

module.exports = class PurchaseEventModel extends AbstractEventModel {

	getDefaultModelData() {
		return {
			event: 'purchase',
			ecommerce: {
				purchase: {
					actionField: new ActionFieldModel()
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.purchase.actionField';
	}

	getMainDataType() {
		return ActionFieldModel;
	}

};

module.exports.eventName = 'PurchaseEventModel';
