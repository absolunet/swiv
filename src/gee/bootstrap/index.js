const configs = require('./../config');
const debounceUntil = require('./../utils/debounce-until');
const isGaInitialized = require('./../utils/is-ga-initialized');

debounceUntil(() => {
    window[configs.ga]('require', 'ec');
    configs.set('ready', true);
}, () => {
    return isGaInitialized(configs);
});
