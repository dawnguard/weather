// GLOBAL VARIABLES //
var icons = [
  'tornado',
  'storm-showers',
  'hurricane',
  'thunderstorm',
  'thunderstorm',
  'sleet',
  'rain-mix',
  'sleet',
  'sprinkle',
  'sprinkle',
  'raindrops',
  'raindrops',
  'raindrops',
  'snow',
  'snow',
  'snow-wind',
  'snow',
  'hail',
  'sleet',
  'dust',
  'fog',
  'smoke',
  'smog',
  'strong-wind',
  'windy',
  'thermometer-exterior',
  'cloudy',
  'night-cloudy-high',
  'day-cloudy-high',
  'night-cloudy-high',
  'day-cloudy-high',
  'night-clear',
  'day-sunny',
  'night-clear',
  'day-sunny',
  'rain-mix',
  'thermometer',
  'thunderstorm',
  'thunderstorm',
  'thunderstorm',
  'showers',
  'snow',
  'snow',
  'snow',
  'cloud',
  'storm-showers',
  'snow',
  'snow',
  'na'
]; // to be used in the loadWeather function
var temperature; // to be set in the loadWeather function
var tempUnit; // set below, to be used in the loadWeather function
var icon; // set in loadWeather, to be used in the loadButtons function
/////////////////////


// SETTING UP CELSIUS/FAHRENHEIT COOKIES //
if(localStorage.getItem('tempUnit'))
  tempUnit = localStorage.getItem('tempUnit');
else
  tempUnit = 'c';

if(tempUnit === 'c')
  $('button:contains("Celsius")').addClass("positive");
else
  $('button:contains("Fahrenheit")').addClass("positive");

///////////////////////////////////////////





loadLocalWeather();





function loadLocalWeather() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      loadWeather(position.coords.latitude+','+position.coords.longitude);
    });
  }
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    
    location: location,
    woeid: woeid,
    unit: tempUnit,
    success: function(weather) {
      temperature = weather.temp;
      
      html = '<h1><i class="wi wi-'+icons[weather.code]+'"></i>'+weather.temp+'&deg;'+weather.units.temp+'</h1>';
      html += '<h2>'+weather.city+', '+weather.region+'</h2>';
      $("#weather").html(html);
      
      icon = $("i")[0].outerHTML; // to be used in the loadWeather function
      loadButtons();
      setBackground(temperature); // set background according to the temperature (different backgrounds for low, medium, high temps)
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

function setBackground(tempy) {
  $('html').css({
    'background-repeat': 'no-repeat',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
    'min-height': '100%'
  });
  
  if(tempUnit === "c")
  {
    if (tempy > 30)
    {
      $("html").css('background-color', 'white');
      $("html").css('background-image', 'url(img/high.jpg)');
    }
    else if (tempy < 10)
    {
      $("html").css('background-color', 'white');
      $("html").css('background-image', 'url(img/low.jpg)');
    }
    else
    { 
      $("html").css('background-color', 'black');
      $("html").css('background-image', 'url(img/normal.jpg)');
      $("h1").css('color', '#fef');
      $("h2").css('color', '#fef');
    }
  }
  else 
  {
    if (tempy > 86)
    {
      $("html").css('background-color', 'white');
      $("html").css('background-image', 'url(img/high.jpg)');
    }
    else if (tempy < 50)
    {
      $("html").css('background-color', 'white');
      $("html").css('background-image', 'url(img/low.jpg)');
    }
    else
    { 
      $("html").css('background-color', 'black');
      $("html").css('background-image', 'url(img/normal.jpg)');
      $("h1").css('color', '#fef');
      $("h2").css('color', '#fef');
    }
  }
}

function loadButtons() {
  $('button').click(function() {
    if(!($(this).hasClass('positive')))
      {
        $('.positive').removeClass('positive');
        $(this).addClass('positive');


        
        if($(this).text() === "Fahrenheit")
          {
            tempUnit = 'f';
            localStorage.setItem('tempUnit', tempUnit);
            temperature = convertToF(temperature);
            $("h1").html(icon + temperature + '&deg;' +'F');
          }        
        else
          {
            tempUnit = 'c';
            localStorage.setItem('tempUnit', tempUnit);
            temperature = convertToC(temperature);
            $("h1").html(icon + temperature + '&deg;' + 'C');
          }
      }
  });
} 

function convertToF(celsius) {
  console.log(celsius);
  var fahrenheit;
  fahrenheit = (celsius * 9/5) + 32;
  return fahrenheit.toFixed();
}

function convertToC(fahrenheit) {
  console.log(fahrenheit);
  var celsius;
  celsius = (fahrenheit -32) * 5/9;
  return celsius.toFixed();
}