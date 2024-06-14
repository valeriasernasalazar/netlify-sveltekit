<script>
    import { writable } from 'svelte/store';
    import { authHandlers } from '../../../store/store';
    import { goto } from '$app/navigation';

    let daysToPredict = 1;  // Initial value for the slider
    let showGraph = false;  // To control the visibility of the graph
    let isLoading = false;  // To control the loading state

    async function handlePredict() {
        isLoading = true;
        try {
            const response = await fetch('/api/modelo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ days: daysToPredict })
            });

            console.log('Raw response:', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.error);
                return;
            }

            const data = await response.json();
            console.log(data);
            showGraph = true;  // Show the graph after successful prediction
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            isLoading = false;  // Hide loading indicator
        }
    }

    function handleViewDashboard() {
        showGraph = false;  // Hide the graph and show the dashboard again
    }
</script>

<div class="Mc">
    <div class="Hc">
        <div class="hB">
            <button on:click={() => goto('/admin')}>
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

<div class="input-section">
    <div class="slider-container">
        <label for="days">Cantidad de días a predecir: {daysToPredict}</label>
        <input type="range" id="days" min="1" max="30" bind:value={daysToPredict} />
        <div class="button-group">
            <button on:click={handlePredict} disabled={isLoading}>
                {#if isLoading}
                    Cargando...
                {:else}
                    Predecir
                {/if}
            </button>
            {#if showGraph}
                <button on:click={handleViewDashboard}>Ver Dashboard</button>
            {/if}
        </div>
    </div>
</div>

{#if showGraph}
    <iframe title="Evaluacion Ingresos" class="hola" width="1130" height="700" src="/evolucion_ingresos.html" frameborder="0" allowFullScreen="true"></iframe>
{:else}
    <iframe title="MIGRANTES_FINAL (1)" class="hola" width="1130" height="700" src="https://app.powerbi.com/view?r=eyJrIjoiOTg5NDE0MDctNjI3YS00YzlkLTlhYTgtYWMyZGU0Nzc5MzM2IiwidCI6ImM2NWEzZWE2LTBmN2MtNDAwYi04OTM0LTVhNmRjMTcwNTY0NSIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>   
{/if}

<style>
    .hola {
        align-self: center;
        margin-top:35px;
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

    .input-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    .slider-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left:20px;
    }

    .button-group {
        display: flex;
        gap: 10px;
    }

    .input-section button {
        background: #d93443;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        cursor: pointer;
    }

    .input-section button:hover {
        opacity: 0.7;
        background-color: #fa6a02;
    }

    .input-section button:disabled {
        background: #ccc;
        cursor: not-allowed;
    }

    .graph-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .graph-section button {
        background: #d93443;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        cursor: pointer;
    }

    .graph-section button:hover {
        opacity: 0.7;
        background-color: #fa6a02;
    }

    #days {
        margin-right: 10px;
    }
</style>
