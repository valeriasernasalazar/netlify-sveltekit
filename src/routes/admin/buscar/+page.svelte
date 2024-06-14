<script>
    import { writable } from 'svelte/store';
    import { authHandlers } from "../../../store/store";
    import { goto } from '$app/navigation';

    let nombrecompleto = '';
    let fechanacimiento = '';
    let resultadoBusqueda = writable(null);
    let serviciosBusqueda = writable(null);
    let error = writable('');
    let formSubmitted = writable(false);

    const preguntas = {
        fechaAtencion: 'Fecha de atención',
        tipo: 'Adulto, NNA, NNAnA',
        nombrecompleto: 'Nombre completo',
        telefono: 'Número telefónico de contacto',
        sexo: 'Sexo',
        fechanacimiento: 'Fecha de nacimiento',
        edad: 'Edad',
        estado_migracion: 'Estado de Migración',
        paisorigen: 'País de origen',
        dep_est: 'Departamento/Estado',
        estadocivil: 'Estado Civil',
        tipopoblacion: 'Tipo de población',
        documentoidentidad: 'Documento de identidad',
        curp: 'Si la persona cuenta con CURP, registrar el mismo en este apartado',
        tipodocmigratorio: 'Tipo de documento migratorio',
        tienehijos: '¿Tiene hijos?',
        numhijos: '¿Cuántos de sus hijos están viajando con usted?',
        sabeleerescribir: '¿Usted sabe leer y escribir?',
        ultimogrado: '¿Cuál fue su último grado de estudio?',
        grado_ac: '¿Cual fue su último grado académico?',
        idiomas: 'Idiomas que domina',
        otroidioma: 'Sí se seleccionó "Otro idioma", ¿Cuál es el idioma que domina?',
        fechasalidapais: 'Fecha en que salió de su país de origen',
        viajando: '¿Cómo se encuentra viajando?',
        acompanante: '¿Por quién está siendo acompañada/o?',
        como_viajo: '¿Cómo viajó?',
        razonsalida: '¿Por qué razón tomó la decisión de salir de su país?',
        abusoderechos: '¿Usted sufrió de algún abuso a sus Derechos Humanos?',
        tipoabuso: '¿Qué tipo de abuso vivió?',
        abusomexico: '¿Usted vivió algún abuso o agresión en México?',
        tipoabusomexico: '¿Qué tipo de abuso o agresión vivió?',
        quienabuso: '¿Quién le ocasionó el abuso o la agresión?',
        pagoguia: '¿Usted le pagó a algún guía para viajar?',
        cuantopago: '¿Cuánto dinero pagó?',
        fechaingresomexico: 'Fecha en que ingresó a México',
        lugaringreso: '¿Por dónde ingresó a México?',
        destinofinal: '¿Cuál es su destino final?',
        destinomonterrey: 'Si se queda en México, ¿Su destino es Monterrey?',
        razonmonterrey: '¿Por qué pensaría quedarse en Monterrey?',
        redapoyomonterrey: '¿Cuenta con una red de apoyo en Monterrey?',
        tiempored: 'Tiempo de conocer a su red de apoyo',
        intentoeeuu: '¿Usted ha intentado ingresar a Estados Unidos?',
        redapoyoeeuu: '¿Usted cuenta con una red de apoyo en Estados Unidos?',
        descripcionred: 'Descripción de la red de apoyo con la que cuenta en Estados Unidos',
        estacionmigratoria: '¿Usted ha estado en alguna estación migratoria?',
        agresionautoridades: '¿Sufrió o vivió situaciones donde se sintió agredido por autoridades en las estaciones migratorias?',
        estadoestacion: '¿En cuál Estado y/o País estuvo en una estación migratoria?',
        descripcionhechos: 'Descripción de los hechos',
        denunciaformal: '¿Usted interpuso una denuncia formal?',
        razonnodenuncia: '¿Por qué razón no lo hizo?',
        solucionbrindada: '¿Qué solución le brindaron?',
        puederegresar: '¿Usted puede regresar a su país?',
        razonnoregreso: '¿Por qué razón no puede regresar a su país?',
        padeceenfermedad: '¿Actualmente usted padece alguna enfermedad?',
        cualenfermedad: '¿Cuál enfermedad padece?',
        tratamientomedico: '¿Se encuentra o encontraba en algún tratamiento médico?',
        padecealergia: '¿Usted padece algún tipo de alergia?',
        tipoalergia: 'Tipo de alergia o a qué es alérgico/a',
        otroalbergue: '¿Usted se ha estado en algún otro albergue?',
        ultimoalbergue: '¿Cuál fue el último albergue en el que estuvo?',
        accesomonarca: '¿Se le brindó acceso al albergue de Casa Monarca?',
        razonnoacceso: '¿Por qué se le negó el acceso al albergue?',
        serviciosbrindados: '¿Cuáles servicios se le brindaron a la persona?',
        fotofrente: 'Fotografía de frente',
        fotoperfilizquierdo: 'Fotografía perfil izquierdo',
        fotoperfilderecho: 'Fotografía perfil derecho',
        senasparticulares: 'Señas particulares',
        contactoemergencia: 'Contacto de emergencia',
        ubicacioncontactoemergencia: 'Geográficamente, ¿Dónde se encuentra su contacto de emergencia?',
        observacionesfinales: 'Observaciones finales',
        activo_cm: '¿Activo en Casa Monarca al día de hoy?',
        ultimafecha: 'Último día en Casa Monarca',
    };

    const ordenCampos = [
        'nombrecompleto', 'fechanacimiento', 'paisorigen', 'tipo', 'fechaAtencion', 'telefono', 'sexo', 'edad', 'estado_migracion',
        'dep_est', 'estadocivil', 'tipopoblacion', 'documentoidentidad', 'curp', 'tipodocmigratorio',
        'tienehijos', 'numhijos', 'sabeleerescribir', 'ultimogrado', 'grado_ac', 'idiomas', 'otroidioma', 'fechasalidapais',
        'viajando', 'acompanante', 'como_viajo', 'razonsalida', 'abusoderechos', 'tipoabuso', 'abusomexico', 'tipoabusomexico',
        'quienabuso', 'pagoguia', 'cuantopago', 'fechaingresomexico', 'lugaringreso', 'destinofinal', 'destinomonterrey',
        'razonmonterrey', 'redapoyomonterrey', 'tiempored', 'intentoeeuu', 'redapoyoeeuu', 'descripcionred', 'estacionmigratoria',
        'agresionautoridades', 'estadoestacion', 'descripcionhechos', 'denunciaformal', 'razonnodenuncia', 'solucionbrindada',
        'puederegresar', 'razonnoregreso', 'padeceenfermedad', 'cualenfermedad', 'tratamientomedico', 'padecealergia', 'tipoalergia',
        'otroalbergue', 'ultimoalbergue', 'accesomonarca', 'razonnoacceso', 'serviciosbrindados', 'senasparticulares', 'contactoemergencia', 'ubicacioncontactoemergencia', 'observacionesfinales',
        'activo_cm', 'ultimafecha'
    ];

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
                resultadoBusqueda.set(data);
                error.set('');

                // Buscar servicios
                buscarServicios(data);

                formSubmitted.set(true);
            } else {
                const errorData = await response.text();
                error.set(errorData || 'Error desconocido');
            }
        } catch (err) {
            error.set(`Error de conexión: ${err.message}`);
        }
    }

    async function buscarServicios(data) {
        try {
            const response = await fetch('/api/decrypt_services', {
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
                const serviciosData = await response.json();
                serviciosBusqueda.set(serviciosData.data);
            } else {
                const errorData = await response.text();
                error.set(errorData || 'Error desconocido al buscar servicios');
            }
        } catch (err) {
            error.set(`Error de conexión al buscar servicios: ${err.message}`);
        }
    }

    function agruparServicios(servicios) {
        let agrupados = {};
        servicios.forEach(servicio => {
            const area = servicio.area.toLowerCase();
            if (!agrupados[area]) {
                agrupados[area] = [];
            }
            agrupados[area].push({
                servicio: servicio.servicios,
                usuario: servicio.usuario,
                fechaRec: servicio.fecharec
            });
        });
        return Object.entries(agrupados);
    }

    function capitalizeFirstLetter(string) {
        return string.replace(/\b(\w)(\S*)/g, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase());
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

{#if !$formSubmitted}
<div class="main-container">
    <h1>Buscar Migrante</h1>
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
    <div class="hola">
        <h2>{$resultadoBusqueda.data[0].nombrecompleto}</h2>
    </div>  
    <div class="hola2">
        <h2>{$resultadoBusqueda.data[0].fechanacimiento}</h2>
    </div>  

    <div class="result-container">  
    <div class="photo-grid">
        {#each $resultadoBusqueda.data as migrante}
            {#each Object.entries(migrante) as [key, value]}
                {#if key.toLowerCase().includes('foto')}
                    <div class="photo-item">
                        <span class="photo-key">{preguntas[key] || key}:</span>
                        <img src={"data:image/jpeg;base64," + value} alt="Fotografía del migrante" class="migrante-foto">
                        <!-- Log the value to inspect it -->
                        <p style="display:none">{value}</p>
                    </div>
                {/if}
            {/each}
        {/each}
    </div>
</div>

<div class="info-servicios">
    <div class="info-container">
        <h2 class="section-title">Información del Migrante</h2>
        <div class="card">
            {#each $resultadoBusqueda.data as migrante}
                {#each ordenCampos as campo}
                    {#if migrante[campo] && migrante[campo] !== 'N/A'}
                        <div class="card-row">
                            <span class="card-key">{preguntas[campo] || campo}:</span>
                            <span class="card-value">{capitalizeFirstLetter(migrante[campo])}</span>
                        </div>
                    {/if}
                {/each}
            {/each}
        </div>
    </div>

    <div class="services-container">
        <h2 class="section-title">Servicios</h2>
        <div class="card">
            {#if $serviciosBusqueda && $serviciosBusqueda.length > 0}
                {#each agruparServicios($serviciosBusqueda) as [area, servicios]}
                    <div class="card-row">
                        <span class="card-key">{area.charAt(0).toUpperCase() + area.slice(1)}:</span>
                        {#each servicios as {servicio, usuario, fechaRec}}
                            <span class="card-value">- {capitalizeFirstLetter(servicio)} ({usuario} en {fechaRec})</span>
                        {/each}
                    </div>
                {/each}
            {:else}
                <div class="card-row">
                    <span class="card-value">No hay servicios disponibles.</span>
                </div>
            {/if}
        </div>
    </div>
</div>
{/if}

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


    .form-container {
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        font-size: 0.9em;
        margin-bottom: 5px;
        color: #333;
        text-align: left;
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
        cursor: pointer;
    }

    .result-container {
        margin-top: 20px;
        width: 86%;
        align-self: center;
        border-radius: 4px;
    }

    .section-title {
        margin-top: 20px;
        margin-bottom: 10px;
        color: black;
        text-align: center;
    }
    .section-title1 {
        margin-top: 20px;
        margin-bottom: -10px;
        color: black;
        text-align: center;
    }

    .hola{
        margin-top: 10px;
        margin-bottom: 10px;
        color: #d93443;
        text-align: center;
        font-size: 20px;
    }

    .hola2{
        margin-top: -10px;
        margin-bottom: 10px;
        color: #fa6a02;
        text-align: center;
    }

    .photo-grid {
        display: flex;
        justify-content: center;
        gap: 60px;
        margin-bottom: 20px;
    }

    .photo-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .photo-key {
        font-weight: bold;
        margin-bottom: 5px;
        margin-top: 15px;
    }

    .migrante-foto {
        max-width: 200px;
        max-height: 200px;
        display: block;
        margin-top: 10px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    }

    .card {
        background: #f8f9fa;
        padding: 15px;
        border: 1px solid #e9ecef;
        border-radius: 5px;
        margin-bottom: 10px;

    }

    .card-row {
        display: block;
        padding: 5px 0;
    }

    .card-key {
        font-weight: bold;
    }

    .card-value {
        display: block;
        text-align: left;
        margin-left: 10px;
    }

    .error-message {
        font-size: 1.2em;
        color: red;
        text-align: center;
        margin-top: 20px;
    }

    .info-servicios {
        display: flex;
        gap: 20px;
        justify-content: space-between;
        margin-top: 20px;
        margin-right:100px;
        margin-left:100px;
    }

    .info-container, .services-container {
        flex: 1;
        max-width: 45%;
    }
</style>
