const products = [
  {id:1,name:"Headphones",price:2000,category:"electronics",img:"https://picsum.photos/200?1"},
  {id:2,name:"Smart Watch",price:5000,category:"electronics",img:"https://picsum.photos/200?2"},
  {id:3,name:"Shoes",price:3000,category:"fashion",img:"https://picsum.photos/200?3"},
  {id:4,name:"Jacket",price:4000,category:"fashion",img:"https://picsum.photos/200?4"},
  {id:5,name:"Phone",price:15000,category:"electronics",img:"https://picsum.photos/200?5"},
  {id:6,name:"Bag",price:2500,category:"fashion",img:"https://picsum.photos/200?6"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list,containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = "";
  list.forEach(p=>{
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const el = document.getElementById("cart-count");
  if(el) el.innerText = cart.length;
}

function displayCart(){
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item,index)=>{
    total += item.price;
    container.innerHTML += `
      <div>
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${index})">Remove</button>
      </div>`;
  });

  totalEl.innerText = total;
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

if(document.getElementById("featured-products")){
  displayProducts(products.slice(0,4),"featured-products");
}

if(document.getElementById("product-list")){
  displayProducts(products,"product-list");
}

if(document.getElementById("cart-items")){
  displayCart();
}

updateCartCount();

// Checkout
const form = document.getElementById("checkout-form");
if(form){
  form.addEventListener("submit",function(e){
    e.preventDefault();
}


