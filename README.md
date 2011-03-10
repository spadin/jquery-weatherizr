jQuery Weatherizr
=================

Requires: [jQuery 1.5+](http://api.jquery.com)

Description
-----------

This plugin simply grabs the current weather and adds a class to the `body` tag of the html document. You would be able to code your CSS expecting one of the condition codes to be attached as a class to the `body` tag.

Examples
--------

Simple example usage:

<pre>
$(function() {
  $.weatherizr("60647");
});
</pre>

The weatherizr plugin returns a [jQuery Deferred object](http://api.jquery.com/category/deferred-object/) (introduced in jQuery 1.5). This Deferred object can be used to later have access to the full weather data object. The weather data object becomes available once the ajax request has finished loading. 

This Deferred object allows for the following to work:

<pre>
$(function() {
  $.weatherizr("60647").done(function(weather) {
    console.log(weather);
  });
});
</pre>

Possible class names
--------------------

Possible class names that would be added to the `body` tag.

- chance\_of\_rain
- chance\_of\_snow
- chance\_of\_storm
- chance\_of\_tstorm
- clear
- cloudy
- dust
- flurries
- fog
- freezing\_drizzle
- haze
- icy
- light\_rain
- light\_snow
- mist
- mostly\_cloudy
- mostly\_sunny
- overcast
- partly\_cloudy
- partly\_sunny
- rain
- rain\_and\_snow
- scattered\_showers
- scattered\_thunderstorms
- showers
- sleet
- smoke
- snow
- snow\_showers
- storm
- sunny
- thunderstorm
