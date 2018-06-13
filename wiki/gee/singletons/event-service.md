# EventService
[_Swiv_](../../../readme.md) > [_Wiki_](../../) > [_Google Enhanced Ecommerce_](../) > [Singletons](readme.md)

- [Google Enhanced Ecommerce](../)
    - [Singletons](readme.md)
        - EventService
        - [MapperService](mapper-service.md)
    - [Events](../events)

The EventService must implements at least these three method: `publish()`, `subscribe()` and `unsubscribe()`.
The default EventService is a simple dictionnary of callbacks. There are better Pub/Sub library available to use.
We recommend using <a href="https://github.com/absolunet/pinki" target="_blank">Absolunet's Pinky message</a> or <a href="https://github.com/mroderick/PubSubJS" target="_blank">PubSubJS</a>, but feel free to use another library implement your own.

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
