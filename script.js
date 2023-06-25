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

  itemsStorage.push([imgUrl,prodId]);
  localStorage.setItem("items", JSON.stringify(itemsStorage));
}

function removeFromCart(imgUrl, prodId){
  let itemsStorage = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
  
  const index = itemsStorage.indexOf([imgUrl,prodId]);
  let tupleIndex = itemsStorage.findIndex((tuple) => JSON.stringify(tuple) === JSON.stringify([imgUrl,prodId]));
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
    document.write(`<div> <img src="${note[0]}"> <button onclick=" removeFromCart('${note[0]}', '${note[1]}') ">REMOVE THIS ITEM</button> </div> `);
    console.log(note[0]);
  })
  

}

function totalCart(){
  console.log("here");
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