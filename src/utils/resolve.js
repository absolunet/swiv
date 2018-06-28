"use strict";

module.exports = (path, obj = {}) => {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : undefined;
	}, obj);
};
