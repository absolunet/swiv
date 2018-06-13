# MapperService
[_Swiv_](../../../readme.md) > [_Wiki_](../../) > [_Google Enhanced Ecommerce_](../) > [Singletons](readme.md)

- [Google Enhanced Ecommerce](../)
    - [Singletons](readme.md)
        - [EventService](event-service.md)
        - MapperService
    - [Events](../events)

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
MapperService.prototype.map = (data, event) => {
    // Example of a product mapping in a ProductImpressionEventModel.
    // ProductImpressionEventModel main data type is ProductDataModel.
    switch(event.getMainDataType()) {
        case ProdutDataModel:
            // main data in a ProductImpressionEventModel is located to: 'ecommerce.impressions"
            event.setMainData({
                id: data.id, // "ABC-123"
                name: data.name, // "The product name"
                price: data.price.regular, // 12.34
                category: data.categories.map((category) => {
                    return category.name; // "foo", "bar" and "baz"
                }).join('/') // "foo/bar/baz"
            });
            break;

        default:
            // If the mapper don't handle an event, simply return the event with the given data as its main data
            event.setMainData(data);
            break;
    }

    return event;
};
```
