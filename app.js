// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const items = document.getElementById("items").value;

  try {
    await db.collection("orders").add({ name, phone, address, items, time: new Date() });
    document.getElementById("msg").innerText = "✅ Order Placed Successfully!";
    document.getElementById("orderForm").reset();
  } catch (err) {
    document.getElementById("msg").innerText = "❌ Error placing order.";
    console.error(err);
  }
});

// ✅ Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}
