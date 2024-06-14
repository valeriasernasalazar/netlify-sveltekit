import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../lib/firebase/firebase';
import { writable } from "svelte/store";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Writable stores to hold user information
export const storedNombreCompleto = writable('');
export const storedFechaNacimiento = writable('');
export const storedUserEmail = writable(''); 

// Writable store to hold authentication state
export const authStore = writable({
    user: null,
    loading: true,
    data: {}
});

// Handlers for authentication actions
export const authHandlers = {
    signup: async (email, pass) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        // Set default role to mortal
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
            email: user.email,
            role: 'mortal'  // Default role
        });
    },
    login: async (email, pass) => {
        console.log("Intentando iniciar sesión con:", email);
        await signInWithEmailAndPassword(auth, email, pass);
    },
    logout: async () => {
        try {
            await signOut(auth);
            console.log("Logout successful");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
};

// Listen for authentication state changes and update the store
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Usuario autenticado:", user.email);
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.exists() ? userDoc.data() : {};
        console.log("Datos del usuario:", userData);
        
        authStore.set({
            user: user,
            loading: false,
            data: {
                email: user.email,
                role: userData.role || 'mortal' // Set default role if not found
            }
        });
        storedUserEmail.set(user.email); // Update the stored email
    } else {
        console.log("No hay usuario autenticado");
        authStore.set({
            user: null,
            loading: false,
            data: {}
        });
        storedUserEmail.set(''); // Clear the stored email
    }
});
