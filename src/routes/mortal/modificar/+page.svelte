<script>
    import { writable } from 'svelte/store';
    import { authHandlers, storedNombreCompleto, storedFechaNacimiento } from '../../../store/store';
    import { goto } from '$app/navigation';

    let nombrecompleto = '';
    let fechanacimiento = '';
    let resultadoBusqueda = writable(null);
    let error = writable('');
    let formSubmitted = writable(false);

    const preguntas = {
        nombrecompleto: 'Nombre completo',
        fechanacimiento: 'Fecha de nacimiento',
    };

    async function buscar() {
        try {
            const response = await fetch('/api/decrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombrecompleto,
                    fechanacimiento
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Datos recibidos:", data); // Verificación de datos recibidos
                resultadoBusqueda.set(data);
                error.set('');
                formSubmitted.set(true);

                // Actualizar las tiendas con el nombre completo y la fecha de nacimiento
                storedNombreCompleto.set(nombrecompleto);
                storedFechaNacimiento.set(fechanacimiento);
            } else {
                const errorData = await response.text();
                error.set(errorData || 'Error desconocido');
            }
        } catch (err) {
            error.set(`Error de conexión: ${err.message}`);
        }
    }

    // Función para capitalizar la primera letra de cada palabra
    function capitalizeFirstLetter(string) {
        return string.replace(/\b(\w)(\S*)/g, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase());
    }

</script>

<div class="Mc">
    <div class="Hc">
        <div class="hB">
            <button on:click={() => goto('/mortal')}>
                <i class="fa-solid fa-arrow-left"></i>
                <p>Inicio</p>
            </button>
            <button on:click={authHandlers.logout}>
                <i class="fa-solid fa-right-from-bracket"></i>
                <p>Cerrar Sesión</p>
            </button>
        </div>
    </div>
</div>

{#if !$formSubmitted}
<div class="main-container">
    <h1>Buscar Migrante para Acceder a Servicios</h1>
    <form on:submit|preventDefault={buscar} class="form-container">
        <div class="form-group">
            <label for="nombrecompleto">Nombre Completo:</label>
            <input type="text" id="nombrecompleto" bind:value={nombrecompleto} required>
        </div>
        <div class="form-group">
            <label for="fechanacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="fechanacimiento" bind:value={fechanacimiento} required>
        </div>
        <button type="submit">Buscar</button>
    </form>

    {#if $error}
        <p class="error-message">{$error}</p>
    {/if}
</div>
{/if}

{#if $resultadoBusqueda}
    <h2 class="section-title">Información del Migrante</h2>
    <div class="card">
        {#each $resultadoBusqueda.data as migrante}
            {#each Object.entries(migrante) as [key, value]}
                {#if key == 'nombrecompleto' || key == 'fechanacimiento'}
                    <div class="card-row">
                        <span class="card-key">{preguntas[key.toLowerCase()] || key}:</span>
                        <span class="card-value">{capitalizeFirstLetter(value)}</span>
                    </div>
                {/if}
            {/each}
        {/each}
    </div>
    <div class="contentContainer">
        <div class="buttonContainer">
            <button class="service-button" on:click={() => goto('/mortal/modificar/servicios')}>
                Ir a modificar servicios para este migrante
            </button>
        </div>
    </div>
{/if}

<style>
    .main-container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin-bottom: 30vh;
    }

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

    .form-container {
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 15px;
        text-align: left;
    }

    label {
        display: block;
        font-size: 0.9em;
        margin-bottom: 5px;
        color: #333;
    }

    input[type="text"], input[type="date"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1em;
        box-sizing: border-box;
    }

    button {
        width: 100%;
        padding: 10px;
        background: #d93443;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
    }

    button:hover {
        opacity: 0.7;
        background-color: #fa6a02;
    }

    .section-title {
        margin-top: 20px;
        margin-bottom: 10px;
        color: black;
        text-align: center;
    }

    .card {
        background: #f8f9fa;
        padding: 15px;
        border: 1px solid #e9ecef;
        border-radius: 5px;
        margin-bottom: 10px;
        width: 80%;
        margin: 0 auto;
    }

    .card-row {
        display: block;
        padding: 5px 0;
        text-align: left;
    }

    .card-key {
        font-weight: bold;
    }

    .card-value {
        display: block;
        text-align: left;
        margin-left: 10px;
    }

    .contentContainer {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .buttonContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .service-button {
        background: #d93443;
        color: white;
        padding: 15px 15px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        cursor: pointer;
        font-size: 1em;
        text-align: center;
    }

    .service-button:hover {
        opacity: 0.7;
        background-color: #fa6a02;
    }

    .error-message {
        font-size: 1.2em;
        color: red;
        text-align: center;
        margin-top: 20px;
    }
</style>
