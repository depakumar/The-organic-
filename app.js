// Import Firebase Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKK0SeO0n3o2QqG8xGgV0u64XIFSqWAi0",
  authDomain: "the-organics-a71b8.firebaseapp.com",
  projectId: "the-organics-a71b8",
  storageBucket: "the-organics-a71b8.appspot.com",
  messagingSenderId: "627819861097",
  appId: "1:627819861097:web:69f791201c5b13bce43ef8",
  measurementId: "G-WBRYC0GBYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// PRODUCT LIST (+20% price)
// =========================
const products = [
  { name: "Fresh Sweet Matar", price: 200, category: "New Arrivals", image: "images/sweet-matar.jpg" },
  { name: "Sweet Potato", price: 120, category: "Tubers", image: "images/sweet-potato.jpg" },
  { name: "Suran", price: 150, category: "Tubers", image: "images/suran.jpg" },
  { name: "Fresh Iceberg Lettuce", price: 250, category: "Leafy", image: "images/iceberg.jpg" },
  { name: "Fresh Raw Banana", price: 60, category: "Fruits", image: "images/banana.jpg" },
  { name: "Banana Flower (Sunday Only)", price: 100, category: "New Arrivals", image: "images/banana-flower.jpg" },
  { name: "Zucchini / Red Cabbage", price: 250, category: "Exotic", image: "images/zucchini.jpg" },
  { name: "Fresh Basil", price: 50, category: "Exotic", image: "images/basil.jpg" },
  // Add all other products here
];

// Add 20% to price
products.forEach(p => p.price = Math.round(p.price * 1.2));

// =========================
// CART LOGIC
// =========================
let cart = [];

const productListEl = document.getElementById("productList");
const cartBtn = document.getElementById("cartBtn");
const cartCountEl = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const msgEl = document.getElementById("msg");

// Render products
function renderProducts(filter = "All") {
  productListEl.innerHTML = "";
  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);

  filtered.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productListEl.appendChild(card);
  });
}

// Listen to category filter
window.addEventListener('filterProducts', (e) => renderProducts(e.detail));

// Add to cart
window.addToCart = function(index) {
  const product = products[index];
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
};

// Update cart display
function updateCart() {
  cartCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price} × ${item.qty} 
      <button onclick="removeFromCart(${i})">❌</button>
    `;
    cartItemsEl.appendChild(li);
  });

  cartTotalEl.textContent = total;
}

// Remove from cart
window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCart();
};

// =========================
// CHECKOUT & FIREBASE SAVE
// =========================
checkoutBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
});

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    msgEl.innerText = "❌ Cart is empty!";
    msgEl.style.color = "red";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  try {
    await addDoc(collection(db, "Orders"), {
      name,
      phone,
      address,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
      createdAt: serverTimestamp()
    });

    msgEl.innerText = "✅ Order Placed Successfully!";
    msgEl.style.color = "green";
    checkoutForm.reset();
    cart = [];
    updateCart();
  } catch (error) {
    console.error("Error placing order:", error);
    msgEl.innerText = "❌ Error placing order.";
    msgEl.style.color = "red";
  }
});

// =========================
// MODALS
// =========================
cartBtn.addEventListener("click", () => cartModal.classList.remove("hidden"));
document.getElementById("closeCart").addEventListener("click", () => cartModal.classList.add("hidden"));
document.getElementById("closeCheckout").addEventListener("click", () => checkoutModal.classList.add("hidden"));

// Init
renderProducts();
