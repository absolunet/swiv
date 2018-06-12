const configs = require('./../config');
const debounceUntil = require('./../utils/debounce-until');
const GeeFactory = require('./../factory/gee');

debounceUntil(() => {
    configs.set('ready', true);
}, () => {
    return configs.gtm && window[configs.gtm] !== null;
});

module.exports = new GeeFactory();
