let URL = "/acme/js/acme.json";
fetchData(URL);
function fetchData(url)
{
    fetch(url)
    .then(function(response) {
        if(response.ok){
        return response.json();
        }
        throw new ERROR('Network response was not OK.');
        })
    .then(function(data)
    {
      console.log(data);
      let nav = document.getElementById("nav-list");
      nav.innerHTML += buildNav(data);
    })
    .catch(function(error){
        console.log('There was a fetch problem: ', error.message);
        statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
}
function buildNav(data)
{
    let item = "";
    let g = data;
    for (let i = 0; i < 4; i++)
    {
        item+= '<li><a>' + g.navigation.title[i] + '</a></li>';
    }
    console.log("Navigation list: ",item);
    return item;
}