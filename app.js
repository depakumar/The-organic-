<script type="module">
  // Firebase SDKs import
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

  // Init Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Order submit function
  async function placeOrder(name, address, items) {
    try {
      await addDoc(collection(db, "Orders"), {
        name: name,
        address: address,
        items: items,
        createdAt: serverTimestamp()
      });
      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("❌ Error placing order");
    }
  }

  // Example: form submit
  document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const items = document.getElementById("items").value;

    await placeOrder(name, address, items);
  });
</script>
