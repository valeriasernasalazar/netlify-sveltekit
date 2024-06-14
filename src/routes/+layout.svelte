<script>
    import { onMount } from 'svelte';
    import { auth, db } from '../lib/firebase/firebase';
    import { getDoc, doc, setDoc } from 'firebase/firestore';
    import { authStore } from '../store/store';
    import { goto } from '$app/navigation';

    const nonAuthRoutes = ['/'];

    async function getUserRole(uid) {
        console.log("Obteniendo rol del usuario con UID:", uid);
        const userRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userRef);
        console.log("Documento Firestore existe:", docSnap.exists());
        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("Datos del documento Firestore:", userData);
            return userData.role;
        }
        return 'mortal';
    }

    async function isUserAuthorized(user, currentPath) {
        if (!user) return false;
        const role = await getUserRole(user.uid);
        console.log(`Rol del usuario encontrado: ${role}`);
        if (currentPath.startsWith('/admin') && role !== 'admin') {
            return false;
        }
        if (currentPath.startsWith('/nivel2') && role === 'mortal') {
            return false;
        }
        return true;
    }

    onMount(() => {
        console.log("Montando layout");
        const unsubscribe = auth.onAuthStateChanged(async user => {
            const currentPath = window.location.pathname;

            if (!user && !nonAuthRoutes.includes(currentPath)) {
                goto("/");
                return;
            }

            if (user && currentPath === '/') {
                const role = await getUserRole(user.uid);
                if (role === 'admin') {
                    goto("/admin");
                } else if (role === 'nivel2') {
                    goto("/nivel2");
                } else {
                    goto("/mortal");
                }
                return;
            }

            if (user && !await isUserAuthorized(user, currentPath)) {
                goto("/");
                return;
            }

            if (!user) {
                return;
            }

            let dataToSetToStore;

            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                const userRef = doc(db, 'users', user.uid);

                dataToSetToStore = {
                    email: user.email,
                    todos: [],
                    role: 'mortal'
                };

                await setDoc(userRef, dataToSetToStore, { merge: true });
            } else {
                console.log("Fetching User");
                const userData = docSnap.data();
                dataToSetToStore = userData;
            }

            authStore.update((curr) => {
                return {
                    ...curr,
                    user,
                    data: dataToSetToStore,
                    loading: false
                };
            });
        });

        return () => unsubscribe();
    });
</script>

<div class="mainContainer">
    <slot />
</div>

<style>
    .mainContainer {
        min-height: 100vh;
        background: rgb(197, 197, 197);
        color: black;
        position: relative;
        display: flex;
        flex-direction: column;
    }
</style>
