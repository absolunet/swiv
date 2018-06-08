const AbstractEventModel = require('./../abstract/event');
const PromotionModel = require('./../data/promotion');

module.exports = class PromoViewEventModel extends AbstractEventModel {

    getDefaultModelData() {
        return {
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
}
