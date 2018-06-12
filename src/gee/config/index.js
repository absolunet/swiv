const defaultConfigs = require('./defaults');

const _constants = {};

class ConfigRepository {

	get(key, defaultValue = null) {
		return this.has(key) ? _constants[key] : defaultValue;
	}

	set(key, value) {
		_constants[key] = value;

		if (!(Object.getOwnPropertyDescriptor(this, key) || {}).get) {
			Object.defineProperty(this, key, {
				get: function() {
					return this.get(key);
				},
				set: function(v) {
					this.set(key, v);
				}
			});
		}

		return this;
	}

	has(key) {
		return typeof _constants[key] !== 'undefined';
	}

	remove(key) {
		delete _constants[key];

		return this;
	}

	all() {
		const constantsCopy = {};

		for (const key in _constants) {
			if (typeof _constants[key] !== 'undefined') {
				constantsCopy[key] = _constants[key];
			}
		}

		return constantsCopy;
	}

}

const configs = new ConfigRepository();

for (const key in defaultConfigs) {
	if (defaultConfigs[key]) {
		configs.set(key, defaultConfigs[key]);
	}
}

module.exports = configs;
