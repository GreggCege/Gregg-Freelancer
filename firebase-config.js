import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// TODO: Reemplaza estos valores con los de tu proyecto en Firebase
// Vas a Firebase Console > Project Settings > General > Your apps (Web)
const firebaseConfig = {
  apiKey: "AIzaSyAgrffjVV7FQ8BX4sx797hqS4nHNvL-gl0",
  authDomain: "the-vault-48d35.firebaseapp.com",
  projectId: "the-vault-48d35",
  storageBucket: "the-vault-48d35.firebasestorage.app",
  messagingSenderId: "174203126122",
  appId: "1:174203126122:web:856a94c7f58a93956be513",
  measurementId: "G-9ZBN49SGZ1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
