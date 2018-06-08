const configs = require('./../config');
const debounceUntil = require('./../utils/debounce-until');
const isGaInitialized = require('./../utils/is-ga-initialized');
const NoTrackingIdError = require('./../error/no-tracking-id');
const getGaId = require('./../utils/get-ga-id');

const resolveTrackingId = () => {
    if (!isGaInitialized(configs)){
        return;
    }

    if (!configs.get('id')) {
        configs.set('id', getGaId(configs));
    }

    if (!configs.has('id')) {
        throw new NoTrackingIdError();
    }

    window[configs.ga]('create', configs.id);
};

debounceUntil(() => {
    resolveTrackingId();
    window[configs.ga]('require', 'ec');
    configs.set('ready', true);
}, () => {
    return isGaInitialized(configs);
});
