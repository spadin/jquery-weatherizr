(function($) {
  $.extend({
    weatherizr: Weatherizr
  });
  
  function Weatherizr(location) {
    var weather_url = "http://www.google.com/ig/api?weather=";
    var weather_jqxhr = $.get(weather_url + escape(location));
    var deferred = jQuery.Deferred();
    weather_jqxhr.success(function(data) {
      /*
      Possible Conditions:
      - partly_sunny
      - scattered_thunderstorms
      - showers
      - scattered_showers
      - rain_and_snow
      - overcast
      - light_snow
      - freezing_drizzle
      - chance_of_rain
      - sunny
      - clear
      - mostly_sunny
      - partly_cloudy
      - mostly_cloudy
      - chance_of_storm
      - rain
      - chance_of_snow
      - cloudy
      - mist
      - storm
      - thunderstorm
      - chance_of_tstorm
      - sleet
      - snow
      - icy
      - dust
      - fog
      - smoke
      - haze
      - flurries
      - light_rain
      - snow_showers
      */
      var condition = $(data).find("current_conditions condition").attr("data");
      condition = condition.toLowerCase().replace(/\s/g,'_');
      $("body").addClass(condition);
      
      var weather = {
        current: {
          condition: condition,
          temperature: {
            fahrenheit: $(data).find("current_conditions temp_f").attr("data"),
            celcius: $(data).find("current_conditions temp_c").attr("data")
          },
          humidity: $(data).find("current_conditions humidity").attr("data"),
          icon: "http://google.com"+$(data).find("current_conditions icon").attr("data"),
          wind: $(data).find("current_conditions wind_condition").attr("data")
        },
        forecast: []
      };
      $(data).find("forecast_conditions").each(function(k,forecast) {
        weather.forecast.push({
          day: $(forecast).find("day_of_week").attr("data"),
          low: $(forecast).find("low").attr("data"),
          high: $(forecast).find("high").attr("data"),
          icon: "http://google.com"+$(forecast).find("icon").attr("data"),
          condition: $(forecast).find("condition").attr("data")
        });
      });
      deferred.resolve(weather);
    });
    return deferred.promise();
  }
})(jQuery);