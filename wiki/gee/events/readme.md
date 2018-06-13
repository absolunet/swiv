# Events
[_Swiv_](../../../readme.md) > [_Wiki_](../../) > [_Google Enhanced Ecommerce_](../)

- [Google Enhanced Ecommerce](../)
    - [Singletons](../singletons)
        - [EventService](../singletons/event-service.md)
        - [MapperService](../singletons/mapper-service.md)
    - Events

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
geeService.trigger('productImpression', product);

// Trigger the event with a defined method
geeService.triggerProductImpression(product);

// Get another product
const anotherProduct = {
    id: '098765',
    name: 'Another product'
};

// Send the two products to Google Enhanced Ecommerce
geeService.triggerProductImpression([product, anotherProduct]);
```

To see all of the events that can be trigger, see [the model list here](../../../src/gee/models/event). Those events are triggered with camelCase name.

```javascript
// To trigger the event defined in the AddToCartEventModel class in 'add-to-cart.js', the event to call is 'addToCart'
geeService.trigger('addToCart', myData);

// To trigger the event with the helper method, you keep the same syntax, except for the first letter, which will be in uppercase.
geeService.triggerAddToCart(myData);
```
