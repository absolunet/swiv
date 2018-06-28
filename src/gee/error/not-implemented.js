"use strict";

module.exports = class NotImplementedError extends Error {

	constructor(method) {
		// eslint-disable-next-line no-caller
		super(`Method ${(method || arguments.callee.caller.name)}() must be implemented.`);
	}

};
