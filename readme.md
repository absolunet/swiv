# SWIV
/swiv/ (haitian creole) - Follow, track.

## What is Swiv?
Swiv is a JavaScript library that makes website tracking implementation easier.
It procures a fluent and modular API to send data to Google analytic systems, such as Analytics, Tag Manager, and Enhanced Ecommerce.
It is dependency-free, back-end agnostic, with the possibility to replace any legacy singleton within the core by our own.
It can be implemented anywhere, from a VanillaJS environment to a PWA built on top of your favorite JS framework.

[You can read the whole wiki here](wiki)


## Requirements
- Google Tag Manager account and integration tag
- Nothing else! Just take a small cup of <a href="https://github.com/absolunet/kafe" target="_blank">kafe</a> before getting started.


## Getting started

You will need to add the script to your bundle (compiled with Gulp, Webpack, [Nwayo](https://github.com/absolunet/nwayo), whatever bundler you like) or directly add the script in your html pages.

```html
<script async src="/path/to/swiv/dist/swiv.js"></script><!-- Development -->
<!-- Or -->
<script async src="/path/to/swiv/dist/swiv.min.js"></script><!-- Production -->
```

You can use it as is, but it is recommended to use a dedicated mapper service for your data model and an implementation module to easily integrate the core module.

Happily, you can use complementary packages provided in the Swiv project (see packages below)

## Packages

- Swiv Core
    - [Google Enhanced Ecommerce](wiki/gee)
- [Swiv Map - Insite](https://github.com/absolunet/swiv-map-insite)
    - [Google Enhanced Ecommerce](https://github.com/absolunet/swiv-map-insite/tree/master/wiki/gee)
- [Swiv App - Insite AngularJS](https://github.com/absolunet/swiv-app-insiteangular)
    - [Google Enhanced Ecommerce](https://github.com/absolunet/swiv-app-insiteangular/tree/master/wiki/gee)
