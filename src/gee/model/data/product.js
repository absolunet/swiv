const ImpressionDataModel = require('./impression');

module.exports = class ProductDataModel extends ImpressionDataModel {

	getDefaultModelData() {
		const data = super.getDefaultModelData();
		const additionalData = {
			quantity: 1,
			coupon: ''
		};

		Object.keys(additionalData).forEach((k) => {
			data[k] = additionalData[k];
		});

		return data;
	}

};
