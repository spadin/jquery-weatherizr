/**
 * @title jQuery.weatherizr
 */
(function($) {
  $.extend({
    weatherizr: Weatherizr
  });
  /**
    *  Use the jQuery Weatherizr plugin.
    *  @constructor jQuery.weatherizr
    *  @augments jQuery
    */
  function Weatherizr(location) {
    /**
      *  Hook into this jQuery.Deferred() object to get all the weather data.
      *  @function jQuery.weatherizr.data
      *  @type jQuery.Deferred()
      *  @example
      *  // Run jQuery.weatherizr and assign its value to a variable.
      *  var jqd = jQuery.weatherizr("60647");
      *  
      *  // The variable allows for a `done` callback.
      *  jqd.done(function(weather) {
      *   console.log(weather);
      *  });
      */
    Weatherizr.data = jQuery.Deferred();
    
    /**
      *  Initialize the jQuery.weatherizr plugin.
      *  @function jQuery.weatherizr.init
      *  @param {String} location the place for which you'd like the weather. Eg. "Chicago" or "60610"
      *  @returns A jQuery.Deferred() object.
      *  @type Weatherizr.data.promise()
      *  @example
      *  // Simple usage:
      *  jQuery.weatherizr("60647");
      *  @example
      *  // Advanced usage. Using the done function for jQuery.Deferred() object.
      *  jQuery.weatherizr("60647").done(function(weather) {
      *   console.log(weather);
      *  });
     */
    Weatherizr.init = function(location) {
      var weather_url = "http://pipes.yahoo.com/pipes/pipe.run?_id=dd8dd58983068f8a245d69afd8946443&_render=json&location=";
      var weather_jqxhr = $.get(weather_url + escape(location));
      weather_jqxhr.success(function(data) {
        var condition_code = data.value.items[0].current_conditions.condition.data;
        condition_code = condition_code.toLowerCase().replace(/\s/g,'_');
        $("body").addClass(condition_code);

        var weather = {
          current: {
            code: condition_code,
            condition: data.value.items[0].current_conditions.condition.data,
            temperature: {
              fahrenheit: data.value.items[0].current_conditions.temp_f.data,
              celcius: data.value.items[0].current_conditions.temp_f.data
            },
            humidity: data.value.items[0].current_conditions.icon.data,
            icon: "http://google.com"+data.value.items[0].current_conditions.icon.data,
            wind: data.value.items[0].current_conditions.wind_condition.data.replace(/Wind: /g,'')
          },
          forecast: []
        };
        $.each(data.value.items[0].forecast_conditions, function(k,forecast) {
          weather.forecast.push({
            day: forecast.day_of_week.data,
            low: forecast.low.data,
            high: forecast.high.data,
            icon: "http://google.com"+forecast.icon.data,
            condition: forecast.condition.data
          });
        });      
        Weatherizr.data.resolve(weather);
      });
      return Weatherizr.data.promise();
    };
    return Weatherizr.init(location);
  }
})(jQuery);