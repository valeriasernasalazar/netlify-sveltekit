import { c as create_ssr_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/store.js";
import "firebase/firestore";
import "firebase/auth";
import "../../../../chunks/client.js";
const css = {
  code: ".Mc.svelte-14yiauo.svelte-14yiauo{display:flex;flex-direction:column;min-height:10vh;gap:24px;padding:24px;width:26%;max-width:1000px;margin:0 auto;margin-right:10%;font-size:13px}.hB.svelte-14yiauo button.svelte-14yiauo{background:#d93443;color:white;padding:15px 15px;border:none;border-radius:4px;font-weight:700;display:flex;align-items:center;gap:4px}.hB.svelte-14yiauo button.svelte-14yiauo:hover{opacity:0.7;background-color:#fa6a02;cursor:pointer}.hB.svelte-14yiauo.svelte-14yiauo{display:flex;align-items:center;gap:10px}.main-container.svelte-14yiauo.svelte-14yiauo{display:flex;justify-content:center;align-items:center;min-height:100vh;color:#333;padding:20px}.admin-container.svelte-14yiauo.svelte-14yiauo{background:white;padding:2rem;border-radius:10px;box-shadow:0 2px 10px rgba(0, 0, 0, 0.1);width:100%;max-width:600px;text-align:center;margin-top:-100px;display:flex;flex-direction:column;gap:2rem}.form-group-section.svelte-14yiauo.svelte-14yiauo{background:#f9f9f9;padding:1.5rem;border-radius:10px;box-shadow:0 1px 5px rgba(0, 0, 0, 0.1)}.form-group.svelte-14yiauo.svelte-14yiauo{display:flex;flex-direction:column;gap:1rem;margin-bottom:20px}.input-field.svelte-14yiauo.svelte-14yiauo{padding:0.75rem;border:1px solid #d93443;border-radius:5px;font-size:1rem;width:100%}.submit-btn.svelte-14yiauo.svelte-14yiauo{background:#d93443;color:white;border:none;padding:0.75rem 1.5rem;border-radius:5px;font-size:1rem;cursor:pointer;transition:background-color 0.3s}.delete-btn.svelte-14yiauo.svelte-14yiauo{background:#d93443;color:white;border:none;padding:0.75rem 1.5rem;border-radius:5px;font-size:1rem;cursor:pointer;transition:background-color 0.3s}.submit-btn.svelte-14yiauo.svelte-14yiauo:hover,.delete-btn.svelte-14yiauo.svelte-14yiauo:hover{background:#fa6a02}.error.svelte-14yiauo.svelte-14yiauo{color:red;font-size:0.9rem}h1.svelte-14yiauo.svelte-14yiauo{font-size:1.5rem;margin-bottom:1rem;color:#333}p.svelte-14yiauo.svelte-14yiauo{font-size:1rem}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import { db } from '../../../lib/firebase/firebase';\\n    import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';\\n    import { getAuth } from 'firebase/auth';\\n    import { authHandlers, storedNombreCompleto, storedFechaNacimiento } from '../../../store/store';\\n    import { authStore } from '../../../store/store';\\n    import { onMount } from 'svelte';\\n    import { goto } from '$app/navigation';\\n\\n    let users = [];\\n    let selectedUid = '';\\n    let selectedDeleteUid = ''; // Para la eliminación de usuarios\\n    let newRole = ''; // Inicializar sin valor para mostrar la opción deshabilitada\\n    let user = null;\\n    let error = '';\\n    let isAdmin = false;\\n    let loading = true;\\n    let usersLoading = true;\\n    let password = ''; // Contraseña introducida por el usuario\\n\\n    const rolesMapping = {\\n        'mortal': 'usuario',\\n        'nivel2': 'servicios',\\n        'admin': 'administrador'\\n    };\\n\\n    const reverseRolesMapping = {\\n        'usuario': 'mortal',\\n        'servicios': 'nivel2',\\n        'administrador': 'admin'\\n    };\\n\\n    onMount(() => {\\n        authStore.subscribe(value => {\\n            user = value.user;\\n            if (user) {\\n                checkAdmin();\\n            } else {\\n                loading = false;\\n            }\\n        });\\n        fetchUsers();\\n    });\\n\\n    async function checkAdmin() {\\n        if (user) {\\n            const docRef = doc(db, 'users', user.uid);\\n            const docSnap = await getDoc(docRef);\\n            if (docSnap.exists()) {\\n                const userData = docSnap.data();\\n                if (userData.role === 'admin') {\\n                    isAdmin = true;\\n                }\\n            }\\n        }\\n        loading = false;\\n    }\\n\\n    async function fetchUsers() {\\n        usersLoading = true;\\n        try {\\n            const querySnapshot = await getDocs(collection(db, 'users'));\\n            users = querySnapshot.docs.map(doc => {\\n                const data = doc.data();\\n                if (!data.role) {\\n                    data.role = 'mortal';\\n                    updateDoc(doc.ref, { role: 'mortal' });\\n                }\\n                data.role = rolesMapping[data.role] || data.role; // Mapear los roles para mostrarlos en el frontend\\n                return { id: doc.id, ...data };\\n            });\\n            console.log('Usuarios:', users);\\n        } catch (error) {\\n            console.error('Error obteniendo usuarios:', error);\\n        }\\n        usersLoading = false;\\n    }\\n\\n    async function updateRole() {\\n        error = '';\\n        if (!selectedUid) {\\n            error = 'Por favor, selecciona un correo electrónico válido.';\\n            return;\\n        }\\n\\n        if (!newRole) {\\n            error = 'Por favor, selecciona un nuevo nivel.';\\n            return;\\n        }\\n\\n        try {\\n            const userRef = doc(db, 'users', selectedUid);\\n            const docSnap = await getDoc(userRef);\\n            const selectedUser = users.find(user => user.id === selectedUid);\\n\\n            const backendRole = reverseRolesMapping[newRole]; // Convertir el rol del frontend al backend\\n\\n            if (docSnap.exists()) {\\n                await updateDoc(userRef, { role: backendRole });\\n            } else {\\n                await setDoc(userRef, { email: selectedUser.email, role: backendRole });\\n            }\\n\\n            const roleEndpoint = {\\n                'mortal': 'setMortalRole',\\n                'nivel2': 'setNivel2Role',\\n                'admin': 'setAdminRole'\\n            };\\n\\n            const response = await fetch(\`http://localhost:3001/\${roleEndpoint[backendRole]}\`, {\\n                method: 'POST',\\n                headers: {\\n                    'Content-Type': 'application/json'\\n                },\\n                body: JSON.stringify({ email: selectedUser.email })\\n            });\\n\\n            if (response.ok) {\\n                alert(\`Usuario actualizado a \${newRole}.\`);\\n                selectedUid = '';\\n                newRole = '';\\n                await fetchUsers();\\n            } else {\\n                error = 'Hubo un error al actualizar el rol del usuario en el servidor.';\\n            }\\n        } catch (err) {\\n            console.error('Error actualizando el rol del usuario:', err);\\n            error = 'Hubo un error al actualizar el rol del usuario.';\\n        }\\n    }\\n\\n    async function deleteUser() {\\n        // Verificar la contraseña\\n        if (password !== import.meta.env.VITE_REGISTRATION_PASSWORD) {\\n            alert('Contraseña incorrecta.');\\n            return;\\n        }\\n\\n        try {\\n            // Eliminar de Firestore\\n            await deleteDoc(doc(db, 'users', selectedDeleteUid));\\n\\n            // Eliminar de Firebase Authentication\\n            const response = await fetch(\`http://localhost:3001/deleteUser\`, {\\n                method: 'POST',\\n                headers: {\\n                    'Content-Type': 'application/json'\\n                },\\n                body: JSON.stringify({ uid: selectedDeleteUid })\\n            });\\n\\n            if (response.ok) {\\n                alert('Usuario eliminado exitosamente.');\\n                selectedDeleteUid = '';\\n                await fetchUsers(); // Actualizar la lista de usuarios\\n            } else {\\n                alert('Hubo un error al eliminar el usuario de la autenticación.');\\n            }\\n        } catch (err) {\\n            console.error('Error eliminando el usuario:', err);\\n            alert('Hubo un error al eliminar el usuario.');\\n        } finally {\\n            password = ''; // Restablecer el campo de contraseña\\n        }\\n    }\\n<\/script>\\n\\n<div class=\\"Mc\\">\\n    <div class=\\"Hc\\">\\n        <div class=\\"hB\\">\\n            <button on:click={() => goto('/admin')}>\\n                <i class=\\"fa-solid fa-arrow-left\\"></i>\\n                <p>Inicio</p>\\n            </button>\\n            <button on:click={async () => {\\n                await authHandlers.logout();\\n                goto('/');\\n            }}>\\n                <i class=\\"fa-solid fa-right-from-bracket\\"></i>\\n                <p>Cerrar Sesión</p>\\n            </button>\\n        </div>\\n    </div>\\n</div>\\n\\n<div class=\\"main-container\\">\\n    <div class=\\"admin-container\\">\\n        <div class=\\"form-group-section\\">\\n            <h1>Modificar Usuarios</h1>\\n            {#if loading}\\n                <p>Cargando...</p>\\n            {:else}\\n                {#if isAdmin}\\n                    <div class=\\"form-group\\">\\n                        {#if usersLoading}\\n                            <p>Cargando usuarios...</p>\\n                        {:else}\\n                            <select bind:value={selectedUid} class=\\"input-field\\">\\n                                <option value=\\"\\" disabled selected>Selecciona un usuario</option>\\n                                {#each users as user}\\n                                    <option value={user.id}>{user.email} ({user.role})</option>\\n                                {/each}\\n                            </select>\\n                            <select bind:value={newRole} class=\\"input-field\\">\\n                                <option value=\\"\\" disabled selected>Selecciona el nuevo nivel</option>\\n                                <option value=\\"usuario\\">Usuario (Nivel 1)</option>\\n                                <option value=\\"servicios\\">Servicios (Nivel 2)</option>\\n                                <option value=\\"administrador\\">Administrador (Nivel 3)</option>\\n                            </select>\\n                            <button on:click={updateRole} class=\\"submit-btn\\">Actualizar Rol</button>\\n                        {/if}\\n                        {#if error}\\n                            <p class=\\"error\\">{error}</p>\\n                        {/if}\\n                    </div>\\n                {:else}\\n                    <p>No tienes permisos para modificar usuarios.</p>\\n                {/if}\\n            {/if}\\n        </div>\\n\\n        <div class=\\"form-group-section\\">\\n            <h1>Eliminar Usuarios</h1>\\n            {#if usersLoading}\\n                <p>Cargando usuarios...</p>\\n            {:else}\\n                <div class=\\"form-group\\">\\n                    <select bind:value={selectedDeleteUid} class=\\"input-field\\">\\n                        <option value=\\"\\" disabled selected>Selecciona un usuario</option>\\n                        {#each users.filter(u => user && u.id !== user.uid) as user}\\n                            <option value={user.id}>{user.email}</option>\\n                        {/each}\\n                    </select>\\n                    <input type=\\"password\\" bind:value={password} placeholder=\\"Contraseña\\" class=\\"input-field\\">\\n                    <button on:click={deleteUser} class=\\"delete-btn\\">Eliminar Usuario</button>\\n                </div>\\n            {/if}\\n        </div>\\n    </div>\\n</div>\\n\\n<style>\\n    .Mc {\\n        display: flex;\\n        flex-direction: column;\\n        min-height: 10vh;\\n        gap: 24px;\\n        padding: 24px;\\n        width: 26%;\\n        max-width: 1000px;\\n        margin: 0 auto;\\n        margin-right: 10%;\\n        font-size: 13px;\\n    }\\n\\n    .hB button {\\n        background: #d93443;\\n        color: white;\\n        padding: 15px 15px;\\n        border: none;\\n        border-radius: 4px;\\n        font-weight: 700;\\n        display: flex;\\n        align-items: center;\\n        gap: 4px;\\n    }\\n\\n    .hB button:hover {\\n        opacity: 0.7;\\n        background-color: #fa6a02;\\n        cursor: pointer;\\n    }\\n\\n    .hB {\\n        display: flex;\\n        align-items: center;\\n        gap: 10px;\\n    }\\n\\n    .main-container {\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n        min-height: 100vh;\\n        color: #333;\\n        padding: 20px;\\n    }\\n\\n    .admin-container {\\n        background: white;\\n        padding: 2rem;\\n        border-radius: 10px;\\n        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\\n        width: 100%;\\n        max-width: 600px;\\n        text-align: center;\\n        margin-top: -100px;\\n        display: flex;\\n        flex-direction: column;\\n        gap: 2rem;\\n    }\\n\\n    .form-group-section {\\n        background: #f9f9f9;\\n        padding: 1.5rem;\\n        border-radius: 10px;\\n        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);\\n    }\\n\\n    .form-group {\\n        display: flex;\\n        flex-direction: column;\\n        gap: 1rem;\\n        margin-bottom: 20px;\\n    }\\n\\n    .input-field {\\n        padding: 0.75rem;\\n        border: 1px solid #d93443;\\n        border-radius: 5px;\\n        font-size: 1rem;\\n        width: 100%;\\n    }\\n\\n    .submit-btn {\\n        background: #d93443;\\n        color: white;\\n        border: none;\\n        padding: 0.75rem 1.5rem;\\n        border-radius: 5px;\\n        font-size: 1rem;\\n        cursor: pointer;\\n        transition: background-color 0.3s;\\n    }\\n\\n    .delete-btn {\\n        background: #d93443;\\n        color: white;\\n        border: none;\\n        padding: 0.75rem 1.5rem;\\n        border-radius: 5px;\\n        font-size: 1rem;\\n        cursor: pointer;\\n        transition: background-color 0.3s;\\n    }\\n\\n    .submit-btn:hover, .delete-btn:hover {\\n        background: #fa6a02;\\n    }\\n\\n    .error {\\n        color: red;\\n        font-size: 0.9rem;\\n    }\\n\\n    h1 {\\n        font-size: 1.5rem;\\n        margin-bottom: 1rem;\\n        color: #333;\\n    }\\n\\n    p {\\n        font-size: 1rem;\\n    }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="Mc svelte-14yiauo"><div class="Hc"><div class="hB svelte-14yiauo"><button class="svelte-14yiauo" data-svelte-h="svelte-92lfck"><i class="fa-solid fa-arrow-left"></i> <p class="svelte-14yiauo">Inicio</p></button> <button class="svelte-14yiauo" data-svelte-h="svelte-16i77t5"><i class="fa-solid fa-right-from-bracket"></i> <p class="svelte-14yiauo">Cerrar Sesión</p></button></div></div></div> <div class="main-container svelte-14yiauo"><div class="admin-container svelte-14yiauo"><div class="form-group-section svelte-14yiauo"><h1 class="svelte-14yiauo" data-svelte-h="svelte-2opsox">Modificar Usuarios</h1> ${`<p class="svelte-14yiauo" data-svelte-h="svelte-dtqfh9">Cargando...</p>`}</div> <div class="form-group-section svelte-14yiauo"><h1 class="svelte-14yiauo" data-svelte-h="svelte-18ach8m">Eliminar Usuarios</h1> ${`<p class="svelte-14yiauo" data-svelte-h="svelte-1qnei9g">Cargando usuarios...</p>`}</div></div> </div>`;
});
export {
  Page as default
};
