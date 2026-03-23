let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart');
}

function loadCart() {
  let cartItems = document.getElementById('cart-items');
  let total = 0;
  if (!cartItems) return;

  cartItems.innerHTML = '';

  cart.forEach(item => {
    let div = document.createElement('div');
    div.textContent = item.name + ' - ₹' + item.price;
    cartItems.appendChild(div);
    total += item.price;
  });

  document.getElementById('total').textContent = 'Total: ₹' + total;
}

function placeOrder(event) {
  event.preventDefault();
  alert('Order placed successfully!');
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

loadCart();
