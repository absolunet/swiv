const AbstractModel = require('./model');
const NotImplementedError = require('./../../error/not-implemented').default;
const resolve = require('./../../utils/resolve');
const filter = require('./../../utils/filter');
let _configs;

module.exports = class AbstractEventModel extends AbstractModel {

	constructor() {
		super();
		this.mainDataType = Object;
		_configs = _configs || require('./../../config');
	}

	setMainData(data = {}) {
		const keyList = this.getMainDataKey().split('.');
		const lastKey = keyList.pop();
		const key = keyList.join('.');
		const container = resolve(key, this) || {};

		if (container) {
			const isOfMainType = data.constructor !== Array ? this.isOfMainType(data) : data.every((d) => {
				return this.isOfMainType(d);
			});

			if (!isOfMainType) {
				if (_configs.get('debug', false)) {
					// eslint-disable-next-line no-console
					console.warn(`The main data does not fit the expected type: ${this.getMainDataType().name}`);
				}
			}
			if (container[lastKey] && container[lastKey].constructor === Array && data.constructor !== Array) {
				container[lastKey].push(data);
			} else {
				container[lastKey] = data;
			}
		}
	}

	getMainDataKey() {
		if (this.mainDataKey) {
			return this.mainDataKey;
		}

		throw new NotImplementedError();
	}

	getMainDataType() {
		return this.mainDataType || Object;
	}

	isOfMainType(data) {
		return Object.keys(filter((new (this.getMainDataType())()).getRequiredFields(), (val, key) => {
			return typeof val === 'function' ? val(key, this) : Boolean(val);
		})).every((key) => {
			return typeof data[key] === 'boolean' || data[key];
		});
	}

	getWhitelistedFunctions() {
		return ['eventCallback'];
	}

	getEventName() {
		const cleanName = this.modelName.replace(/(Event)?Model$/, '');

		return `${cleanName.charAt(0).toLowerCase()}${cleanName.slice(1)}`;
	}

};
