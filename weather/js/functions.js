/* *************************************
*  Weather Site JavaScript Functions
************************************* */
console.log('My javascript is being read.');


//Calculate the wind Chil
function buildWC(speed,temp)
{
   const feelTemp = document.getElementById('feels');

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
function direction(direction)
{
    const wind = document.getElementById('wind');

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
        conditionW.includes('Rainy'))
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
    else (conditionW.includes('Snowy'))
    {
        return "Snow";
    }
}

//this function chenge the summary and picture
function changeSummary(condition)
{
    const cond = document.getElementById('condition');
    const img = document.getElementById('summary');
    const curWeather = document.getElementById('curWeather');
    
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



//wc call
let speed = 5;
let temp = 40;
buildWC(speed,temp);
//direction call
let directionW = "SW";
direction(directionW);
//condition call
let weather = "Wet Weather";
let condition = getCondition(weather);
console.log(condition);
//call change summary
changeSummary(condition);
//call convert meters
let meters = 461.55;
let feet = converMeters(meters);
// insert feet into html document
const elevation = document.getElementById('elevation');
elevation.innerHTML = feet;