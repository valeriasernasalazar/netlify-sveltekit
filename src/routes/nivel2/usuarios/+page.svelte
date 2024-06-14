<script>
    import { db } from '../../../lib/firebase/firebase';
    import { collection, getDocs, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
    import { authStore } from '../../../store/store';
    import { onMount } from 'svelte';

    let users = [];
    let selectedEmail = '';
    let selectedUid = '';
    let user = null;
    let error = '';
    let isAdmin = false;
    let loading = true;
    let usersLoading = true;

    onMount(() => {
        authStore.subscribe(value => {
            user = value.user;
            if (user) {
                checkAdmin();
            } else {
                loading = false;
            }
        });
        fetchNonAdminUsers();
    });

    async function checkAdmin() {
        if (user) {
            try {
                const idTokenResult = await user.getIdTokenResult(true); // true forces token refresh
                if (idTokenResult.claims.admin) {
                    isAdmin = true;
                    console.log('Usuario es administrador');
                } else {
                    console.log('Usuario no es administrador');
                }
            } catch (error) {
                console.error('Error obteniendo las reclamaciones:', error);
            }
        } else {
            console.log('No hay usuario autenticado');
        }
        loading = false;
    }

    async function fetchNonAdminUsers() {
        usersLoading = true;
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            users = querySnapshot.docs
                .map(doc => {
                    const data = doc.data();
                    if (!data.role) {
                        data.role = 'usuario';
                        updateDoc(doc.ref, { role: 'usuario' });
                    }
                    console.log(`Usuario: ${data.email}, Rol: ${data.role}`);
                    return { id: doc.id, ...data };
                })
                .filter(user => user.role !== 'administrador')
                .map(user => ({ email: user.email, uid: user.id }));
            console.log('Usuarios no administradores:', users);
        } catch (error) {
            console.error('Error obteniendo usuarios no administradores:', error);
        }
        usersLoading = false;
    }

    async function makeAdmin() {
        error = '';
        if (!selectedUid) {
            error = 'Por favor, selecciona un correo electrónico válido.';
            return;
        }

        try {
            // Verifica si el documento del usuario existe
            const userRef = doc(db, 'users', selectedUid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                // Actualiza el rol en Firestore si el documento existe
                await updateDoc(userRef, { role: 'administrador' });
            } else {
                // Si no existe, crea un nuevo documento
                await setDoc(userRef, { email: selectedEmail, role: 'administrador' });
            }

            // Llama al servidor para establecer la reclamación personalizada
            const response = await fetch('http://localhost:3001/setAdminRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: selectedEmail })
            });

            if (response.ok) {
                alert('Usuario actualizado a administrador.');
                selectedEmail = '';
                selectedUid = '';
                await fetchNonAdminUsers(); // Actualiza la lista de usuarios no administradores
            } else {
                error = 'Hubo un error al actualizar el rol del usuario en el servidor.';
            }
        } catch (err) {
            console.error('Error actualizando el rol del usuario:', err);
            error = 'Hubo un error al actualizar el rol del usuario.';
        }
    }
</script>

<div class="admin-container">
    <h1>Modificar Usuarios</h1>
    {#if loading}
        <p>Cargando...</p>
    {:else}
        {#if isAdmin}
            <div>
                {#if usersLoading}
                    <p>Cargando usuarios...</p>
                {:else}
                    <select bind:value={selectedUid} on:change={e => selectedEmail = users.find(user => user.uid === e.target.value).email}>
                        <option value="" disabled selected>Selecciona un usuario</option>
                        {#each users as user}
                            <option value={user.uid}>{user.email}</option>
                        {/each}
                    </select>
                    <button on:click={makeAdmin}>Hacer Administrador</button>
                {/if}
                {#if error}
                    <p class="error">{error}</p>
                {/if}
            </div>
        {:else}
            <p>No tienes permisos para modificar usuarios.</p>
        {/if}
    {/if}
</div>

<style>
    .admin-container {
        padding: 1rem;
    }

    .error {
        color: red;
    }
</style>
