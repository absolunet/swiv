const AbstractEventModel = require('./../abstract/event');
const PromotionModel = require('./../data/promotion');

module.exports = class PromoClickEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
            event: 'promotionClick',
            ecommerce: {
                promoClick: {
                    promotions: []
                }
            },
            eventCallback: () => {}
        };
    }

    getMainDataKey() {
        return 'ecommerce.promoClick.promotions';
    }

    getMainDataType() {
        return PromotionModel;
    }
}
