<script>
    import { db } from '../../../lib/firebase/firebase';
    import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    import { authHandlers, storedNombreCompleto, storedFechaNacimiento } from '../../../store/store';
    import { authStore } from '../../../store/store';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let users = [];
    let selectedUid = '';
    let selectedDeleteUid = ''; // Para la eliminación de usuarios
    let newRole = ''; // Inicializar sin valor para mostrar la opción deshabilitada
    let user = null;
    let error = '';
    let isAdmin = false;
    let loading = true;
    let usersLoading = true;
    let password = ''; // Contraseña introducida por el usuario

    const rolesMapping = {
        'mortal': 'usuario',
        'nivel2': 'servicios',
        'admin': 'administrador'
    };

    const reverseRolesMapping = {
        'usuario': 'mortal',
        'servicios': 'nivel2',
        'administrador': 'admin'
    };

    onMount(() => {
        authStore.subscribe(value => {
            user = value.user;
            if (user) {
                checkAdmin();
            } else {
                loading = false;
            }
        });
        fetchUsers();
    });

    async function checkAdmin() {
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.role === 'admin') {
                    isAdmin = true;
                }
            }
        }
        loading = false;
    }

    async function fetchUsers() {
        usersLoading = true;
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            users = querySnapshot.docs.map(doc => {
                const data = doc.data();
                if (!data.role) {
                    data.role = 'mortal';
                    updateDoc(doc.ref, { role: 'mortal' });
                }
                data.role = rolesMapping[data.role] || data.role; // Mapear los roles para mostrarlos en el frontend
                return { id: doc.id, ...data };
            });
            console.log('Usuarios:', users);
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
        }
        usersLoading = false;
    }

    async function updateRole() {
        error = '';
        if (!selectedUid) {
            error = 'Por favor, selecciona un correo electrónico válido.';
            return;
        }

        if (!newRole) {
            error = 'Por favor, selecciona un nuevo nivel.';
            return;
        }

        try {
            const userRef = doc(db, 'users', selectedUid);
            const docSnap = await getDoc(userRef);
            const selectedUser = users.find(user => user.id === selectedUid);

            const backendRole = reverseRolesMapping[newRole]; // Convertir el rol del frontend al backend

            if (docSnap.exists()) {
                await updateDoc(userRef, { role: backendRole });
            } else {
                await setDoc(userRef, { email: selectedUser.email, role: backendRole });
            }

            const roleEndpoint = {
                'mortal': 'setMortalRole',
                'nivel2': 'setNivel2Role',
                'admin': 'setAdminRole'
            };

            const response = await fetch(`http://localhost:3001/${roleEndpoint[backendRole]}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: selectedUser.email })
            });

            if (response.ok) {
                alert(`Usuario actualizado a ${newRole}.`);
                selectedUid = '';
                newRole = '';
                await fetchUsers();
            } else {
                error = 'Hubo un error al actualizar el rol del usuario en el servidor.';
            }
        } catch (err) {
            console.error('Error actualizando el rol del usuario:', err);
            error = 'Hubo un error al actualizar el rol del usuario.';
        }
    }

    async function deleteUser() {
        // Verificar la contraseña
        if (password !== import.meta.env.VITE_REGISTRATION_PASSWORD) {
            alert('Contraseña incorrecta.');
            return;
        }

        try {
            // Eliminar de Firestore
            await deleteDoc(doc(db, 'users', selectedDeleteUid));

            // Eliminar de Firebase Authentication
            const response = await fetch(`http://localhost:3001/deleteUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid: selectedDeleteUid })
            });

            if (response.ok) {
                alert('Usuario eliminado exitosamente.');
                selectedDeleteUid = '';
                await fetchUsers(); // Actualizar la lista de usuarios
            } else {
                alert('Hubo un error al eliminar el usuario de la autenticación.');
            }
        } catch (err) {
            console.error('Error eliminando el usuario:', err);
            alert('Hubo un error al eliminar el usuario.');
        } finally {
            password = ''; // Restablecer el campo de contraseña
        }
    }
</script>

<div class="Mc">
    <div class="Hc">
        <div class="hB">
            <button on:click={() => goto('/admin')}>
                <i class="fa-solid fa-arrow-left"></i>
                <p>Inicio</p>
            </button>
            <button on:click={async () => {
                await authHandlers.logout();
                goto('/');
            }}>
                <i class="fa-solid fa-right-from-bracket"></i>
                <p>Cerrar Sesión</p>
            </button>
        </div>
    </div>
</div>

<div class="main-container">
    <div class="admin-container">
        <div class="form-group-section">
            <h1>Modificar Usuarios</h1>
            {#if loading}
                <p>Cargando...</p>
            {:else}
                {#if isAdmin}
                    <div class="form-group">
                        {#if usersLoading}
                            <p>Cargando usuarios...</p>
                        {:else}
                            <select bind:value={selectedUid} class="input-field">
                                <option value="" disabled selected>Selecciona un usuario</option>
                                {#each users as user}
                                    <option value={user.id}>{user.email} ({user.role})</option>
                                {/each}
                            </select>
                            <select bind:value={newRole} class="input-field">
                                <option value="" disabled selected>Selecciona el nuevo nivel</option>
                                <option value="usuario">Usuario (Nivel 1)</option>
                                <option value="servicios">Servicios (Nivel 2)</option>
                                <option value="administrador">Administrador (Nivel 3)</option>
                            </select>
                            <button on:click={updateRole} class="submit-btn">Actualizar Rol</button>
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

        <div class="form-group-section">
            <h1>Eliminar Usuarios</h1>
            {#if usersLoading}
                <p>Cargando usuarios...</p>
            {:else}
                <div class="form-group">
                    <select bind:value={selectedDeleteUid} class="input-field">
                        <option value="" disabled selected>Selecciona un usuario</option>
                        {#each users.filter(u => user && u.id !== user.uid) as user}
                            <option value={user.id}>{user.email}</option>
                        {/each}
                    </select>
                    <input type="password" bind:value={password} placeholder="Contraseña" class="input-field">
                    <button on:click={deleteUser} class="delete-btn">Eliminar Usuario</button>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .Mc {
        display: flex;
        flex-direction: column;
        min-height: 10vh;
        gap: 24px;
        padding: 24px;
        width: 26%;
        max-width: 1000px;
        margin: 0 auto;
        margin-right: 10%;
        font-size: 13px;
    }

    .hB button {
        background: #d93443;
        color: white;
        padding: 15px 15px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .hB button:hover {
        opacity: 0.7;
        background-color: #fa6a02;
        cursor: pointer;
    }

    .hB {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        color: #333;
        padding: 20px;
    }

    .admin-container {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
        text-align: center;
        margin-top: -100px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .form-group-section {
        background: #f9f9f9;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 20px;
    }

    .input-field {
        padding: 0.75rem;
        border: 1px solid #d93443;
        border-radius: 5px;
        font-size: 1rem;
        width: 100%;
    }

    .submit-btn {
        background: #d93443;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .delete-btn {
        background: #d93443;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .submit-btn:hover, .delete-btn:hover {
        background: #fa6a02;
    }

    .error {
        color: red;
        font-size: 0.9rem;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #333;
    }

    p {
        font-size: 1rem;
    }
</style>
