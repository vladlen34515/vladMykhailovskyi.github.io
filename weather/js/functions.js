/* *************************************
*  Weather Site JavaScript Functions
************************************* */
console.log('My javascript is being read.');


//Calculate the wind Chil
function buildWC(speed,temp)
{
   let feelTemp = document.getElementById('feels');

   //compute windchill
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   console.log(wc)
   //round number to integer
   wc = Math.floor(wc);
   //if chil is grater than temp return chill
   if(wc > temp)
   {
       wc = temp;
   }
   console.log(wc);
   // display feels like
   feelTemp.innerHTML = "Feels like " + wc + "&deg;F";
}

//this finction rotate the wind pointer
function Ddirection(direction)
{
    let wind = document.getElementById('wind');

    // check the direction
    switch(direction)
    {
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

//this function return a condition according to a key word
function getCondition(conditionW)
{
    //check the condition and return appropriate condition
    if (conditionW.includes('Wet') ||
        conditionW.includes('Rainy') ||
        conditionW.includes('Thunderstorms')||
        conditionW.includes('Rain'))
    {
       return "Rain";
    }
    else if (conditionW.includes('Cloudy') ||
             conditionW.includes('Overcast'))
    {
        return "Clouds";
    }
    else if (conditionW.includes('Clear') ||
             conditionW.includes('Sunny'))
    {
        return "Clear";
    }
    else if (conditionW.includes('Foggy'))
    {
        return "Fog";
    }
    else if(conditionW.includes('Snowy'))
    {
        return "Snow";
    }
}

//this function chenge the summary and picture
function changeSummary(condition)
{
    let cond = document.getElementById('condition');
    let img = document.getElementById('summary');
    let curWeather = document.getElementById('curWeather');
    
    switch(condition)
    {
        case 'Rain':
                img.setAttribute('class','rain');
                curWeather.setAttribute('class','rainL');
                cond.innerHTML = condition;
                break;
        case 'Fog':
                img.setAttribute('class','fog');
                curWeather.setAttribute('class','fogL');
                cond.innerHTML = condition;
                break;
        case 'Snow':
                img.setAttribute('class','snow');
                curWeather.setAttribute('class','snowL');
                cond.innerHTML = condition;
                break;
        case 'Clear':
                img.setAttribute('class','clear');
                curWeather.setAttribute('class','clearL');
                cond.innerHTML = condition;
                break;
        case 'Clouds':
                img.setAttribute('class','cloudy');
                curWeather.setAttribute('class','cloudyL');
                cond.innerHTML = condition;
                break;
        
    }
        
    
       
    
}
// this function convert feet to meters
function converMeters(meters)
{
    let feet = meters*3.2808;
    console.log(feet);
    feet = Math.floor(feet);
    console.log(feet);
    return feet;
}

// Convert, Format time to 12 hour format
function format_time(hour) {
    if(hour > 23){ 
     hour -= 24; 
    } 
    let amPM = (hour > 11) ? "pm" : "am"; 
    if(hour > 12) { 
     hour -= 12; 
    } 
    if(hour == 0) { 
     hour = "12"; 
    } 
    return hour + amPM;
   }

   // Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F |</li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>'+  format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F |</li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }
    let date = new Date(); 
    let nextHour = date.getHours() + 1;









