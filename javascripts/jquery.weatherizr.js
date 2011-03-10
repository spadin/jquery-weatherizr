 (function($) {
  $.extend({
    weatherizr: Weatherizr
  });
  
  function Weatherizr(location) {
    var weather_url = "http://www.google.com/ig/api?weather=";
    var weather_jqxhr = $.get(weather_url + escape(location));
    var deferred = jQuery.Deferred();
    weather_jqxhr.success(function(data) {
      var condition_code = $(data).find("current_conditions condition").attr("data");
      condition_code = condition_code.toLowerCase().replace(/\s/g,'_');
      $("body").addClass(condition_code);
      
      var weather = {
        current: {
          code: condition_code,
          condition: $(data).find("current_conditions condition").attr("data"),
          temperature: {
            fahrenheit: $(data).find("current_conditions temp_f").attr("data"),
            celcius: $(data).find("current_conditions temp_c").attr("data")
          },
          humidity: $(data).find("current_conditions humidity").attr("data"),
          icon: "http://google.com"+$(data).find("current_conditions icon").attr("data"),
          wind: $(data).find("current_conditions wind_condition").attr("data").replace(/Wind: /g,'')
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