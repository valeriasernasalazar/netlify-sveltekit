import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getApps, initializeApp, getApp, deleteApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { w as writable } from "./index2.js";
var define_import_meta_env_default = { BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const firebaseConfig = {
  apiKey: define_import_meta_env_default.VITE_APIKEY,
  authDomain: define_import_meta_env_default.VITE_AUTH_DOMAIN,
  projectId: define_import_meta_env_default.VITE_PROJECT_ID,
  storageBucket: define_import_meta_env_default.VITE_STORAGE_BUCKET,
  messagingSenderId: define_import_meta_env_default.VITE_MESSAGING_SENDER_ID,
  appId: define_import_meta_env_default.VITE_APP_ID
};
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storedNombreCompleto = writable("");
const storedFechaNacimiento = writable("");
const storedUserEmail = writable("");
const authStore = writable({
  user: null,
  loading: true,
  data: {}
});
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Usuario autenticado:", user.email);
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.exists() ? userDoc.data() : {};
    console.log("Datos del usuario:", userData);
    authStore.set({
      user,
      loading: false,
      data: {
        email: user.email,
        role: userData.role || "mortal"
        // Set default role if not found
      }
    });
    storedUserEmail.set(user.email);
  } else {
    console.log("No hay usuario autenticado");
    authStore.set({
      user: null,
      loading: false,
      data: {}
    });
    storedUserEmail.set("");
  }
});
export {
  storedFechaNacimiento as a,
  storedUserEmail as b,
  storedNombreCompleto as s
};
