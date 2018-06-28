'use strict';

const NotImplementedError = require('./../../error/not-implemented');

module.exports = class QueuableServiceFactory {

	getService() {
		throw new NotImplementedError();
	}

};
