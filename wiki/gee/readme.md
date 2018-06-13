# Google Enhanced Ecommerce
[_Swiv_](../../readme.md) > [_Wiki_](../)

- Google Enhanced Ecommerce
    - [Singletons](singletons)
        - [EventService](singletons/event-service.md)
        - [MapperService](singleton/mapper-service.md)
    - [Events](events)

## Getting started

First, include your Google script tag to load Google Tag Manager (GTM & GTAG) in the `<head>` tag, <a href="https://developers.google.com/tag-manager/quickstart" target="_blank">as recommended by Google Tag Manager</a>.

```html
<head>
    <!-- ... -->

    <!-- Optional -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-000000000-0"></script>
    <!-- END Optional -->

    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-AAA0A0A');</script>

    <!-- ... -->
</head>
```

With these tags, Swiv will be able to retreive and call all of your data (Google Analytics ID, trackers, any of it) and push all required informations through the dataLayer.


## Paradigm

The main Google Enhanced Ecommerce service use this workflow to send data to GTM:

- Listen to configured events, such as "productImpression", "addToCart", ...
    - All of the default Google Enhanced Ecommerce events are registered by defalut
    - The EventService is used so any other services can subscribe to the given service.
- When an action is triggered, it fires the associated event from its EventService
- When the event callback is executed, it handles the raw data, such as an getProduct API response, through the MapperService
- The MapperService map the raw data and push it appropriately to the given EventModel
- The main service push the mapped data to the dataLayer

Here is a linera representation of the flow:

```
Configuration    Listen    |    Implementation --- Trigger --- Publish --- Mapping --- Push
             \  /                                              \    /        \/
              \/                                                \  /     MapperService
            Events                                               \/
        Global configs                                       EventService
         event prefix
         other config
```
