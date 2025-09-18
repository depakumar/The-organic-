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

// ✅ Firebase initialize
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Order form submit
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const items = document.getElementById("items").value;

  try {
    await db.collection("orders").add({
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

// ✅ Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered ✅"))
    .catch(err => console.error("SW Registration Failed:", err));
}
