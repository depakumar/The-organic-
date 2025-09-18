// Import Firebase modular SDK
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

// Initialize app & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const items = document.getElementById("items").value.trim();
  const msgEl = document.getElementById("msg");

  if (!name || !phone || !address || !items) {
    msgEl.innerText = "Please fill all fields";
    return;
  }

  try {
    await addDoc(collection(db, "Orders"), {
      name,
      phone,
      address,
      items,
      createdAt: serverTimestamp()
    });
    msgEl.innerText = "✅ Order Placed Successfully!";
    msgEl.style.color = "green";
    document.getElementById("orderForm").reset();
  } catch (error) {
    console.error("Error placing order:", error);
    msgEl.innerText = "❌ Error placing order. Check console.";
    msgEl.style.color = "red";
  }
});
