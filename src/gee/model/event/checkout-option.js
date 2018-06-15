const AbstractEventModel = require('./../abstract/event');
const ActionFieldModel = require('./../data/action-field');

module.exports = class CheckoutOptionEventModel extends AbstractEventModel {

	getDefaultModelData() {
		return {
			event: 'checkoutOption',
			ecommerce: {
				checkout_option: { // eslint-disable-line camelcase
					actionField: {
						step: 1,
						option: this.getConfigRepository().get('defaultCreditCard', '')
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

};

module.exports.eventName = 'CheckoutOptionEventModel';