'use strict';

module.exports = {
	dataLayer: 'dataLayer',
	gtm: 'google_tag_manager',
	eventPrefix: 'swiv.gee.',
	events: [
		require('./../model/event/default'),
		require('./../model/event/add-to-cart'),
		require('./../model/event/checkout'),
		require('./../model/event/checkout-option'),
		require('./../model/event/impression'),
		require('./../model/event/product-click'),
		require('./../model/event/product-detail'),
		require('./../model/event/promo-click'),
		require('./../model/event/promo-view'),
		require('./../model/event/purchase'),
		require('./../model/event/refund'),
		require('./../model/event/remove-from-cart')
	]
};
