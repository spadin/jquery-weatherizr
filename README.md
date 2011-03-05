jQuery Weatherizr
=================

Requires: jQuery 1.5+

This plugin simply grabs the current weather and adds a class to the body tag of the html document. You would be able to code your CSS expecting one of the condition codes to be attached as a class to the body tag.

Simple example usage:

`$(function() {
  $.weatherizr("60647");
});`

The weatherizr plugin returns a [jQuery Deferred object](http://api.jquery.com/category/deferred-object/) (introduced in jQuery 1.5). This Deferred object can be used to later have access to the full weather data object. The weather data object becomes available once the ajax request has finished loading. 

This Deferred object allows for the following to work:

`$(function() {
  $.weatherizr("60647").done(function(weather) {
    console.log(weather);
  });
});`