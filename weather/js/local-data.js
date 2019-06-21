let pageNav = document.getElementById('nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

let weatherURL = "/weather/js/weather.json";
function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let temp = g.Temp;
    let min = g.Low;
    let max = g.High;

    // Get the wind data 
    let wind = g.Wind;
    let direction = g.Direction;
    console.log(direction);
    let gust = g.Gusts;
    //Get elevation in meters
    let meters = g.Elevation;
    console.log(meters);
    // Get the current conditions
    let condition = g.Summary;

    // Get the hourly data 
    let hourData = g.Hourly;

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('city');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"
    
    // Set elevation
    let elevation = document.getElementById('elevation');
    elevation.innerHTML = converMeters(meters);
    

    // Set the temperature information
    let curTemp = document.getElementById("curTemp");
    curTemp.innerHTML = temp + "&deg; F";
    let maxTemp = document.getElementById("max");
    maxTemp.innerHTML = max + "&deg;";
    let minTemp = document.getElementById("min");
    minTemp.innerHTML = min + "&deg;";

    // Set the wind information
    let windInfo = document.getElementById("speed");
    windInfo.innerHTML = wind + "mph";
    let wDirection = document.getElementById("direction");
    wDirection.innerHTML = "Direction: " + direction;
    let wGusts = document.getElementById("gusts");
    wGusts.innerHTML = "Gusts: " + gust + "mph";
    //call direction
    Ddirection(direction);
  
    // call wind chil function
    buildWC(wind,temp);
    
    // Set the current conditions information
    let wCondition = document.getElementById("condition");
    wCondition.innerHTML = getCondition(condition);
    changeSummary(getCondition(condition));
    console.log(getCondition(condition));
    // Set the hourly temperature information
    let hTemp = document.getElementById("list-temp");
    // list of temps
    hTemp.innerHTML = buildHourlyData(nextHour, hourData);

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}
fetchData(weatherURL);