# Google Enhanced Ecommerce
[_Swiv_](../../) > [_Wiki_](../)

- Google Enhanced Ecommerce
    - [Singletons](singletons)
        - [EventService](singletons/event-service.md)
        - [MapperService](singleton/mapper-service.md)
    - [Events](events)

## Getting started

First, include your Google script tag to load Google Tag Manager (GTM & GTAG)

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-000000000-0"></script>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-AAA0A0A');</script>
```

With these tags, Swiv will be able to retreive and call all of your data (Google Analytics ID, trackers, any of it) and push all required informations through the dataLayer.
