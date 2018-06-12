const AbstractEventModel = require('./../abstract/event');

module.exports = class DefaultEventModel extends AbstractEventModel {

	getDefaultModelData() {
		return {
			ecommerce: {}
		};
	}

	getMainDataKey() {
		return 'ecommerce';
	}

	getMainDataType() {
		return Object;
	}

};
