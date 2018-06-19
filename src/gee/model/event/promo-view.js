const AbstractEventModel = require('./../abstract/event');
const PromotionModel = require('./../data/promotion');

module.exports = class PromoViewEventModel extends AbstractEventModel {

	static get modelName() {
		return 'PromoViewEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'promotionView',
			ecommerce: {
				promoView: {
					promotions: []
				}
			}
		};
	}

	getMainDataKey() {
		return 'ecommerce.promoView.promotions';
	}

	getMainDataType() {
		return PromotionModel;
	}

};
