const configs = require('./../config');
const debounce = require('./../utils/debounce');

const isGaInitialized = () => {
    return configs.ga && typeof window[configs.ga] === 'function';
};

const resolveTrackingId = () => {
    if (!isGaInitialized()){
        return;
    }

    if (!configs.get('id')) {
        configs.set('id', getTrackingIdFromGa());
    }

    if (!configs.has('id')) {
        throw new Error('Google Enhanced Ecommerce plugin requires a tracker ID to work. Set the ID witin the factory configuration (googleEnhancedEcommerceFactory.configs.set("id", "UA-XXXXXXXXX-Y"))');
    }

    window[configs.ga]('create', configs.id);
};

const getTrackingIdFromGa = () => {
    try {
        return ga.getAll().shift().a.data.values[':trackingId'];
    } catch(e) {
        const d = window[configs.dataLayer] || [];
        for (let i = 0; i < d.length; i++) {
            const data = d[i] || [];
            if (data[0] === 'config') {
                return data[1];
            }
        }
    }

    return null;
}

debounce(() => {
    resolveTrackingId();
    window[configs.ga]('require', 'ec');
    configs.set('ready', true);
}, () => {
    return isGaInitialized();
});
