import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, d as each } from "../../../../chunks/ssr.js";
import { w as writable } from "../../../../chunks/index2.js";
import "../../../../chunks/store.js";
import "../../../../chunks/client.js";
const css = {
  code: '.main-container.svelte-1npnivj.svelte-1npnivj{width:100%;max-width:600px;margin:auto;padding:20px;background:#fff;border-radius:10px;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);text-align:center;margin-bottom:30vh}.Mc.svelte-1npnivj.svelte-1npnivj{display:flex;flex-direction:column;min-height:10vh;gap:24px;padding:24px;width:26%;max-width:1000px;margin:0 auto;margin-right:10%;font-size:13px}.hB.svelte-1npnivj button.svelte-1npnivj{background:#d93443;color:white;padding:15px 15px;border:none;border-radius:4px;font-weight:700;display:flex;align-items:center;gap:4px}.hB.svelte-1npnivj button.svelte-1npnivj:hover{opacity:0.7;background-color:#fa6a02;cursor:pointer}.hB.svelte-1npnivj.svelte-1npnivj{display:flex;align-items:center;gap:10px}.form-container.svelte-1npnivj.svelte-1npnivj{margin-bottom:20px}.form-group.svelte-1npnivj.svelte-1npnivj{margin-bottom:15px}label.svelte-1npnivj.svelte-1npnivj{display:block;font-size:0.9em;margin-bottom:5px;color:#333;text-align:left}input[type="text"].svelte-1npnivj.svelte-1npnivj,input[type="date"].svelte-1npnivj.svelte-1npnivj{width:100%;padding:10px;border:1px solid #ccc;border-radius:5px;font-size:1em;box-sizing:border-box}button.svelte-1npnivj.svelte-1npnivj{width:100%;padding:10px;background:#d93443;color:white;border:none;border-radius:5px;cursor:pointer;font-size:1em}button.svelte-1npnivj.svelte-1npnivj:hover{opacity:0.7;background-color:#fa6a02;cursor:pointer}.result-container.svelte-1npnivj.svelte-1npnivj{margin-top:20px;width:86%;align-self:center;border-radius:4px}.section-title.svelte-1npnivj.svelte-1npnivj{margin-top:20px;margin-bottom:10px;color:black;text-align:center}.hola.svelte-1npnivj.svelte-1npnivj{margin-top:10px;margin-bottom:10px;color:#d93443;text-align:center;font-size:20px}.hola2.svelte-1npnivj.svelte-1npnivj{margin-top:-10px;margin-bottom:10px;color:#fa6a02;text-align:center}.photo-grid.svelte-1npnivj.svelte-1npnivj{display:flex;justify-content:center;gap:60px;margin-bottom:20px}.photo-item.svelte-1npnivj.svelte-1npnivj{display:flex;flex-direction:column;align-items:center}.photo-key.svelte-1npnivj.svelte-1npnivj{font-weight:bold;margin-bottom:5px;margin-top:15px}.migrante-foto.svelte-1npnivj.svelte-1npnivj{max-width:200px;max-height:200px;display:block;margin-top:10px;border-radius:5px;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1)}.card.svelte-1npnivj.svelte-1npnivj{background:#f8f9fa;padding:15px;border:1px solid #e9ecef;border-radius:5px;margin-bottom:10px}.card-row.svelte-1npnivj.svelte-1npnivj{display:block;padding:5px 0}.card-key.svelte-1npnivj.svelte-1npnivj{font-weight:bold}.card-value.svelte-1npnivj.svelte-1npnivj{display:block;text-align:left;margin-left:10px}.error-message.svelte-1npnivj.svelte-1npnivj{font-size:1.2em;color:red;text-align:center;margin-top:20px}.info-servicios.svelte-1npnivj.svelte-1npnivj{display:flex;gap:20px;justify-content:space-between;margin-top:20px;margin-right:100px;margin-left:100px}.info-container.svelte-1npnivj.svelte-1npnivj,.services-container.svelte-1npnivj.svelte-1npnivj{flex:1;max-width:45%}',
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import { writable } from 'svelte/store';\\n    import { authHandlers } from \\"../../../store/store\\";\\n    import { goto } from '$app/navigation';\\n\\n    let nombrecompleto = '';\\n    let fechanacimiento = '';\\n    let resultadoBusqueda = writable(null);\\n    let serviciosBusqueda = writable(null);\\n    let error = writable('');\\n    let formSubmitted = writable(false);\\n\\n    const preguntas = {\\n        fechaAtencion: 'Fecha de atención',\\n        tipo: 'Adulto, NNA, NNAnA',\\n        nombrecompleto: 'Nombre completo',\\n        telefono: 'Número telefónico de contacto',\\n        sexo: 'Sexo',\\n        fechanacimiento: 'Fecha de nacimiento',\\n        edad: 'Edad',\\n        estado_migracion: 'Estado de Migración',\\n        paisorigen: 'País de origen',\\n        dep_est: 'Departamento/Estado',\\n        estadocivil: 'Estado Civil',\\n        tipopoblacion: 'Tipo de población',\\n        documentoidentidad: 'Documento de identidad',\\n        curp: 'Si la persona cuenta con CURP, registrar el mismo en este apartado',\\n        tipodocmigratorio: 'Tipo de documento migratorio',\\n        tienehijos: '¿Tiene hijos?',\\n        numhijos: '¿Cuántos de sus hijos están viajando con usted?',\\n        sabeleerescribir: '¿Usted sabe leer y escribir?',\\n        ultimogrado: '¿Cuál fue su último grado de estudio?',\\n        grado_ac: '¿Cual fue su último grado académico?',\\n        idiomas: 'Idiomas que domina',\\n        otroidioma: 'Sí se seleccionó \\"Otro idioma\\", ¿Cuál es el idioma que domina?',\\n        fechasalidapais: 'Fecha en que salió de su país de origen',\\n        viajando: '¿Cómo se encuentra viajando?',\\n        acompanante: '¿Por quién está siendo acompañada/o?',\\n        como_viajo: '¿Cómo viajó?',\\n        razonsalida: '¿Por qué razón tomó la decisión de salir de su país?',\\n        abusoderechos: '¿Usted sufrió de algún abuso a sus Derechos Humanos?',\\n        tipoabuso: '¿Qué tipo de abuso vivió?',\\n        abusomexico: '¿Usted vivió algún abuso o agresión en México?',\\n        tipoabusomexico: '¿Qué tipo de abuso o agresión vivió?',\\n        quienabuso: '¿Quién le ocasionó el abuso o la agresión?',\\n        pagoguia: '¿Usted le pagó a algún guía para viajar?',\\n        cuantopago: '¿Cuánto dinero pagó?',\\n        fechaingresomexico: 'Fecha en que ingresó a México',\\n        lugaringreso: '¿Por dónde ingresó a México?',\\n        destinofinal: '¿Cuál es su destino final?',\\n        destinomonterrey: 'Si se queda en México, ¿Su destino es Monterrey?',\\n        razonmonterrey: '¿Por qué pensaría quedarse en Monterrey?',\\n        redapoyomonterrey: '¿Cuenta con una red de apoyo en Monterrey?',\\n        tiempored: 'Tiempo de conocer a su red de apoyo',\\n        intentoeeuu: '¿Usted ha intentado ingresar a Estados Unidos?',\\n        redapoyoeeuu: '¿Usted cuenta con una red de apoyo en Estados Unidos?',\\n        descripcionred: 'Descripción de la red de apoyo con la que cuenta en Estados Unidos',\\n        estacionmigratoria: '¿Usted ha estado en alguna estación migratoria?',\\n        agresionautoridades: '¿Sufrió o vivió situaciones donde se sintió agredido por autoridades en las estaciones migratorias?',\\n        estadoestacion: '¿En cuál Estado y/o País estuvo en una estación migratoria?',\\n        descripcionhechos: 'Descripción de los hechos',\\n        denunciaformal: '¿Usted interpuso una denuncia formal?',\\n        razonnodenuncia: '¿Por qué razón no lo hizo?',\\n        solucionbrindada: '¿Qué solución le brindaron?',\\n        puederegresar: '¿Usted puede regresar a su país?',\\n        razonnoregreso: '¿Por qué razón no puede regresar a su país?',\\n        padeceenfermedad: '¿Actualmente usted padece alguna enfermedad?',\\n        cualenfermedad: '¿Cuál enfermedad padece?',\\n        tratamientomedico: '¿Se encuentra o encontraba en algún tratamiento médico?',\\n        padecealergia: '¿Usted padece algún tipo de alergia?',\\n        tipoalergia: 'Tipo de alergia o a qué es alérgico/a',\\n        otroalbergue: '¿Usted se ha estado en algún otro albergue?',\\n        ultimoalbergue: '¿Cuál fue el último albergue en el que estuvo?',\\n        accesomonarca: '¿Se le brindó acceso al albergue de Casa Monarca?',\\n        razonnoacceso: '¿Por qué se le negó el acceso al albergue?',\\n        serviciosbrindados: '¿Cuáles servicios se le brindaron a la persona?',\\n        fotofrente: 'Fotografía de frente',\\n        fotoperfilizquierdo: 'Fotografía perfil izquierdo',\\n        fotoperfilderecho: 'Fotografía perfil derecho',\\n        senasparticulares: 'Señas particulares',\\n        contactoemergencia: 'Contacto de emergencia',\\n        ubicacioncontactoemergencia: 'Geográficamente, ¿Dónde se encuentra su contacto de emergencia?',\\n        observacionesfinales: 'Observaciones finales',\\n        activo_cm: '¿Activo en Casa Monarca al día de hoy?',\\n        ultimafecha: 'Último día en Casa Monarca',\\n    };\\n\\n    const ordenCampos = [\\n        'nombrecompleto', 'fechanacimiento', 'paisorigen', 'tipo', 'fechaAtencion', 'telefono', 'sexo', 'edad', 'estado_migracion',\\n        'dep_est', 'estadocivil', 'tipopoblacion', 'documentoidentidad', 'curp', 'tipodocmigratorio',\\n        'tienehijos', 'numhijos', 'sabeleerescribir', 'ultimogrado', 'grado_ac', 'idiomas', 'otroidioma', 'fechasalidapais',\\n        'viajando', 'acompanante', 'como_viajo', 'razonsalida', 'abusoderechos', 'tipoabuso', 'abusomexico', 'tipoabusomexico',\\n        'quienabuso', 'pagoguia', 'cuantopago', 'fechaingresomexico', 'lugaringreso', 'destinofinal', 'destinomonterrey',\\n        'razonmonterrey', 'redapoyomonterrey', 'tiempored', 'intentoeeuu', 'redapoyoeeuu', 'descripcionred', 'estacionmigratoria',\\n        'agresionautoridades', 'estadoestacion', 'descripcionhechos', 'denunciaformal', 'razonnodenuncia', 'solucionbrindada',\\n        'puederegresar', 'razonnoregreso', 'padeceenfermedad', 'cualenfermedad', 'tratamientomedico', 'padecealergia', 'tipoalergia',\\n        'otroalbergue', 'ultimoalbergue', 'accesomonarca', 'razonnoacceso', 'serviciosbrindados', 'senasparticulares', 'contactoemergencia', 'ubicacioncontactoemergencia', 'observacionesfinales',\\n        'activo_cm', 'ultimafecha'\\n    ];\\n\\n    async function buscar() {\\n        try {\\n            const response = await fetch('/api/decrypt', {\\n                method: 'POST',\\n                headers: {\\n                    'Content-Type': 'application/json'\\n                },\\n                body: JSON.stringify({\\n                    nombrecompleto,\\n                    fechanacimiento\\n                })\\n            });\\n\\n            if (response.ok) {\\n                const data = await response.json();\\n                resultadoBusqueda.set(data);\\n                error.set('');\\n\\n                // Buscar servicios\\n                buscarServicios(data);\\n\\n                formSubmitted.set(true);\\n            } else {\\n                const errorData = await response.text();\\n                error.set(errorData || 'Error desconocido');\\n            }\\n        } catch (err) {\\n            error.set(\`Error de conexión: \${err.message}\`);\\n        }\\n    }\\n\\n    async function buscarServicios(data) {\\n        try {\\n            const response = await fetch('/api/decrypt_services', {\\n                method: 'POST',\\n                headers: {\\n                    'Content-Type': 'application/json'\\n                },\\n                body: JSON.stringify({\\n                    nombrecompleto,\\n                    fechanacimiento\\n                })\\n            });\\n\\n            if (response.ok) {\\n                const serviciosData = await response.json();\\n                serviciosBusqueda.set(serviciosData.data);\\n            } else {\\n                const errorData = await response.text();\\n                error.set(errorData || 'Error desconocido al buscar servicios');\\n            }\\n        } catch (err) {\\n            error.set(\`Error de conexión al buscar servicios: \${err.message}\`);\\n        }\\n    }\\n\\n    function agruparServicios(servicios) {\\n        let agrupados = {};\\n        servicios.forEach(servicio => {\\n            const area = servicio.area.toLowerCase();\\n            if (!agrupados[area]) {\\n                agrupados[area] = [];\\n            }\\n            agrupados[area].push({\\n                servicio: servicio.servicios,\\n                usuario: servicio.usuario,\\n                fechaRec: servicio.fecharec\\n            });\\n        });\\n        return Object.entries(agrupados);\\n    }\\n\\n    function capitalizeFirstLetter(string) {\\n        return string.replace(/\\\\b(\\\\w)(\\\\S*)/g, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase());\\n    }\\n<\/script>\\n\\n<div class=\\"Mc\\">\\n    <div class=\\"Hc\\">\\n        <div class=\\"hB\\">\\n            <button on:click={() => goto('/admin')}>\\n                <i class=\\"fa-solid fa-arrow-left\\"></i>\\n                <p>Inicio</p>\\n            </button>\\n            <button on:click={authHandlers.logout}>\\n                <i class=\\"fa-solid fa-right-from-bracket\\"></i>\\n                <p>Cerrar Sesión</p>\\n            </button>\\n        </div>\\n    </div>\\n</div>\\n\\n{#if !$formSubmitted}\\n<div class=\\"main-container\\">\\n    <h1>Buscar Migrante</h1>\\n    <form on:submit|preventDefault={buscar} class=\\"form-container\\">\\n        <div class=\\"form-group\\">\\n            <label for=\\"nombrecompleto\\">Nombre Completo:</label>\\n            <input type=\\"text\\" id=\\"nombrecompleto\\" bind:value={nombrecompleto} required>\\n        </div>\\n        <div class=\\"form-group\\">\\n            <label for=\\"fechanacimiento\\">Fecha de Nacimiento:</label>\\n            <input type=\\"date\\" id=\\"fechanacimiento\\" bind:value={fechanacimiento} required>\\n        </div>\\n        <button type=\\"submit\\">Buscar</button>\\n    </form>\\n\\n    {#if $error}\\n        <p class=\\"error-message\\">{$error}</p>\\n    {/if}\\n</div>\\n{/if}\\n\\n{#if $resultadoBusqueda}\\n    <div class=\\"hola\\">\\n        <h2>{$resultadoBusqueda.data[0].nombrecompleto}</h2>\\n    </div>  \\n    <div class=\\"hola2\\">\\n        <h2>{$resultadoBusqueda.data[0].fechanacimiento}</h2>\\n    </div>  \\n\\n    <div class=\\"result-container\\">  \\n    <div class=\\"photo-grid\\">\\n        {#each $resultadoBusqueda.data as migrante}\\n            {#each Object.entries(migrante) as [key, value]}\\n                {#if key.toLowerCase().includes('foto')}\\n                    <div class=\\"photo-item\\">\\n                        <span class=\\"photo-key\\">{preguntas[key] || key}:</span>\\n                        <img src={\\"data:image/jpeg;base64,\\" + value} alt=\\"Fotografía del migrante\\" class=\\"migrante-foto\\">\\n                        <!-- Log the value to inspect it -->\\n                        <p style=\\"display:none\\">{value}</p>\\n                    </div>\\n                {/if}\\n            {/each}\\n        {/each}\\n    </div>\\n</div>\\n\\n<div class=\\"info-servicios\\">\\n    <div class=\\"info-container\\">\\n        <h2 class=\\"section-title\\">Información del Migrante</h2>\\n        <div class=\\"card\\">\\n            {#each $resultadoBusqueda.data as migrante}\\n                {#each ordenCampos as campo}\\n                    {#if migrante[campo] && migrante[campo] !== 'N/A'}\\n                        <div class=\\"card-row\\">\\n                            <span class=\\"card-key\\">{preguntas[campo] || campo}:</span>\\n                            <span class=\\"card-value\\">{capitalizeFirstLetter(migrante[campo])}</span>\\n                        </div>\\n                    {/if}\\n                {/each}\\n            {/each}\\n        </div>\\n    </div>\\n\\n    <div class=\\"services-container\\">\\n        <h2 class=\\"section-title\\">Servicios</h2>\\n        <div class=\\"card\\">\\n            {#if $serviciosBusqueda && $serviciosBusqueda.length > 0}\\n                {#each agruparServicios($serviciosBusqueda) as [area, servicios]}\\n                    <div class=\\"card-row\\">\\n                        <span class=\\"card-key\\">{area.charAt(0).toUpperCase() + area.slice(1)}:</span>\\n                        {#each servicios as {servicio, usuario, fechaRec}}\\n                            <span class=\\"card-value\\">- {capitalizeFirstLetter(servicio)} ({usuario} en {fechaRec})</span>\\n                        {/each}\\n                    </div>\\n                {/each}\\n            {:else}\\n                <div class=\\"card-row\\">\\n                    <span class=\\"card-value\\">No hay servicios disponibles.</span>\\n                </div>\\n            {/if}\\n        </div>\\n    </div>\\n</div>\\n{/if}\\n\\n<style>\\n    body {\\n        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\\n        background-color: #e0e0e0;\\n        margin: 0;\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n        height: 100vh;\\n    }\\n\\n    .main-container {\\n        width: 100%;\\n        max-width: 600px;\\n        margin: auto;\\n        padding: 20px;\\n        background: #fff;\\n        border-radius: 10px;\\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\\n        text-align: center;\\n        margin-bottom: 30vh;\\n    }\\n\\n    .Mc {\\n        display: flex;\\n        flex-direction: column;\\n        min-height: 10vh;\\n        gap: 24px;\\n        padding: 24px;\\n        width: 26%;\\n        max-width: 1000px;\\n        margin: 0 auto;\\n        margin-right: 10%;\\n        font-size: 13px;\\n    }\\n\\n    .hB button {\\n        background: #d93443;\\n        color: white;\\n        padding: 15px 15px;\\n        border: none;\\n        border-radius: 4px;\\n        font-weight: 700;\\n        display: flex;\\n        align-items: center;\\n        gap: 4px;\\n    }\\n\\n    .hB button:hover {\\n        opacity: 0.7;\\n        background-color: #fa6a02;\\n        cursor: pointer;\\n    }\\n\\n    .hB {\\n        display: flex;\\n        align-items: center;\\n        gap: 10px;\\n    }\\n\\n\\n    .form-container {\\n        margin-bottom: 20px;\\n    }\\n\\n    .form-group {\\n        margin-bottom: 15px;\\n    }\\n\\n    label {\\n        display: block;\\n        font-size: 0.9em;\\n        margin-bottom: 5px;\\n        color: #333;\\n        text-align: left;\\n    }\\n\\n    input[type=\\"text\\"], input[type=\\"date\\"] {\\n        width: 100%;\\n        padding: 10px;\\n        border: 1px solid #ccc;\\n        border-radius: 5px;\\n        font-size: 1em;\\n        box-sizing: border-box;\\n    }\\n\\n    button {\\n        width: 100%;\\n        padding: 10px;\\n        background: #d93443;\\n        color: white;\\n        border: none;\\n        border-radius: 5px;\\n        cursor: pointer;\\n        font-size: 1em;\\n    }\\n\\n    button:hover {\\n        opacity: 0.7;\\n        background-color: #fa6a02;\\n        cursor: pointer;\\n    }\\n\\n    .result-container {\\n        margin-top: 20px;\\n        width: 86%;\\n        align-self: center;\\n        border-radius: 4px;\\n    }\\n\\n    .section-title {\\n        margin-top: 20px;\\n        margin-bottom: 10px;\\n        color: black;\\n        text-align: center;\\n    }\\n    .section-title1 {\\n        margin-top: 20px;\\n        margin-bottom: -10px;\\n        color: black;\\n        text-align: center;\\n    }\\n\\n    .hola{\\n        margin-top: 10px;\\n        margin-bottom: 10px;\\n        color: #d93443;\\n        text-align: center;\\n        font-size: 20px;\\n    }\\n\\n    .hola2{\\n        margin-top: -10px;\\n        margin-bottom: 10px;\\n        color: #fa6a02;\\n        text-align: center;\\n    }\\n\\n    .photo-grid {\\n        display: flex;\\n        justify-content: center;\\n        gap: 60px;\\n        margin-bottom: 20px;\\n    }\\n\\n    .photo-item {\\n        display: flex;\\n        flex-direction: column;\\n        align-items: center;\\n    }\\n\\n    .photo-key {\\n        font-weight: bold;\\n        margin-bottom: 5px;\\n        margin-top: 15px;\\n    }\\n\\n    .migrante-foto {\\n        max-width: 200px;\\n        max-height: 200px;\\n        display: block;\\n        margin-top: 10px;\\n        border-radius: 5px;\\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\\n\\n    }\\n\\n    .card {\\n        background: #f8f9fa;\\n        padding: 15px;\\n        border: 1px solid #e9ecef;\\n        border-radius: 5px;\\n        margin-bottom: 10px;\\n\\n    }\\n\\n    .card-row {\\n        display: block;\\n        padding: 5px 0;\\n    }\\n\\n    .card-key {\\n        font-weight: bold;\\n    }\\n\\n    .card-value {\\n        display: block;\\n        text-align: left;\\n        margin-left: 10px;\\n    }\\n\\n    .error-message {\\n        font-size: 1.2em;\\n        color: red;\\n        text-align: center;\\n        margin-top: 20px;\\n    }\\n\\n    .info-servicios {\\n        display: flex;\\n        gap: 20px;\\n        justify-content: space-between;\\n        margin-top: 20px;\\n        margin-right:100px;\\n        margin-left:100px;\\n    }\\n\\n    .info-container, .services-container {\\n        flex: 1;\\n        max-width: 45%;\\n    }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
function agruparServicios(servicios) {
  let agrupados = {};
  servicios.forEach((servicio) => {
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $formSubmitted, $$unsubscribe_formSubmitted;
  let $error, $$unsubscribe_error;
  let $resultadoBusqueda, $$unsubscribe_resultadoBusqueda;
  let $serviciosBusqueda, $$unsubscribe_serviciosBusqueda;
  let nombrecompleto = "";
  let fechanacimiento = "";
  let resultadoBusqueda = writable(null);
  $$unsubscribe_resultadoBusqueda = subscribe(resultadoBusqueda, (value) => $resultadoBusqueda = value);
  let serviciosBusqueda = writable(null);
  $$unsubscribe_serviciosBusqueda = subscribe(serviciosBusqueda, (value) => $serviciosBusqueda = value);
  let error = writable("");
  $$unsubscribe_error = subscribe(error, (value) => $error = value);
  let formSubmitted = writable(false);
  $$unsubscribe_formSubmitted = subscribe(formSubmitted, (value) => $formSubmitted = value);
  const preguntas = {
    fechaAtencion: "Fecha de atención",
    tipo: "Adulto, NNA, NNAnA",
    nombrecompleto: "Nombre completo",
    telefono: "Número telefónico de contacto",
    sexo: "Sexo",
    fechanacimiento: "Fecha de nacimiento",
    edad: "Edad",
    estado_migracion: "Estado de Migración",
    paisorigen: "País de origen",
    dep_est: "Departamento/Estado",
    estadocivil: "Estado Civil",
    tipopoblacion: "Tipo de población",
    documentoidentidad: "Documento de identidad",
    curp: "Si la persona cuenta con CURP, registrar el mismo en este apartado",
    tipodocmigratorio: "Tipo de documento migratorio",
    tienehijos: "¿Tiene hijos?",
    numhijos: "¿Cuántos de sus hijos están viajando con usted?",
    sabeleerescribir: "¿Usted sabe leer y escribir?",
    ultimogrado: "¿Cuál fue su último grado de estudio?",
    grado_ac: "¿Cual fue su último grado académico?",
    idiomas: "Idiomas que domina",
    otroidioma: 'Sí se seleccionó "Otro idioma", ¿Cuál es el idioma que domina?',
    fechasalidapais: "Fecha en que salió de su país de origen",
    viajando: "¿Cómo se encuentra viajando?",
    acompanante: "¿Por quién está siendo acompañada/o?",
    como_viajo: "¿Cómo viajó?",
    razonsalida: "¿Por qué razón tomó la decisión de salir de su país?",
    abusoderechos: "¿Usted sufrió de algún abuso a sus Derechos Humanos?",
    tipoabuso: "¿Qué tipo de abuso vivió?",
    abusomexico: "¿Usted vivió algún abuso o agresión en México?",
    tipoabusomexico: "¿Qué tipo de abuso o agresión vivió?",
    quienabuso: "¿Quién le ocasionó el abuso o la agresión?",
    pagoguia: "¿Usted le pagó a algún guía para viajar?",
    cuantopago: "¿Cuánto dinero pagó?",
    fechaingresomexico: "Fecha en que ingresó a México",
    lugaringreso: "¿Por dónde ingresó a México?",
    destinofinal: "¿Cuál es su destino final?",
    destinomonterrey: "Si se queda en México, ¿Su destino es Monterrey?",
    razonmonterrey: "¿Por qué pensaría quedarse en Monterrey?",
    redapoyomonterrey: "¿Cuenta con una red de apoyo en Monterrey?",
    tiempored: "Tiempo de conocer a su red de apoyo",
    intentoeeuu: "¿Usted ha intentado ingresar a Estados Unidos?",
    redapoyoeeuu: "¿Usted cuenta con una red de apoyo en Estados Unidos?",
    descripcionred: "Descripción de la red de apoyo con la que cuenta en Estados Unidos",
    estacionmigratoria: "¿Usted ha estado en alguna estación migratoria?",
    agresionautoridades: "¿Sufrió o vivió situaciones donde se sintió agredido por autoridades en las estaciones migratorias?",
    estadoestacion: "¿En cuál Estado y/o País estuvo en una estación migratoria?",
    descripcionhechos: "Descripción de los hechos",
    denunciaformal: "¿Usted interpuso una denuncia formal?",
    razonnodenuncia: "¿Por qué razón no lo hizo?",
    solucionbrindada: "¿Qué solución le brindaron?",
    puederegresar: "¿Usted puede regresar a su país?",
    razonnoregreso: "¿Por qué razón no puede regresar a su país?",
    padeceenfermedad: "¿Actualmente usted padece alguna enfermedad?",
    cualenfermedad: "¿Cuál enfermedad padece?",
    tratamientomedico: "¿Se encuentra o encontraba en algún tratamiento médico?",
    padecealergia: "¿Usted padece algún tipo de alergia?",
    tipoalergia: "Tipo de alergia o a qué es alérgico/a",
    otroalbergue: "¿Usted se ha estado en algún otro albergue?",
    ultimoalbergue: "¿Cuál fue el último albergue en el que estuvo?",
    accesomonarca: "¿Se le brindó acceso al albergue de Casa Monarca?",
    razonnoacceso: "¿Por qué se le negó el acceso al albergue?",
    serviciosbrindados: "¿Cuáles servicios se le brindaron a la persona?",
    fotofrente: "Fotografía de frente",
    fotoperfilizquierdo: "Fotografía perfil izquierdo",
    fotoperfilderecho: "Fotografía perfil derecho",
    senasparticulares: "Señas particulares",
    contactoemergencia: "Contacto de emergencia",
    ubicacioncontactoemergencia: "Geográficamente, ¿Dónde se encuentra su contacto de emergencia?",
    observacionesfinales: "Observaciones finales",
    activo_cm: "¿Activo en Casa Monarca al día de hoy?",
    ultimafecha: "Último día en Casa Monarca"
  };
  const ordenCampos = [
    "nombrecompleto",
    "fechanacimiento",
    "paisorigen",
    "tipo",
    "fechaAtencion",
    "telefono",
    "sexo",
    "edad",
    "estado_migracion",
    "dep_est",
    "estadocivil",
    "tipopoblacion",
    "documentoidentidad",
    "curp",
    "tipodocmigratorio",
    "tienehijos",
    "numhijos",
    "sabeleerescribir",
    "ultimogrado",
    "grado_ac",
    "idiomas",
    "otroidioma",
    "fechasalidapais",
    "viajando",
    "acompanante",
    "como_viajo",
    "razonsalida",
    "abusoderechos",
    "tipoabuso",
    "abusomexico",
    "tipoabusomexico",
    "quienabuso",
    "pagoguia",
    "cuantopago",
    "fechaingresomexico",
    "lugaringreso",
    "destinofinal",
    "destinomonterrey",
    "razonmonterrey",
    "redapoyomonterrey",
    "tiempored",
    "intentoeeuu",
    "redapoyoeeuu",
    "descripcionred",
    "estacionmigratoria",
    "agresionautoridades",
    "estadoestacion",
    "descripcionhechos",
    "denunciaformal",
    "razonnodenuncia",
    "solucionbrindada",
    "puederegresar",
    "razonnoregreso",
    "padeceenfermedad",
    "cualenfermedad",
    "tratamientomedico",
    "padecealergia",
    "tipoalergia",
    "otroalbergue",
    "ultimoalbergue",
    "accesomonarca",
    "razonnoacceso",
    "serviciosbrindados",
    "senasparticulares",
    "contactoemergencia",
    "ubicacioncontactoemergencia",
    "observacionesfinales",
    "activo_cm",
    "ultimafecha"
  ];
  $$result.css.add(css);
  $$unsubscribe_formSubmitted();
  $$unsubscribe_error();
  $$unsubscribe_resultadoBusqueda();
  $$unsubscribe_serviciosBusqueda();
  return `<div class="Mc svelte-1npnivj"><div class="Hc"><div class="hB svelte-1npnivj"><button class="svelte-1npnivj" data-svelte-h="svelte-92lfck"><i class="fa-solid fa-arrow-left"></i> <p>Inicio</p></button> <button class="svelte-1npnivj" data-svelte-h="svelte-1p6l6vt"><i class="fa-solid fa-right-from-bracket"></i> <p>Cerrar Sesión</p></button></div></div></div> ${!$formSubmitted ? `<div class="main-container svelte-1npnivj"><h1 data-svelte-h="svelte-zf7u9z">Buscar Migrante</h1> <form class="form-container svelte-1npnivj"><div class="form-group svelte-1npnivj"><label for="nombrecompleto" class="svelte-1npnivj" data-svelte-h="svelte-ttl2ka">Nombre Completo:</label> <input type="text" id="nombrecompleto" required class="svelte-1npnivj"${add_attribute("value", nombrecompleto, 0)}></div> <div class="form-group svelte-1npnivj"><label for="fechanacimiento" class="svelte-1npnivj" data-svelte-h="svelte-1w0esq5">Fecha de Nacimiento:</label> <input type="date" id="fechanacimiento" required class="svelte-1npnivj"${add_attribute("value", fechanacimiento, 0)}></div> <button type="submit" class="svelte-1npnivj" data-svelte-h="svelte-ouicbz">Buscar</button></form> ${$error ? `<p class="error-message svelte-1npnivj">${escape($error)}</p>` : ``}</div>` : ``} ${$resultadoBusqueda ? `<div class="hola svelte-1npnivj"><h2>${escape($resultadoBusqueda.data[0].nombrecompleto)}</h2></div> <div class="hola2 svelte-1npnivj"><h2>${escape($resultadoBusqueda.data[0].fechanacimiento)}</h2></div> <div class="result-container svelte-1npnivj"><div class="photo-grid svelte-1npnivj">${each($resultadoBusqueda.data, (migrante) => {
    return `${each(Object.entries(migrante), ([key, value]) => {
      return `${key.toLowerCase().includes("foto") ? `<div class="photo-item svelte-1npnivj"><span class="photo-key svelte-1npnivj">${escape(preguntas[key] || key)}:</span> <img${add_attribute("src", "data:image/jpeg;base64," + value, 0)} alt="Fotografía del migrante" class="migrante-foto svelte-1npnivj">  <p style="display:none">${escape(value)}</p> </div>` : ``}`;
    })}`;
  })}</div></div> <div class="info-servicios svelte-1npnivj"><div class="info-container svelte-1npnivj"><h2 class="section-title svelte-1npnivj" data-svelte-h="svelte-179nj3i">Información del Migrante</h2> <div class="card svelte-1npnivj">${each($resultadoBusqueda.data, (migrante) => {
    return `${each(ordenCampos, (campo) => {
      return `${migrante[campo] && migrante[campo] !== "N/A" ? `<div class="card-row svelte-1npnivj"><span class="card-key svelte-1npnivj">${escape(preguntas[campo] || campo)}:</span> <span class="card-value svelte-1npnivj">${escape(capitalizeFirstLetter(migrante[campo]))}</span> </div>` : ``}`;
    })}`;
  })}</div></div> <div class="services-container svelte-1npnivj"><h2 class="section-title svelte-1npnivj" data-svelte-h="svelte-1vo78la">Servicios</h2> <div class="card svelte-1npnivj">${$serviciosBusqueda && $serviciosBusqueda.length > 0 ? `${each(agruparServicios($serviciosBusqueda), ([area, servicios]) => {
    return `<div class="card-row svelte-1npnivj"><span class="card-key svelte-1npnivj">${escape(area.charAt(0).toUpperCase() + area.slice(1))}:</span> ${each(servicios, ({ servicio, usuario, fechaRec }) => {
      return `<span class="card-value svelte-1npnivj">- ${escape(capitalizeFirstLetter(servicio))} (${escape(usuario)} en ${escape(fechaRec)})</span>`;
    })} </div>`;
  })}` : `<div class="card-row svelte-1npnivj" data-svelte-h="svelte-g1jx9u"><span class="card-value svelte-1npnivj">No hay servicios disponibles.</span></div>`}</div></div></div>` : ``}`;
});
export {
  Page as default
};
