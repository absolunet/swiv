'use strict';

const AbstractDataModel = require('./../abstract/data');

module.exports = class ImpressionDataModel extends AbstractDataModel {

	static get modelName() {
		return 'ImpressionDataModel';
	}

	getDefaultModelData() {
		return {
			name: '',
			id: '',
			brand: '',
			category: '',
			variant: '',
			list: '',
			position: 1,
			price: 0
		};
	}

	getRequiredFields() {
		return {
			id: (product) => {
				return !product.name;
			},
			name: (product) => {
				return !product.id;
			}
		};
	}

};
