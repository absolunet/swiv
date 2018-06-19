const AbstractDataModel = require('./../abstract/data');

module.exports = class PromotionDataModel extends AbstractDataModel {

	static get modelName() {
		return 'PromotionDataModel';
	}

	getDefaultModelData() {
		return {
			id: '',
			name: '',
			creative: '',
			position: ''
		};
	}

	getRequiredFields() {
		return {
			id: (promotion, event) => {
				return ['purchase', 'refund'].indexOf(event.modelName) !== -1;
			}
		};
	}

};
