/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */
console.log('My javascript is being read.');

var storage = window.localStorage;
var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project - youremailhere@byui.edu"
    }
};

//Calculate the wind Chil
function buildWC(speed, temp) {
    let feelTemp = document.getElementById('feels');
    speed = speed.split(" ");
    //compute windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed[0], 0.16) + 0.4275 * temp * Math.pow(speed[0], 0.16);
    console.log(wc)
    //round number to integer
    wc = Math.floor(wc);
    //if chil is grater than temp return chill
    if (wc > temp) {
        wc = temp;
    }
    
    console.log(wc);
    console.log ("Speed: " + speed);
    // display feels like
    feelTemp.innerHTML = "Feels like " + wc + "&deg; F";
}

//this finction rotate the wind pointer
function Ddirection(direction) {
    let wind = document.getElementById('wind');

    // check the direction
    switch (direction) {
        case "North":
        case "N":
            wind.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            wind.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            wind.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            wind.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            wind.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            wind.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            wind.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            wind.setAttribute("class", "w");
            break;
    }

}

function toFor(cel)
{
    let foren = cel * 9 / 5 + 32;
    foren = Math.floor(foren);
    console.log(foren);
    return foren; 
}

//this function return a condition according to a key word
function getCondition(conditionW) {
    //check the condition and return appropriate condition
    if (conditionW.includes('Wet') ||
        conditionW.includes('Rainy') ||
        conditionW.includes('Thunderstorms') ||
        conditionW.includes('Rain')) {
        return "Rain";
    } else if (conditionW.includes('Cloudy') ||
        conditionW.includes('Overcast')) {
        return "Clouds";
    } else if (conditionW.includes('Clear') ||
        conditionW.includes('Sunny')) {
        return "Clear";
    } else if (conditionW.includes('Foggy')) {
        return "Fog";
    } else if (conditionW.includes('Snowy')) {
        return "Snow";
    }
}

//this function chenge the summary and picture
function changeSummary(condition) {
    let cond = document.getElementById('condition');
    let img = document.getElementById('summary');
    let curWeather = document.getElementById('curWeather');

    switch (condition) {
        case 'Rain':
            img.setAttribute('class', 'rain');
            curWeather.setAttribute('class', 'rainL');
            cond.innerHTML = condition;
            break;
        case 'Fog':
            img.setAttribute('class', 'fog');
            curWeather.setAttribute('class', 'fogL');
            cond.innerHTML = condition;
            break;
        case 'Snow':
            img.setAttribute('class', 'snow');
            curWeather.setAttribute('class', 'snowL');
            cond.innerHTML = condition;
            break;
        case 'Clear':
            img.setAttribute('class', 'clear');
            curWeather.setAttribute('class', 'clearL');
            cond.innerHTML = condition;
            break;
        case 'Clouds':
            img.setAttribute('class', 'cloudy');
            curWeather.setAttribute('class', 'cloudyL');
            cond.innerHTML = condition;
            break;

    }




}
// this function convert feet to meters
function converMeters(meters) {
    let feet = meters * 3.2808;
    console.log(feet);
    feet = Math.floor(feet);
    console.log(feet);
    return feet;
}

// Convert, Format time to 12 hour format
function format_time(hour) {
    if (hour > 23) {
        hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
        hour -= 12;
    }
    if (hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F |</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F |</li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}

let date = new Date();
let nextHour = date.getHours() + 1;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
     const lat = position.coords.latitude;
     const long = position.coords.longitude;
  
     storage.setItem("lat",lat);
     storage.setItem("long",long);
     // Combine the values
     
     const locale = lat  + "," + long;
     getLocation(locale);
     console.log(`Lat and Long are: ${locale}.`);
     storage.setItem("location",locale);
  
  
    })
   } else {
    status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   }
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations;
      let hourlyData = data.properties.forecastHourly; 
      let forcast = data.properties.forecast;
      // Call the function to get the list of weather stations
       getStationId(stationsURL); 
       getHourly(hourlyData);
       getTemp(forcast);
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function
   // Call getLocation function, send locale
   

  // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
 // NWS User-Agent header (built above) will be the second parameter 
 fetch(stationsURL, idHeader) 
 .then(function(response){
   if(response.ok){ 
    return response.json(); 
   } 
   throw new ERROR('Response not OK.');
 })
 .then(function (data) { 
   // Let's see what we got back
   console.log('From getStationId function:'); 
   console.log(data);
 
   // Store station ID and elevation (in meters - will need to be converted to feet) 
   let stationId = data.features[0].properties.stationIdentifier; 
   let stationElevation = data.features[0].properties.elevation.value; 
   console.log('Station and Elevation are: ' + stationId, stationElevation); 

   // Store data to localstorage 
   storage.setItem("stationId", stationId); 
   storage.setItem("stationElevation", stationElevation); 

   // Request the Current Weather for this station 
   getWeather(stationId);
  }) 
 .catch(error => console.log('There was a getStationId error: ', error)) 
}

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      let temp = data.properties.temperature.value;
      storage.setItem("Temp", temp);
      let condition = data.properties.textDescription;
      storage.setItem("condition",condition);
   
      // Build the page for viewing 
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   }


function getHourly(URL) {
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getHourly function:');
            console.log(data);

            // Store weather information to localStorage 
            let hour = [];
            for (let i = 0; i < 14; i++)
            {
              hour[i] = data.properties.periods[i].temperature;  
            }
           storage.setItem("hourly", buildHourlyData(nextHour, hour));



            // Build the page for viewing 

        })
        .catch(error => console.log('There was a getWeather error: ', error))
}

function getTemp(URL)
{
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getForcast function:');
            console.log(data);

            // Store weather information to localStorage 
            
           let max = data.properties.periods[0].temperature;
           let min = data.properties.periods[1].temperature;
           let wSpeed = data.properties.periods[0].windSpeed;
           let gusts =  data.properties.periods[0].windSpeed;
           let direction = data.properties.periods[0].windDirection;
           let detF = data.properties.periods[0].detailedForecast;

           storage.setItem("minTemp",min);
           storage.setItem("maxTemp",max);
           storage.setItem("wSpeed",wSpeed);
           storage.setItem("gusts",gusts);
           storage.setItem("direction", direction);
           storage.setItem("detF", detF);

            // Build the page for viewing 
            buildPage();
        })
        .catch(error => console.log('There was a getWeather error: ', error))
}
// This function builds a page.
function buildPage()
{
    let speed = document.getElementById("speed");
    speed.innerHTML = storage.getItem("wSpeed");

    let loc = document.getElementById("loc");
    loc.innerHTML = Math.round(100*storage.getItem("lat"))/100 
    + "&deg; N, " + Math.round(100*storage.getItem("long"))/100 + "&deg; W";

    let elev = document.getElementById("elevation");
    elev.innerHTML = converMeters(storage.getItem("stationElevation"));
    let min = document.getElementById("min");
    min.innerHTML = storage.getItem("minTemp") + "&deg;";
    
    let max = document.getElementById("max");
    max.innerHTML = storage.getItem("maxTemp") + "&deg;";
    
    let foren = toFor(storage.getItem("Temp"));
    let temp = document.getElementById("curTemp");
    temp.innerHTML = foren + "&deg; F";
    
    let wGusts = document.getElementById("gusts");
    wGusts.innerHTML = "Gusts: " + storage.getItem("gusts");
    
    let contentContainer = document.getElementById('main-content');
    let statusContainer = document.getElementById('status');
    let hTemp = document.getElementById("list-temp");
    let wCondition = document.getElementById("condition");
    
    wCondition.innerHTML = getCondition(storage.getItem("condition"));
    changeSummary(getCondition(storage.getItem("condition")));
    
    let contentHeading = document.getElementById('city');
    contentHeading.innerHTML = storage.getItem("locName") + ", " + storage.getItem("locState");
    
    let title = document.getElementById("title");
    title.innerHTML = storage.getItem("locName") + ", " + storage.getItem("locState") + " | Weather Site";

    let wDirection = document.getElementById("direction");
    wDirection.innerHTML = "Direction: " + storage.getItem("direction");

    let detail = document.getElementById("detail");
    detail.innerHTML = storage.getItem("detF");

    Ddirection(storage.getItem("direction"));

    buildWC(storage.getItem("wSpeed"),foren);
    // list of temps
    hTemp.innerHTML = storage.getItem("hourly");
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide');
}

