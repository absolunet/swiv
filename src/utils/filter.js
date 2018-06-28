'use strict';

module.exports = (obj, predicate) => {
	const result = {};

	Object.keys(obj).forEach((key) => {
		if (predicate(obj[key], key)) {
			result[key] = obj[key];
		}
	});

	return result;
};
