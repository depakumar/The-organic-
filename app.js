// Import Firebase v9 modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Aapka Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKK0SeO0n3o2QqG8xGgV0u64XIFSqWAi0",
  authDomain: "the-organics-a71b8.firebaseapp.com",
  projectId: "the-organics-a71b8",
  storageBucket: "the-organics-a71b8.firebasestorage.app",
  messagingSenderId: "627819861097",
  appId: "1:627819861097:web:69f791201c5b13bce43ef8",
  measurementId: "G-WBRYC0GBYK"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Form submit handler
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const items = document.getElementById("items").value;

  try {
    await addDoc(collection(db, "orders"), {
      name,
      phone,
      address,
      items,
      time: new Date()
    });

    document.getElementById("msg").innerText = "✅ Order Placed Successfully!";
    document.getElementById("orderForm").reset();

  } catch (err) {
    document.getElementById("msg").innerText = "❌ Error placing order.";
    console.error("Firestore Error:", err);
  }
});

// ✅ Service Worker register
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered ✅"))
    .catch(err => console.error("SW Registration Failed:", err));
}
