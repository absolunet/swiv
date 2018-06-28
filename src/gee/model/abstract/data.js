"use strict";

const AbstractModel = require('./model');

module.exports = class AbstractDataModel extends AbstractModel {

	getRequiredFields() {
		return {};
	}

};
