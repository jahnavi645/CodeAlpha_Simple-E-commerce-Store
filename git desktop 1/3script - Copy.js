const API = "http://localhost:5000/api";
let cart = [];

// 1. Fetch and Display Products
async function loadProducts() {
    const res = await fetch(`${API}/products`);
    const products = await res.json();
    const container = document.getElementById('product-list');
    
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" width="100">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p><strong>$${p.price}</strong></p>
            <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
        </div>
    `).join('');
}

// 2. Shopping Cart Logic
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cart-items');
    list.innerHTML = cart.map(item => `<li>${item.name} - $${item.price}</li>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = total;
}

// 3. User Login
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(data.token) {
        localStorage.setItem('token', data.token);
        alert("Logged in!");
        location.reload();
    }
}

// 4. Order Processing
async function processOrder() {
    if(!localStorage.getItem('token')) return alert("Please login first!");
    if(cart.length === 0) return alert("Cart is empty!");

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    await fetch(`${API}/orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ items: cart, total })
    });
    alert("Order Successful!");
    cart = [];
    updateCartUI();
}

loadProducts();