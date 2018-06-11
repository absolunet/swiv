# SWIV - Google Enhanced Ecommerce

## Basic implementation

### GTM
First, include your Google script tag to load Google Tag Manager (GTM)

```html
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-AAA0A0A');</script>
```

With this tag, Swiv will be able to retreive all of your data (Google Analytics ID, trackers, any of it).

### Singleton override

Swiv Core GEE comes with two default singletons.
The first one, the EventService, manages the Pub/Sub system within the module.
The second one, the MapperService, handles all event data to map properly the raw data to standardized Google Enhanced Ecommerce object. These objects are defined [here](https://github.com/absolunet/swiv/tree/master/src/gee/models/event)

To overide a singleton, you can set your service in the queue of the factory:
```javascript
swiv.gee
    .setMapperService(new CustomMapperService())
    .setEventService(pinky.message);
```

#### EventService
The EventService must implements at least these three method: `publish()`, `subscribe()` and `unsubscribe()`.
The default EventService is a simple dictionnary of callbacks. There are better Pub/Sub library available to use.
We recommend using [Absolunet's Pinky message](https://github.com/absolunet/pinki) or [PubSubJS](https://github.com/mroderick/PubSubJS), but feel free to use another library implement your own.

```javascript
/**
 * @method publish
 *
 * @param {string} event The event name to publish.
 * @param {object} [data={}] The raw object to dispatch within the event.
 * 
 * @returns {void}
 */
EventService.prototype.publish = (event, data = {}) => { /*...*/ };

/**
 * @method subscribe
 * 
 * @param {string} event The event name to subscribe to.
 * @param {function} callack The callback to execute when the subscribed event is triggered.
 * 
 * @returns {string} The token that identifies the subscriber, which can be use to unsubscribe.
 */
EventService.prototype.subscribe = (event, callback) => { /*...*/ };

/**
 * @method unsubscribe
 * 
 * @param {string} token The token that identified a subscriber.
 * 
 * @returns {void}
 */
EventService.prototype.unsubscribe = (token) => { /*...*/ };
```

#### MapperService
The MapperService must implement at least this method: `map()`.
The default mapper will simply return the data as is.
This service should be implemented based on the back-end API response model.
If the data is manually sent from custom JS, the mapper shouldn't be necessary if you follow the Google Enhanced Ecommerce Data model.

```javascript
/**
 * @method map
 * 
 * @param {{}} data The data to map.
 * @param {AbstractEventModel} event The triggered event model. This object represents the data to send to Google Enhanced Ecommerce through the DataLayer.
 * @see https://github.com/absolunet/swiv/blob/master/src/gee/models/abstract/event.js
 * @see https://github.com/absolunet/swiv/tree/master/src/gee/models/event
 * 
 * @returns {AbstractEventModel|{}} The data to send to Google Enhanced Ecommerce
 */
MapperService.prototype.map = (data, event) => { /*...*/ };
```

### Trigger event

To trigger a Google Enhanced Ecommerce event, you may first instanciate the service after configurate your services and configuration. It is to note that this service is a singleton, so this method can be use as many times as wanted.

When you have your service, you can trigger any event (Ecommerce Measurement) as described in [Google Enhanced Ecommerce documentation](https://developers.google.com/tag-manager/enhanced-ecommerce)

```javascript
// Get singleton
const geeService = swiv.gee.getService();
// Get a product to send
const product = {
    id: '123456',
    name: 'My product name'
};

// Trigger the event manually.
geeService.trigger('impressions', product);

// Trigger the event with a defined method
geeService.triggerImpressions(product);

// Get another product
const anotherProduct = {
    id: '098765',
    name: 'Another product'
};

// Send the two products to Google Enhanced Ecommerce
geeService.triggerImpressions([product, anotherProduct]);
```

To see all of the events that can be trigger, see [the model list here](https://github.com/absolunet/swiv/tree/master/src/gee/models/event). Those events are triggered with camelCase name.

```javascript
// To trigger the event defined in the AddToCartEventModel class in 'add-to-cart.js', the event to call is 'addToCart'
geeService.trigger('addToCart', myData);

// To trigger the event with the helper method, you keep the same syntax, except for the first letter, which will be in uppercase.
geeService.triggerAddToCart(myData);
```

