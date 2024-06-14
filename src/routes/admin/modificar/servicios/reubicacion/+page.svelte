<script>
    import { authHandlers, storedNombreCompleto, storedFechaNacimiento, storedUserEmail } from "../../../../../store/store";
    import { goto } from '$app/navigation';
    import { get } from 'svelte/store';

    // Variables para almacenar temporalmente los datos
    let nombrecompleto = get(storedNombreCompleto);
    let fechanacimiento = get(storedFechaNacimiento);
    let email = get(storedUserEmail);
    let area = "Reubicación";
    let successMessage = false;
    let formSubmitted = false; // variable para desaparecer el formulario

    // Referencias a los checkboxes
    let checkbox1, checkbox2, checkbox3, checkbox4, checkbox5;

    async function enviarServicios() {
        const servicios = getServiciosSeleccionados();  // Función para obtener los servicios seleccionados
        const usuario = email;  // El usuario autenticado (ajusta según sea necesario)
        const fecharec = new Date().toISOString().split('T')[0];

        try {
            for (let servicio of servicios) {
                const response = await fetch('/api/encrypt_services', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombreCompleto: nombrecompleto,
                        fechanacimiento: fechanacimiento,
                        servicios: servicio,
                        usuario: usuario,
                        fecharec: fecharec,
                        area: area
                    })
                });

                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                const data = await response.json();
                console.log("Servicio enviado:", data); // Verificación de datos enviados
            }

            // Mostrar mensaje de éxito y ocultar el formulario
            successMessage = true;
            formSubmitted = true;

            // Esperar un poco antes de redirigir para que el mensaje sea visible
            setTimeout(() => {
                goto('/admin/modificar/servicios'); 
            }, 1500);

        } catch (err) {
            console.error(`Error al enviar servicio: ${err.message}`);
        }
    }

    // Función para obtener los servicios seleccionados
    function getServiciosSeleccionados() {
        let servicios = [];
        if (checkbox1.checked) servicios.push(checkbox1.value);
        if (checkbox2.checked) servicios.push(checkbox2.value);
        if (checkbox3.checked) servicios.push(checkbox3.value);
        if (checkbox4.checked) servicios.push(checkbox4.value);
        if (checkbox5.checked) servicios.push(checkbox5.value);
        return servicios;
    }
</script>

{#if !formSubmitted}
<div class="mainContainer">
    <div class="headerBtns">
        <button on:click={() => goto('/admin/modificar/servicios')}>
            <i class="fa-solid fa-arrow-left"></i>
            <p>Regresar</p>
        </button>

        <button on:click={authHandlers.logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <p>Cerrar Sesión</p>
        </button>
    </div>
    <div class="headerContainer">
        <h1>Reubicación</h1>
    </div>
    <div class="contentContainer">
        <!-- Aquí irán los checkboxes para seleccionar los servicios -->
        <div class="checkboxContainer">
            <label>
                <input bind:this={checkbox1} type="checkbox" value="Canalización al ACNUR para apoyos económicos para la integración local">
                Canalización al ACNUR para apoyos económicos para la integración local
            </label>
        </div>
        <div class="checkboxContainer">
            <label>
                <input bind:this={checkbox2} type="checkbox" value="Canalización al ACNUR para la inserción escolar">
                Canalización al ACNUR para la inserción escolar
            </label>
        </div>
        <div class="checkboxContainer">
            <label>
                <input bind:this={checkbox3} type="checkbox" value="Canalización al ACNUR para apoyo por certificación de primaria y secundaria">
                Canalización al ACNUR para apoyo por certificación de primaria y secundaria
            </label>
        </div>
        <div class="checkboxContainer">
            <label>
                <input bind:this={checkbox4} type="checkbox" value="Canalización al ACNUR para apoyo económico por revalidación de estudios">
                Canalización al ACNUR para apoyo económico por revalidación de estudios
            </label>
        </div>
        <div class="checkboxContainer">
            <label>
                <input bind:this={checkbox5} type="checkbox" value="Canalización al ACNUR para apoyo económico por certificaciones técnicas">
                Canalización al ACNUR para apoyo económico por certificaciones técnicas
            </label>
        </div>
        <button class="submitBtn" on:click={enviarServicios}>Enviar</button>
    </div>
</div>
{/if}

{#if successMessage}
    <div class="success-message">
        El formulario fue enviado con éxito. Redirigiendo al menú de servicios...
    </div>
{/if}

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 24px;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }

    .headerContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerBtns {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
        margin-bottom: 24px;
        margin-right: -100px;
    }

    .headerBtns button {
        background: #d93443;
        color: white;
        padding: 15px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .headerBtns button:hover {
        opacity: 0.7;
        background-color: #fa6a02;
        cursor: pointer;
    }

    h1 {
        color: #333;
        text-align: center;
        margin-bottom: 24px;
    }

    .contentContainer {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
        background-color: #ffffff;
        padding: 24px;
        border-radius: 8px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .checkboxContainer {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        width: 100%;
    }

    .checkboxContainer label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #333;
    }

    .submitBtn {
        background: #d93443;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        align-self: flex-end;
        margin-top: 16px;
    }

    .submitBtn:hover {
        opacity: 0.7;
        background-color: #fa6a02;
    }

    .success-message {
        font-size: 1.2em;
        color: black;
        text-align: center;
        margin-top: 20px;
    }
</style>
