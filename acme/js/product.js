let nav = document.getElementById("nav-bar");
let content = document.getElementById("content");
let product = document.getElementById("productS");
let productURL = "/acme/js/acme.json"
let defaultTitle = document.title;


nav.addEventListener("click", function(evt)
{
    let productName = evt.target.innerHTML;
    console.log(productName);

    switch (productName) {
      case "Anvils":
        case "Explosives":
          case "Decoys":
              case "Traps":
               evt.preventDefault();
                break;
      case "Home":
        document.title = defaultTitle;
        content.setAttribute("class", '');
        product.setAttribute('class','hide');
        break;
    
     
    }
    fetchProduct(productURL);

    function fetchProduct(productURL)
    {
        fetch(productURL)
    .then(function(response) {
        if(response.ok){
        return response.json();
        }
        throw new ERROR('Network response was not OK.');
        })
    .then(function(data)
    {
      let g = data[productName];
    // getting the data
      let name = g.name;
      let img = g.path;
      let description = g.description;
      let price = g.price;
      let man = g.manufacturer;
      let rev = g.reviews;
      // putting data
      document.title = name;
      let text = document.getElementById("p-descr");
      text.innerHTML = description;
      let picture = document.getElementById("insert");
      picture.innerHTML = buildImg(img);
      let title = document.getElementById("p-title");
      title.innerHTML = name;
      let manuf = document.getElementById("man");
      manuf.innerHTML = man;
      let reviews = document.getElementById("rev");
      reviews.innerHTML = rev;
      let p = document.getElementById("price");
      p.innerHTML = price;
      




      content.setAttribute("class", "hide");
      product.setAttribute("class", "");
    })
    }
    
})
function buildImg(path)
{
   let tag = "<img id='product' src=" + "'" + path + "'" +" " + "alt='product'>";
   console.log(tag);
   return tag;
}