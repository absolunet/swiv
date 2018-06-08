const debounce = require('./../utils/debounce');

module.exports = class GoogleEnhancedEcommerceService {

    constructor(eventService, mapperService, configs) {
        this.eventService = eventService;
        this.mapperService = mapperService;
        this.configs = configs;

        configs.events.forEach((event) => {
            this.registerEvent(this.getCleanEventName(event.name));
        });
    }

    registerEvent(event) {
        this.eventService.subscribe(this.getEventName(event), (data) => {
            debounce(() => {
                window[this.configs.dataLayer].push(data);
            }, () => {
                return this.configs.ready && this.configs.ga && window[this.configs.ga];
            });
        });

        return this;
    }

    trigger(event, data = {}) {
        this.eventService.publish(this.getEventName(event), this.mapperService.map(data, this.getEventModel(event)));

        return this;
    }

    getEventName(event, withPrefix = true) {
        const prefix = withPrefix ? this.configs.get('eventPrefix', '') : '';
        return `${prefix}${event}`;
    }

    getEventModel(event) {
        const eventCollection = this.configs.events;

        for (let i = eventCollection.length - 1; i >= 0; i--) {
            if (this.getCleanEventName(eventCollection[i].name) == event) {
                return new eventCollection[i]();
            }
        }

        return {};
    }

    getCleanEventName(event) {
        const cleanName = event.replace(/(Event)?Model$/, '');
        return `${cleanName.charAt(0).toLowerCase()}${cleanName.slice(1)}`;
    }
};
