module.exports = class NoTrackingIdError extends Error {

    constructor(message = '') {
        const defaultMessage = 'Google Enhanced Ecommerce plugin requires a tracker ID to work. Set the ID witin the factory configuration (swiv.gee.configs.set("id", "UA-XXXXXXXXX-Y")).';
        super(`${defaultMessage}${(message ? ` ${message}` : '')}`);
    }
};
