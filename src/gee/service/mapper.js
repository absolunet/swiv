"use strict";

module.exports = class DefaultMapperService {

	map(data, event) {
		event.setMainData(data);

		return event;
	}

};
