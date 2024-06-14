<script>
    import { authHandlers } from "../../../../store/store";
    import { goto } from '$app/navigation';

</script>


<div class="mainContainer">
    <div class="headerContainer">
        <h1>Servicios</h1>
        <div class="headerBtns">
            <button on:click={() => goto('/nivel2/modificar')}>
                <i class="fa-solid fa-arrow-left"></i>
                <p>Regresar</p>
            </button>

            <button on:click={authHandlers.logout}>
                <i class="fa-solid fa-right-from-bracket"></i>
                <p>Cerrar Sesion</p>
            </button>
        </div>
    </div>
    <div class="contentContainer">
        <div class="imagesContainer">
            <div class="container" on:click={() => goto('/nivel2/modificar/servicios/inclusion')}>
                <div class="textContainer">
                    <p class="texto">Inclusión</p>
                </div>
                <div class="iconContainer">
                    <i class="fa-solid fa-user-group"></i>
                </div>
            </div>
            <div class="container" on:click={() => goto('/nivel2/modificar/servicios/reubicacion')}>
                <div class="textContainer">
                    <p class="texto">Reubicación</p>
                </div>
                <div class="iconContainer">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </div>
            </div>
            <div class="container" on:click={() => goto('/nivel2/modificar/servicios/educacion')}>
                <div class="textContainer">
                    <p class="texto">Educación</p>
                </div>
                <div class="iconContainer">
                    <i class="fa-solid fa-book"></i>
                </div>
            </div>
            <div class="container" on:click={() => goto('/nivel2/modificar/servicios/empleabilidad')}>
                <div class="textContainer">
                    <p class="texto">Empleabilidad</p>
                </div>
                <div class="iconContainer">
                    <i class="fa-solid fa-briefcase"></i>
                </div>
            </div>
            <div class="container" on:click={() => goto('/nivel2/modificar/servicios/saludmental')}>
                <div class="textContainer">
                    <p class="texto">Salud Mental</p>
                </div>
                <div class="iconContainer">
                    <i class="fa-solid fa-brain"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        gap: 24px;
        padding: 24px;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }

    .headerContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerContainer button {
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

    .headerContainer button:hover {
        opacity: 0.7;
        background-color: #fa6a02;
        cursor: pointer;
    }

    .headerBtns {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .contentContainer {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .imagesContainer {
        display: flex;
        justify-content: center;
        gap: 50px;
        cursor: pointer;
    }

    .container {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        width: 25vh;
        height: 30vh;
        cursor: pointer;
    }

    .textContainer {
        position: absolute;
        top: 10px; /* Adjust as needed to position the text */
        left: 50%;
        transform: translateX(-50%);
    }

    .iconContainer {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .iconContainer > i {
        font-size: 500%;
    }

    .texto {
        margin: 0; /* Remove margin */
        text-align: center;
        font-size: 25px;
        margin-top: -40px;
    }
</style>