<script>
    import { authHandlers } from "../store/store";

    let email = "";
    let password = "";
    let pass2 = "";
    let confirmPass = "";
    let error = false;
    let register = false;
    let authenticating = false;

    async function handleAuthenticate() {
        if (authenticating) {
            return;
        }

        if (!email || !password || (register && !confirmPass)) {
            error = true;
            return;
        }

        if (register && pass2 !== import.meta.env.VITE_REGISTRATION_PASSWORD) {
            error = true;
            return;
        }

        authenticating = true;

        try {
            if (register) {
                if (password !== confirmPass) {
                    error = true;
                    return;
                }
                await authHandlers.signup(email, password);
            } else {
                await authHandlers.login(email, password);
            }
        } catch (err) {
            console.log("There was an auth error.", err);
            error = true;
        } finally {
            authenticating = false;
        }
    }

    function handleRegister() {
        register = !register;
    }
</script>

<div class="authContainer">
    <form>
        <h1>{register ? "Registrarse" : "Iniciar Sesión"}</h1>
        {#if error}
        <p class="error">La información ingresada no es correcta. </p>
        {/if}
        <label>
          <p class={email ? 'above' : 'center'}>Correo</p>  
            <input bind:value={email} type="email" placeholder="Correo Electrónico" />
        </label>
        <label>
            <p class={password ? 'above' : 'center'}>Contraseña</p>  
            <input bind:value={password} type="password" placeholder="Contraseña" />
        </label>
        {#if register}
        <label>
            <p class={confirmPass ? 'above' : 'center'}>Confirmar Contraseña</p>  
            <input bind:value={confirmPass} type="password" placeholder="Confirmar Contraseña"/>
        </label>

        <label>
            <p class={pass2 ? 'above' : 'center'}>Contraseña del Administrador</p>  
            <input bind:value={pass2} type="password" placeholder="Contraseña del Administrador"/>
        </label>

        {/if}
        <button on:click={handleAuthenticate} type="button" class="submitBtn">
            {#if authenticating}
                <i class="fa-solid fa-spinner spin"></i>
            {:else}
                Entrar
            {/if}
        </button>
    </form>
    <div class="options">
        <p>O</p>
        {#if register}
            <div>
                <p>Ya tienes una cuenta?</p>
                <p on:click={handleRegister} on:keydown={() => {}}>Inicia Sesión</p>
            </div>
        {:else}
            <div>
                <p>No tienes una cuenta?</p>
                <p on:click={handleRegister} on:keydown={() => {}}>Registrate</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .authContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 24px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    form, .options {
        width: 400px;
        max-width: 100%;
        margin: 0 auto;
    }

    form input {
        width: 100%;
        border: none;
        background: transparent;
        color: black;
        padding: 15px 15px;
    }

    h1 {
        text-align: center;
        font-size: 3rem;
    }
    
    form label {
        position: relative;
        border: 1px solid #d93443;
        border-radius: 5px;
    }

    form input:focus {
        border: none;
        outline: none;
    }

    form label:focus-within {
        border-color: #fa6a02;
    }

    form button {
        background: #d93443;
        color: black;
        border: none;
        padding: 15px 0px;
        border-radius: 5px;
        font-size: 1rem;
        display: grid;
        place-items: center;
        cursor: pointer;
    }

    form button:hover {
        background: #fa6a02;
    }

    .above,
    .center {
        position: absolute;
        transform: translateY(-50%);
        pointer-events: none;
        color: black;
        border-radius: 4px;
        padding: 0 6px;
        font-size: 0.8rem;
    }

    .above {
        top: 0px;
        left: 24px;
        background: #d93443;
        border: 1px solid #fa6a02;
        font-size: 0.7rem;
    }

    .center {
        top: 50%;
        left: 6px;  
        border: 1px solid transparent;
        opacity: 0;
    }

    .error {
        color: rgb(240, 104, 104);
        font-size: 0.9rem;
        text-align: center;
    }

    .options {
        padding: 14px 0px;
        overflow: hidden;
        font-size: 0.9rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: center;
    }

    .options > p {
        position: relative;
        text-align: center;
        width: fit-content;
        margin: 0 auto;
        padding: 0 10px;
    }

    .options > p::after,
    .options > p::before {
        position: absolute;
        content: '';
        top: 50%;
        transform: translateY(-50%);
        width: 100vw;
        height: 1.5px;
        background: black;
    }

    .options > p::after {
        right: 100%;
    }

    .options > p::before {
        left: 100%;
    }

    .options div {
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: center;
    }

    .options div p:last-of-type {
        color: #fa6a02;
        cursor: pointer;
    }

    .spin {
        animation: spin 2s infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
