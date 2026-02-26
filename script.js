function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  let cart = getCart();
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert("Added to cart!");
}

function updateCartCount() {
  let cart = getCart();
  let count = cart.reduce((total, item) => total + item.quantity, 0);
  let countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = count;
}

function loadCart() {
  let cart = getCart();
  let cartItems = document.getElementById("cart-items");
  let total = 0;

  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="product-card">
        <h3>${item.name}</h3>
        <p>R${item.price} x ${item.quantity}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = total;
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
  updateCartCount();
}

updateCartCount();
loadCart();