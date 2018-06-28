'use strict';

const AbstractEventModel = require('./../abstract/event');

module.exports = class DefaultEventModel extends AbstractEventModel {

	static get modelName() {
		return 'DefaultEventModel';
	}

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
