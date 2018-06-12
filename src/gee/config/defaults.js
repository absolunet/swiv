module.exports = {
    dataLayer: 'dataLayer',
    gtm: 'google_tag_manager',
    eventPrefix: 'gee.',
    gaPrefix: 'ec:',
    events: [
        require('./../models/event/default'),
        require('./../models/event/add-to-cart'),
        require('./../models/event/checkout'),
        require('./../models/event/checkout-option'),
        require('./../models/event/impression'),
        require('./../models/event/product-click'),
        require('./../models/event/product-detail'),
        require('./../models/event/promo-click'),
        require('./../models/event/promo-view'),
        require('./../models/event/purchase'),
        require('./../models/event/refund'),
        require('./../models/event/remove-from-cart')
    ]
};
