<script>
    import { writable } from 'svelte/store';
    import { authHandlers, storedNombreCompleto, storedFechaNacimiento } from '../../../store/store';
    import { goto } from '$app/navigation';
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

<iframe title="MIGRANTES_FINAL" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiYzg5NGEyNTUtMjE1Zi00OTZmLWJkZmQtODY0MDJkZmJlNjViIiwidCI6ImM2NWEzZWE2LTBmN2MtNDAwYi04OTM0LTVhNmRjMTcwNTY0NSIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>
<style>
    body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #e0e0e0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

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

</style>
