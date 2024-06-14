<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { authHandlers } from "../../../store/store";

    let answers = {};
    let formSubmitted = false;
    let successMessage = false;
    let errorMessage = '';

    async function handleFileInput(event, key) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                answers[key] = base64Data;
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const jsonAnswers = JSON.stringify(answers);

        try {
            const response = await fetch('/api/encrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonAnswers
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            console.log('Success:', data);
            
            formSubmitted = true;
            successMessage = true;
            setTimeout(() => {
                goto('/nivel2');
            }, 1500);

        } catch (error) {
            console.error('Error:', error);
            errorMessage = 'Error al enviar el formulario: ' + error.message;
        }
    }

    function handleCheckboxChange(event, key) {
        if (!answers[key]) {
            answers[key] = [];
        }
        if (event.target.checked) {
            answers[key].push(event.target.value);
        } else {
            const index = answers[key].indexOf(event.target.value);
            if (index > -1) {
                answers[key].splice(index, 1);
            }
        }
    }
</script>

{#if !formSubmitted}
<div class="Mc">
    <div class="Hc">
        <div class="hB">
            <button on:click={() => goto('/nivel2')}>
                <i class="fa-solid fa-arrow-left"></i>
                <p>Inicio</p>
            </button>
            <button on:click={authHandlers.logout}>
                <i class="fa-solid fa-right-from-bracket"></i>
                <p>Cerrar Sesion</p>
            </button>
        </div>
    </div>
</div>
<div class="page-container">
    <div class="form-container">
        <h1 class="title">Entrevista de ingreso al albergue Casa Monarca</h1>
        <h2 class="subtitle">Ayuda Humanitaria al Migrante, A.B.P.</h2>
        {#if errorMessage}
            <div class="error-message">{errorMessage}</div>
        {/if}
        <form on:submit={handleSubmit}>
            <div class="form-group">
                <label for="fecha-atencion" class="pregunta">*Fecha de atención</label>
                <input type="date" id="fecha-atencion" on:input={(e) => answers.fechaAtencion = e.target.value} required>
            </div>

            <div class="form-group">
                <label class="pregunta">Adulto, NNA, NNAnA</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="tipo" value="Adulto" on:change={(e) => answers.tipo = e.target.value} required> Adulto.</label>
                    <label class="radio-label"><input type="radio" name="tipo" value="Niña acompañada" on:change={(e) => answers.tipo = e.target.value}> Niña acompañada.</label>
                    <label class="radio-label"><input type="radio" name="tipo" value="Niño acompañado" on:change={(e) => answers.tipo = e.target.value}> Niño acompañado.</label>
                    <label class="radio-label"><input type="radio" name="tipo" value="Adolescente acompañado" on:change={(e) => answers.tipo = e.target.value}> Adolescente acompañado.</label>
                    <label class="radio-label"><input type="radio" name="tipo" value="Niña no acompañada" on:change={(e) => answers.tipo = e.target.value}> Niña no acompañada.</label>
                    <label class="radio-label"><input type="radio" name="tipo" value="Niño no acompañado" on:change={(e) => answers.tipo = e.target.value}> Niño no acompañado.</label>
                    <label class="radio-label"><input type="radio" name="tipo" value="Adolescente no acompañado" on:change={(e) => answers.tipo = e.target.value}> Adolescente no acompañado.</label>
                </div>
            </div>

            <div class="form-group">
                <label for="nombre-completo">*Nombre completo</label>
                <input type="text" id="nombre-completo" on:input={(e) => answers.nombreCompleto = e.target.value} required>
            </div>

            <div class="form-group">
                <label for="telefono">Número telefónico de contacto</label>
                <input type="tel" id="telefono" on:input={(e) => answers.telefono = e.target.value}>
            </div>

            <div class="form-group">
                <label>*Sexo</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="sexo" value="Mujer LGBTTTIQ+" on:change={(e) => answers.sexo = e.target.value} required> Mujer LGBTTTIQ+.</label>
                    <label class="radio-label"><input type="radio" name="sexo" value="Mujer" on:change={(e) => answers.sexo = e.target.value}> Mujer.</label>
                    <label class="radio-label"><input type="radio" name="sexo" value="Hombre LGBTTTIQ+" on:change={(e) => answers.sexo = e.target.value}> Hombre LGBTTTIQ+.</label>
                    <label class="radio-label"><input type="radio" name="sexo" value="Hombre" on:change={(e) => answers.sexo = e.target.value}> Hombre.</label>
                </div>
            </div>

            <div class="form-group">
                <label for="fecha-nacimiento">*Fecha de nacimiento</label>
                <input type="date" id="fecha-nacimiento" on:input={(e) => answers.fechaNacimiento = e.target.value} required>
            </div>

            <div class="form-group">
                <label for="edad">Edad</label>
                <input type="number" id="edad" on:input={(e) => answers.edad = e.target.value}>
            </div>

            <div class="form-group">
                <label>Tipo de Población (Estado de Migración)</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="estado_migracion" value="Reubicada" on:change={(e) => answers.estado_migracion = e.target.value}>Reubicada</label>
                    <label class="radio-label"><input type="radio" name="estado_migracion" value="In Situ" on:change={(e) => answers.estado_migracion = e.target.value}>In Situ</label>
                </div>
            </div>

            <div class="form-group">
                <label for="pais-origen">País de origen</label>
                <select id="pais-origen" on:change={(e) => answers.paisOrigen = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="México">México</option>
                    <option value="Estados Unidos de América">Estados Unidos de América</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Honduras">Honduras</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Haití">Haití</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Afganistan">Afganistan</option>
                    <option value="Siria">Siria</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Perú">Perú</option>
                    <option value="Guayana Francesa">Guayana Francesa</option>
                    <option value="Belice">Belice</option>
                    <option value="Panamá">Panamá</option>
                    <option value="Ecuador">Ecuador</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="dep_est">Departamento/Estado</label>
                <input type="text" id="dep_est" on:input={(e) => answers.dep_est = e.target.value}>
            </div>

            <div class="form-group">
                <label for="estado-civil">Estado Civil</label>
                <select id="estado-civil" on:change={(e) => answers.estadoCivil = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="Casado">Casado</option>
                    <option value="Divorciado">Divorciado</option>
                    <option value="Soltero">Soltero</option>
                    <option value="Separado">Separado</option>
                    <option value="Viudo">Viudo</option>
                    <option value="Unión Libre">Unión Libre</option>
                </select>
            </div>

            <div class="form-group">
                <label>Tipo de población</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="tipoPoblacion" value="Tránsito" on:change={(e) => answers.tipoPoblacion = e.target.value}> Tránsito</label>
                    <label class="radio-label"><input type="radio" name="tipoPoblacion" value="MPP" on:change={(e) => answers.tipoPoblacion = e.target.value}> MPP</label>
                    <label class="radio-label"><input type="radio" name="tipoPoblacion" value="Retornados" on:change={(e) => answers.tipoPoblacion = e.target.value}> Retornados</label>
                    <label class="radio-label"><input type="radio" name="tipoPoblacion" value="Refugiados" on:change={(e) => answers.tipoPoblacion = e.target.value}> Refugiados</label>
                    <label class="radio-label"><input type="radio" name="tipoPoblacion" value="Desplazados internos" on:change={(e) => answers.tipoPoblacion = e.target.value}> Desplazados internos</label>
                    <label class="radio-label"><input type="radio" name="tipoPoblacion" value="Otra movilidad" on:change={(e) => answers.tipoPoblacion = e.target.value}> Otra movilidad</label>
                </div>
            </div>

            <div class="form-group">
                <label for="documento-identidad">Documento de identidad</label>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="Tarjeta de identidad de país de origen" on:change={(e) => handleCheckboxChange(e, 'documentoIdentidad')}> 
                        Tarjeta de identidad de país de origen
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Certificado de nacionalidad / Acta de Nacimiento" on:change={(e) => handleCheckboxChange(e, 'documentoIdentidad')}> 
                        Certificado de nacionalidad / Acta de Nacimiento
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Pasaporte" on:change={(e) => handleCheckboxChange(e, 'documentoIdentidad')}> 
                        Pasaporte
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="CURP" on:change={(e) => handleCheckboxChange(e, 'documentoIdentidad')}> 
                        CURP
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Documento Migratorio" on:change={(e) => handleCheckboxChange(e, 'documentoIdentidad')}> 
                        Documento Migratorio
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Ningún documento" on:change={(e) => handleCheckboxChange(e, 'documentoIdentidad')}> 
                        Ningún documento
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="curp">Si la persona cuenta con CURP, registrar el mismo en este apartado</label>
                <input type="text" id="curp" on:input={(e) => answers.curp = e.target.value}>
            </div>

            <div class="form-group">
                <label for="tipo-doc-migratorio">Tipo de documento migratorio</label>
                <select id="tipo-doc-migratorio" on:change={(e) => answers.tipoDocMigratorio = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="Tarjeta de Visitante por Razones Humanitarias">Tarjeta de Visitante por Razones Humanitarias</option>
                    <option value="Tarjeta de Residente Temporal">Tarjeta de Residente Temporal</option>
                    <option value="Tarjeta de Residente Permanente">Tarjeta de Residente Permanente</option>
                    <option value="Constancia de Reconocimiento de la Condición de Refugiado">Constancia de Reconocimiento de la Condición de Refugiado</option>
                </select>
            </div>

            <div class="form-group">
                <label>¿Tiene hijos?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="tieneHijos" value="Si" on:change={(e) => answers.tieneHijos = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="tieneHijos" value="No" on:change={(e) => answers.tieneHijos = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="num-hijos">¿Cuántos de sus hijos están viajando con usted?</label>
                <select id="num-hijos" on:change={(e) => answers.numHijos = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="1 hijo/a">1 hijo/a</option>
                    <option value="2 hijos/as">2 hijos/as</option>
                    <option value="3 hijos/as">3 hijos/as</option>
                    <option value="4 hijos/as">4 hijos/as</option>
                    <option value="No viajan conmigo">No viajan conmigo</option>
                </select>
            </div>

            <div class="form-group">
                <label>¿Usted sabe leer y escribir?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="sabeLeerEscribir" value="Si" on:change={(e) => answers.sabeLeerEscribir = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="sabeLeerEscribir" value="No" on:change={(e) => answers.sabeLeerEscribir = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="ultimo-grado">¿Cuál fue su último grado de estudio?</label>
                <select id="ultimo-grado" on:change={(e) => answers.ultimoGrado = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="Preescolar">Preescolar</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Preparatoria">Preparatoria</option>
                    <option value="Bachillerato técnico">Bachillerato técnico</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Sin escolarizar">Sin escolarizar</option>
                </select>
            </div>

            <div class="form-group">
                <label for="grado_ac">¿Cual fue su último grado académico?</label>
                <input type="text" id="grado_ac" on:input={(e) => answers.grado_ac = e.target.value}>
            </div>

            <div class="form-group">
                <label for="idiomas">Idiomas que domina</label>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="Inglés" on:change={(e) => handleCheckboxChange(e, 'idiomas')}> 
                        Inglés
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Español" on:change={(e) => handleCheckboxChange(e, 'idiomas')}> 
                        Español
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Francés" on:change={(e) => handleCheckboxChange(e, 'idiomas')}> 
                        Francés
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Criollo haitiano" on:change={(e) => handleCheckboxChange(e, 'idiomas')}> 
                        Criollo haitiano
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Garífona" on:change={(e) => handleCheckboxChange(e, 'idiomas')}> 
                        Garífona
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Otro Idioma" on:change={(e) => handleCheckboxChange(e, 'idiomas')}> 
                        Otro Idioma
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Portugues" on:change={(e) => handleCheckboxChange(e, 'idiomas')}> 
                        Portugues
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="otro-idioma">Sí se seleccionó "Otro idioma", ¿Cuál es el idioma que domina?</label>
                <input type="text" id="otro-idioma" on:input={(e) => answers.otroIdioma = e.target.value}>
            </div>

            <div class="form-group">
                <label for="fecha-salida-pais">Fecha en que salió de su país de origen</label>
                <input type="date" id="fecha-salida-pais" on:input={(e) => answers.fechaSalidaPais = e.target.value}>
            </div>

            <div class="form-group">
                <label>¿Cómo se encuentra viajando?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="viajando" value="Sola/o" on:change={(e) => answers.viajando = e.target.value}> Sola/o</label>
                    <label class="radio-label"><input type="radio" name="viajando" value="Acompañada/o" on:change={(e) => answers.viajando = e.target.value}> Acompañada/o</label>
                </div>
            </div>

            <div class="form-group">
                <label for="acompanante">¿Por quién está siendo acompañada/o?</label>
                <select id="acompanante" on:change={(e) => answers.acompanante = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="Hija/o">Hija/o</option>
                    <option value="Pareja">Pareja</option>
                    <option value="Pareja e hija/o">Pareja e hija/o</option>
                    <option value="Mamá">Mamá</option>
                    <option value="Papá">Papá</option>
                    <option value="Mamá y papá">Mamá y papá</option>
                    <option value="Prima/o">Prima/o</option>
                    <option value="Amiga/o">Amiga/o</option>
                    <option value="Otro pariente">Otro pariente</option>
                </select>
            </div>

            <div class="form-group">
                <label for="como_viajo">¿Cómo viajó?</label>
                <input type="text" id="como_viajo" on:input={(e) => answers.como_viajo = e.target.value}>
            </div>

            <div class="form-group">
                <label for="razon-salida">¿Por qué razón tomó la decisión de salir de su país?</label>
                <textarea id="razon-salida" on:input={(e) => answers.razonSalida = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>¿Usted sufrió de algún abuso a sus Derechos Humanos?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="abusoDerechos" value="Si" on:change={(e) => answers.abusoDerechos = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="abusoDerechos" value="No" on:change={(e) => answers.abusoDerechos = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="tipo-abuso">¿Qué tipo de abuso vivió?</label>
                <textarea id="tipo-abuso" on:input={(e) => answers.tipoAbuso = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>¿Usted vivió algún abuso o agresión en México?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="abusoMexico" value="Si" on:change={(e) => answers.abusoMexico = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="abusoMexico" value="No" on:change={(e) => answers.abusoMexico = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="tipo-abuso-mexico">¿Qué tipo de abuso o agresión vivió?</label>
                <textarea id="tipo-abuso-mexico" on:input={(e) => answers.tipoAbusoMexico = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label for="quien-abuso">¿Quién le ocasionó el abuso o la agresión?</label>
                <input type="text" id="quien-abuso" on:input={(e) => answers.quienAbuso = e.target.value}>
            </div>

            <div class="form-group">
                <label>¿Usted le pagó a algún guía para viajar?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="pagoGuia" value="Si" on:change={(e) => answers.pagoGuia = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="pagoGuia" value="No" on:change={(e) => answers.pagoGuia = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="cuanto-pago">¿Cuánto dinero pagó?</label>
                <select id="cuanto-pago" on:change={(e) => answers.cuantoPago = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="Menos de 20,000 MX. (1,000 US)">Menos de 20,000 MX. (1,000 US)</option>
                    <option value="20,000 a 60,000 MX (1,000 a 3,000 US)">20,000 a 60,000 MX (1,000 a 3,000 US)</option>
                    <option value="61,000 a 100,000 MX. (3,000 a 5,000 US)">61,000 a 100,000 MX. (3,000 a 5,000 US)</option>
                    <option value="Más de 100,000 MX (5,000 US)">Más de 100,000 MX (5,000 US)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="fecha-ingreso-mexico">Fecha en que ingresó a México</label>
                <input type="date" id="fecha-ingreso-mexico" on:input={(e) => answers.fechaIngresoMexico = e.target.value}>
            </div>

            <div class="form-group">
                <label for="lugar-ingreso">¿Por dónde ingresó a México?</label>
                <select id="lugar-ingreso" on:change={(e) => answers.lugarIngreso = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="Tapachula">Tapachula</option>
                    <option value="Tenosique">Tenosique</option>
                    <option value="Chetumal">Chetumal</option>
                    <option value="Palenque">Palenque</option>
                    <option value="Matamoros">Matamoros</option>
                    <option value="Reynosa">Reynosa</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Chiapas">Chiapas</option>
                </select>
            </div>

            <div class="form-group">
                <label for="destino-final">¿Cuál es su destino final?</label>
                <select id="destino-final" on:change={(e) => answers.destinoFinal = e.target.value}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="México">México</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Regresar a mi país de origen">Regresar a mi país de origen</option>
                </select>
            </div>

            <div class="form-group">
                <label>Si se queda en México, ¿Su destino es Monterrey?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="destinoMonterrey" value="Si" on:change={(e) => answers.destinoMonterrey = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="destinoMonterrey" value="No" on:change={(e) => answers.destinoMonterrey = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="razon-monterrey">¿Por qué pensaría quedarse en Monterrey?</label>
                <textarea id="razon-monterrey" on:input={(e) => answers.razonMonterrey = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>¿Cuenta con una red de apoyo en Monterrey?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="redApoyoMonterrey" value="Si" on:change={(e) => answers.redApoyoMonterrey = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="redApoyoMonterrey" value="No" on:change={(e) => answers.redApoyoMonterrey = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="tiempo-red">Tiempo de conocer a su red de apoyo</label>
                <input type="text" id="tiempo-red" on:input={(e) => answers.tiempoRed = e.target.value}>
            </div>

            <div class="form-group">
                <label>¿Usted ha intentado ingresar a Estados Unidos?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="intentoEEUU" value="Si" on:change={(e) => answers.intentoEEUU = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="intentoEEUU" value="No" on:change={(e) => answers.intentoEEUU = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label>¿Usted cuenta con una red de apoyo en Estados Unidos?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="redApoyoEEUU" value="Si" on:change={(e) => answers.redApoyoEEUU = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="redApoyoEEUU" value="No" on:change={(e) => answers.redApoyoEEUU = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="descripcion-red">Descripción de la red de apoyo con la que cuenta en Estados Unidos</label>
                <textarea id="descripcion-red" on:input={(e) => answers.descripcionRed = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>¿Usted ha estado en alguna estación migratoria?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="estacionMigratoria" value="Si" on:change={(e) => answers.estacionMigratoria = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="estacionMigratoria" value="No" on:change={(e) => answers.estacionMigratoria = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label>¿Sufrió o vivió situaciones donde se sintió agredido por autoridades en las estaciones migratorias?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="agresionAutoridades" value="Si" on:change={(e) => answers.agresionAutoridades = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="agresionAutoridades" value="No" on:change={(e) => answers.agresionAutoridades = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="estado-estacion">¿En cuál Estado y/o País estuvo en una estación migratoria?</label>
                <input type="text" id="estado-estacion" on:input={(e) => answers.estadoEstacion = e.target.value}>
            </div>

            <div class="form-group">
                <label for="descripcion-hechos">Descripción de los hechos</label>
                <textarea id="descripcion-hechos" on:input={(e) => answers.descripcionHechos = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>Ante las vivencias de abuso de autoridad, agresiones y vulnerabilidad a Derechos Humanos, ¿Usted interpuso una denuncia formal?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="denunciaFormal" value="Si" on:change={(e) => answers.denunciaFormal = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="denunciaFormal" value="No" on:change={(e) => answers.denunciaFormal = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="razon-no-denuncia">¿Por qué razón no lo hizo?</label>
                <textarea id="razon-no-denuncia" on:input={(e) => answers.razonNoDenuncia = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label for="solucion-brindada">¿Qué solución le brindaron?</label>
                <textarea id="solucion-brindada" on:input={(e) => answers.solucionBrindada = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>¿Usted puede regresar a su país?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="puedeRegresar" value="Si" on:change={(e) => answers.puedeRegresar = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="puedeRegresar" value="No" on:change={(e) => answers.puedeRegresar = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="razon-no-regreso">¿Por qué razón no puede regresar a su país?</label>
                <textarea id="razon-no-regreso" on:input={(e) => answers.razonNoRegreso = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>¿Actualmente usted padece alguna enfermedad?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="padeceEnfermedad" value="Si" on:change={(e) => answers.padeceEnfermedad = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="padeceEnfermedad" value="No" on:change={(e) => answers.padeceEnfermedad = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="cual-enfermedad">¿Cuál enfermedad padece?</label>
                <input type="text" id="cual-enfermedad" on:input={(e) => answers.cualEnfermedad = e.target.value}>
            </div>

            <div class="form-group">
                <label for="tratamiento-medico">¿Se encuentra o encontraba en algún tratamiento médico?</label>
                <textarea id="tratamiento-medico" on:input={(e) => answers.tratamientoMedico = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label>¿Usted padece algún tipo de alergia?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="padeceAlergia" value="Si" on:change={(e) => answers.padeceAlergia = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="padeceAlergia" value="No" on:change={(e) => answers.padeceAlergia = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="tipo-alergia">Tipo de alergia o a qué es alérgico/a</label>
                <input type="text" id="tipo-alergia" on:input={(e) => answers.tipoAlergia = e.target.value}>
            </div>

            <div class="form-group">
                <label>En su trayecto por México, ¿Usted se ha estado en algún otro albergue?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="otroAlbergue" value="Si" on:change={(e) => answers.otroAlbergue = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="otroAlbergue" value="No" on:change={(e) => answers.otroAlbergue = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="ultimo-albergue">¿Cuál fue el último albergue en el que estuvo?</label>
                <input type="text" id="ultimo-albergue" on:input={(e) => answers.ultimoAlbergue = e.target.value}>
            </div>

            <div class="form-group">
                <label>¿Se le brindó acceso al albergue de Casa Monarca?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="accesoMonarca" value="Si" on:change={(e) => answers.accesoMonarca = e.target.value}> Sí</label>
                    <label class="radio-label"><input type="radio" name="accesoMonarca" value="No" on:change={(e) => answers.accesoMonarca = e.target.value}> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="razon-no-acceso">¿Por qué se le negó el acceso al albergue?</label>
                <textarea id="razon-no-acceso" on:input={(e) => answers.razonNoAcceso = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label for="servicios-brindados">¿Cuáles servicios se le brindaron a la persona?</label>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" value="Agua y alimento" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Agua y alimento
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Alimento" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Alimento
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Kit de higiene" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Kit de higiene
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Ropa y calzado" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Ropa y calzado
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Acceso a higiene (Regadera)" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Acceso a higiene (Regadera)
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Asesoría legal" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Asesoría legal
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Orientación legal" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Orientación legal
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Orientación en búsqueda de empleo" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Orientación en búsqueda de empleo
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Orientación en el acceso a la educación" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Orientación en el acceso a la educación
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Orientación en la búsqueda de vivienda" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Orientación en la búsqueda de vivienda
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Orientación para acceder a servicios de salud" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Orientación para acceder a servicios de salud
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Orientación a servicios priosicológicos" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Orientación a servicios priosicológicos
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Canalización a servicios pricológicos" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Canalización a servicios pricológicos
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="Atención psicosocial" on:change={(e) => handleCheckboxChange(e, 'serviciosBrindados')}> 
                        Atención psicosocial
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="foto-frente">Fotografía de frente</label>
                <input type="file" id="foto-frente" accept="image/*" on:change={(e) => handleFileInput(e, 'fotoFrente')}>
            </div>
            <div class="form-group">
                <label for="foto-perfil-izquierdo">Fotografía perfil izquierdo</label>
                <input type="file" id="foto-perfil-izquierdo" accept="image/*" on:change={(e) => handleFileInput(e, 'fotoPerfilIzquierdo')}>
            </div>
            <div class="form-group">
                <label for="foto-perfil-derecho">Fotografía perfil derecho</label>
                <input type="file" id="foto-perfil-derecho" accept="image/*" on:change={(e) => handleFileInput(e, 'fotoPerfilDerecho')}>
            </div>

            <div class="form-group">
                <label for="senas-particulares">Señas particulares</label>
                <textarea id="senas-particulares" on:input={(e) => answers.senasParticulares = e.target.value}></textarea>
            </div>

            <div class="form-group">
                <label for="contacto-emergencia">Contacto de emergencia</label>
                <input type="text" id="contacto-emergencia" on:input={(e) => answers.contactoEmergencia = e.target.value}>
            </div>

            <div class="form-group">
                <label for="ubicacion-contacto-emergencia">Geográficamente, ¿Dónde se encuentra su contacto de emergencia?</label>
                <input type="text" id="ubicacion-contacto-emergencia" on:input={(e) => answers.ubicacionContactoEmergencia = e.target.value}>
            </div>

            <div class="form-group">
                <label for="observaciones-finales">Observaciones finales</label>
                <textarea id="observaciones-finales" on:input={(e) => answers.observacionesFinales = e.target.value}></textarea>
            </div>

            <button type="submit">Enviar</button>
        </form>
    </div>
</div>
{/if}

{#if successMessage}
    <div class="success-message">
        El formulario fue enviado con éxito. Redirigiendo al menú de Admin...
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
        padding: 15px;
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

    .page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .form-container {
        max-width: 800px;
        width: 100%;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        max-height: 100vh;
        margin: 20px;
    }
    .title, .subtitle {
        text-align: center;
    }
    .title {
        font-size: 1.5em;
        color: #d93443;
        margin-bottom: 0;
    }
    .subtitle {
        font-size: 1.2em;
        color: #fa6a02;
        margin-top: 0;
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
    }
    .radio-group {
        display: flex;
        flex-wrap: wrap;
    }
    .radio-label {
        flex: 1 1 45%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .radio-label input {
        margin-right: 10px;
    }
    input[type="text"], input[type="tel"], input[type="date"], input[type="file"], textarea, select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1em;
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
    .success-message {
        font-size: 1.2em;
        color: black;
        text-align: center;
        margin-top: 20px;
    }
    .error-message {
        font-size: 1.2em;
        color: red;
        text-align: center;
        margin-top: 20px;
    }
</style>
