const AbstractEventModel = require('./../abstract/event');
const PromotionModel = require('./../data/promotion');

module.exports = class PromoClickEventModel extends AbstractEventModel {

	static get modelName() {
		return 'PromoClickEventModel';
	}

	getDefaultModelData() {
		return {
			event: 'promotionClick',
			ecommerce: {
				promoClick: {
					promotions: []
				}
			},
			eventCallback: () => {} // eslint-disable-line no-empty-function
		};
	}

	getMainDataKey() {
		return 'ecommerce.promoClick.promotions';
	}

	getMainDataType() {
		return PromotionModel;
	}

};
