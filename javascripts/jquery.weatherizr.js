 (function($) {
  $.extend({
    weatherizr: Weatherizr
  });
  
  function Weatherizr(location) {
    var weather_url = "http://pipes.yahoo.com/pipes/pipe.run?_id=dd8dd58983068f8a245d69afd8946443&_render=json&location=";
    var weather_jqxhr = $.get(weather_url + escape(location));
    var deferred = jQuery.Deferred();
    weather_jqxhr.success(function(data) {
      console.log(data);
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
      deferred.resolve(weather);
    });
    return deferred.promise();
  }
})(jQuery);