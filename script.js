const products=[
</div>`});
}

function addToCart(id){
const p=products.find(x=>x.id===id);
const e=cart.find(x=>x.id===id);
if(e)e.qty++;else cart.push({...p,qty:1});
localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
}

function updateCartCount(){
const el=document.getElementById("cart-count");
if(el)el.innerText=cart.reduce((a,b)=>a+b.qty,0);
}

function displayCart(){
const c=document.getElementById("cart-items");
const t=document.getElementById("total");
if(!c)return;
c.innerHTML="";let total=0;
cart.forEach((i,idx)=>{
total+=i.price*i.qty;
c.innerHTML+=`<div>${i.name} ₹${i.price} x ${i.qty}
<button onclick='changeQty(${idx},1)'>+</button>
<button onclick='changeQty(${idx},-1)'>-</button>
<button onclick='removeItem(${idx})'>X</button></div>`});
t.innerText=total;
}

function changeQty(i,v){cart[i].qty+=v;if(cart[i].qty<=0)cart.splice(i,1);localStorage.setItem("cart",JSON.stringify(cart));displayCart();updateCartCount();}
function removeItem(i){cart.splice(i,1);localStorage.setItem("cart",JSON.stringify(cart));displayCart();updateCartCount();}

// Filters
const priceFilter=document.getElementById("priceFilter");
if(priceFilter){
priceFilter.onchange=()=>{
let filtered=products;
if(priceFilter.value==="low")filtered=products.filter(p=>p.price<10000);
if(priceFilter.value==="high")filtered=products.filter(p=>p.price>10000);
displayProducts(filtered);
};}

// Search
const s=document.getElementById("searchBox");
if(s){s.oninput=()=>{displayProducts(products.filter(p=>p.name.toLowerCase().includes(s.value.toLowerCase())));};}

// Checkout
const f=document.getElementById("checkout-form");
if(f){
f.onsubmit=(e)=>{
e.preventDefault();
const id="ORD"+Math.floor(Math.random()*999999);
localStorage.setItem("order",JSON.stringify({id,cart}));
localStorage.removeItem("cart");
window.location="order.html";
};}

// Order page
const od=document.getElementById("order-details");
if(od){
const order=JSON.parse(localStorage.getItem("order"));
if(order){
od.innerHTML=`Order ID: ${order.id}<br>`+order.cart.map(i=>i.name+" x "+i.qty).join("<br>");
}
}

window.onload=()=>{document.getElementById("loader").style.display="none";};

if(document.getElementById("product-list")||document.getElementById("featured-products"))displayProducts();
if(document.getElementById("cart-items"))displayCart();
updateCartCount();



