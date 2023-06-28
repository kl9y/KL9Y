
function changeImage(imageURL) {
    document.getElementById("productImage").src = imageURL;
}

function renderNav(){
    document.write(`
    
    <nav>
    <div class="navbar">
      <div class="container nav-container">
          <input class="checkbox" type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>  
        <div class="menu-items">
          <li><a href="https://kl9y.com/">Home</a></li>
          <li><a href="https://kl9y.com/LimitlessPotential">New Releases</a></li>
          <li><a href="https://kl9y.com/about">About Us</a></li>
          <li><a href="https://kl9y.com/contact">Contact</a></li>
        </div>
      </div>
    </div>
  </nav>

<div class="navBar" style="text-align: center; padding-top: 40px; padding-bottom: 40px;">
    <nav>
        <ul style="list-style-type: none; margin: 0; padding: 0; display: inline-block;">
            <li style="display: inline;">
                <a class="navElem" href="https://kl9y.com/">Shop All</a>
            </li>
            <li style="display: inline;">
                <a class="navElem">|</a>
            </li>
            <li class="dropdown1">
                <a class="navElem">New Releases</a>
                <div class="dropdown-content">
                    <a href="https://kl9y.com/LimitlessPotential">Limitless Potential</a>
                </div>
            </li>
            <li style="display: inline;">
                <a class="navElem">|</a>
            </li>
            <li style="display: inline;">
                <a class="navElem" href="https://kl9y.com/about">About Us</a>
            </li>
            <li style="display: inline;">
                <a class="navElem">|</a>
            </li>
            <li class="dropdown1">
                <a class="navElem" href="https://kl9y.com/contact">Contact</a>
            </li>
        </ul>
    </nav>
 </div>
 `);
}


function updateBuyNowLink(newURL, updatedIMG) {
    var buyNowBtn = document.getElementById('buyNowBtn');
    buyNowBtn.setAttribute('onclick', newURL);
    changeImage(updatedIMG);
  }


function changeImageHover(element, imagePath) {
    element.src = imagePath;
  }
function sizing(){
    document.write(`
    <div class="sizing-dropdownmenu">
      <div class="sizing-container">
      <p class="sizing-txt">Sizing</p>
          <input class="checkbox1" type="checkbox" name="" id="" />
          <div class="sizing-lines1">
          </div>  
        <div class="menu-items1">
        <li class="sizing-li"><img class="prod" src="../imgs/products/9y-hoodie/sizing-chart(9YHoodie).png" ></img></li>
        </div>
      </div>
    </div>
    `);
}


function sizingChange(){
  var elements = document.getElementsByClassName("sizingKlay");
  var button = document.getElementById("toggleButton");
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].style.display === "none" || elements[i].style.display === "") {
      elements[i].style.display = "block";
      button.textContent = "˄ SIZE GUIDE";
    } else {
      elements[i].style.display = "none";
      button.textContent = "˅ SIZE GUIDE";
    }
  }
}


function addToCart(imgUrl, prodId){
  let itemsStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
  var priceText = document.querySelector('.priceText');
  var price = priceText.textContent.trim();

  var h1Tag = document.querySelector('h1'); 
  var itemName = h1Tag.textContent.trim();


  itemsStorage.push([imgUrl,prodId,price, itemName]);
  localStorage.setItem("items", JSON.stringify(itemsStorage));
  location.replace("https://kl9y.com/cart");
}

function removeFromCart(imgUrl, prodId, price, itemName){
  let itemsStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
  
  const index = itemsStorage.indexOf([imgUrl,prodId,price,itemName]);
  let tupleIndex = itemsStorage.findIndex((tuple) => JSON.stringify(tuple) === JSON.stringify([imgUrl,prodId,price,itemName]));
  console.log(tupleIndex);

  if (tupleIndex > -1) {
    itemsStorage.splice(tupleIndex, 1);
    localStorage.setItem("items", JSON.stringify(itemsStorage));
}

    location.reload();

}

function showCart(){
  let itemsStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

  itemsStorage.forEach((note) =>{
    document.write(`<div class="cartRow">
    <img class="cartImg" src="${note[0]}">
    <p class="cartItemName">${note[3]}</p>
    <p class="cartPrice">${note[2]}</p>
    <button class="cartRemoveBtn" onclick="removeFromCart('${note[0]}', '${note[1]}', '${note[2]}', '${note[3]}')">X</button>
</div>`);
    console.log(note[0]);
  })
}

function totalCart(){
  let itemsStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
  let tempNum=0;
  itemsStorage.forEach(() =>{
    tempNum++;
  })
  if(tempNum == 0){
    document.write(`<p class="cartTotal"></p> `);
  }
  else{
    document.write(`<p class="cartTotal">${tempNum}</p> `);
  }
  
}



async function emptyReq(stripeIds){
  await fetch('https://kl9y.onrender.com/checkout', {
      method: 'POST', 
      headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify( {items: stripeIds}),
          }).then((response) => {
            console.log("response.url2");
            return response.json();
              }).then((response) => {
                  console.log("response.url");
                  if(response.url){
                  console.log(response.url);
                  window.location.assign(response.url);
                }});
}


function makeInitReq(){
  var now = new Date().getTime();
  let latestReq = localStorage.getItem("time")
  ? JSON.parse(localStorage.getItem("time"))
  : "";
  if(latestReq ==""){
    emptyReq([]);
    localStorage.setItem("time", JSON.stringify(now));
  }
  else{
    var storedDate = new Date(parseInt(latestReq)).getTime();
    var distance = now - storedDate;
    var daysSince= Math.floor(distance / (1000 * 60 * 60 * 24));
    var hoursSince=Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minsSince=Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if(daysSince > 0 || hoursSince > 0 || minsSince > 20){
      //make a request
      //update stored time to current
      emptyReq([]);
      localStorage.setItem("time", JSON.stringify(now));
    }
    else{
      console.log("");
    }
    
  }
}

async function checkout(){
  let itemsStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
  let stripeIds = [];
  itemsStorage.forEach((item) =>{
    stripeIds.push({id: item[1], quantity: 1});
  }
  )
  if(stripeIds.length > 0){
    let loadingAnimation = document.getElementById('loadingAnimation');
    loadingAnimation.style.display = 'block'; // Show the loading animation

    console.log('STRIPE REQ');
    console.log(stripeIds);
    await fetch('https://kl9y.onrender.com/checkout', {
      method: 'POST', 
      headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify( {items: stripeIds}),
          }).then((response) => {
            return response.json();
              }).then((response) => {
                  if(response.url){
                  loadingAnimation.style.display = 'block';
                  localStorage.setItem("orderPlaced", "110");
                  window.location.assign(response.url);
                }
                else{
                  //error occurred making link
                  loadingAnimation.style.display = 'none';
                }
              
              });
  }
  else{
    console.log("");
  }
}


function showOrder(){

  let orderPlacedId = localStorage.getItem("orderPlaced")
  ? JSON.parse(localStorage.getItem("orderPlaced"))
  : "771";

  let itemsStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

  itemsStorage.forEach((note) =>{
    document.write(`<div class="cartRow">
    <img class="cartImg" src="${note[0]}">
    <p class="cartItemName">${note[3]}</p>
    <p class="cartPrice">${note[2]}</p>
    
</div>`);
    console.log(note[0]);
  })
}


async function successOrder(){
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");

  await fetch('https://kl9y.onrender.com/success', {
      method: 'POST', 
      headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify( {items: stripeIds}),
          }).then((response) => {
            return response.json();
              }).then((response) => {
                  if(response.url){
                  loadingAnimation.style.display = 'block';
                  localStorage.setItem("orderPlaced", "110");
                  window.location.assign(response.url);
                }
              
              
              });
}
