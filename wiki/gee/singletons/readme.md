# Singletons
[_Swiv_](../../../) > [_Wiki_](../../) > [_Google Enhanced Ecommerce_](../)

- [Google Enhanced Ecommerce](../)
    - Singletons
        - [EventService](event-service.md)
        - [MapperService](mapper-service.md)
    - [Events](../events)

Swiv Core GEE comes with two default singletons.
The first one, the EventService, manages the Pub/Sub system within the module.
The second one, the MapperService, handles all event data to map properly the raw data to standardized Google Enhanced Ecommerce object. These objects are defined [here](../../src/gee/models/event)

To overide a singleton, you can set your service in the queue of the factory:
```javascript
swiv.gee
    .setMapperService(new CustomMapperService())
    .setEventService(pinky.message);
```