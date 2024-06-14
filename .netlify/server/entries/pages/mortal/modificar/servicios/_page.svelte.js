import { c as create_ssr_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/store.js";
import "../../../../../chunks/client.js";
const css = {
  code: ".mainContainer.svelte-oj133b.svelte-oj133b{display:flex;flex-direction:column;min-height:100vh;gap:24px;padding:24px;width:100%;max-width:1000px;margin:0 auto}.headerContainer.svelte-oj133b.svelte-oj133b{display:flex;align-items:center;justify-content:space-between}.headerContainer.svelte-oj133b button.svelte-oj133b{background:#d93443;color:white;padding:15px 15px;border:none;border-radius:4px;font-weight:700;display:flex;align-items:center;gap:4px}.headerContainer.svelte-oj133b button.svelte-oj133b:hover{opacity:0.7;background-color:#fa6a02;cursor:pointer}.headerBtns.svelte-oj133b.svelte-oj133b{display:flex;align-items:center;gap:10px}.contentContainer.svelte-oj133b.svelte-oj133b{display:flex;flex:1;justify-content:center;align-items:center;width:100%}.imagesContainer.svelte-oj133b.svelte-oj133b{display:flex;justify-content:center;gap:50px;cursor:pointer}.container.svelte-oj133b.svelte-oj133b{display:flex;position:relative;flex-direction:column;align-items:center;width:25vh;height:30vh;cursor:pointer}.textContainer.svelte-oj133b.svelte-oj133b{position:absolute;top:10px;left:50%;transform:translateX(-50%)}.iconContainer.svelte-oj133b.svelte-oj133b{display:flex;flex:1;justify-content:center;align-items:center;width:100%}.iconContainer.svelte-oj133b>i.svelte-oj133b{font-size:500%}.texto.svelte-oj133b.svelte-oj133b{margin:0;text-align:center;font-size:25px;margin-top:-40px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import { authHandlers } from \\"../../../../store/store\\";\\n    import { goto } from '$app/navigation';\\n\\n<\/script>\\n\\n\\n<div class=\\"mainContainer\\">\\n    <div class=\\"headerContainer\\">\\n        <h1>Servicios</h1>\\n        <div class=\\"headerBtns\\">\\n            <button on:click={() => goto('/mortal/modificar')}>\\n                <i class=\\"fa-solid fa-arrow-left\\"></i>\\n                <p>Regresar</p>\\n            </button>\\n\\n            <button on:click={authHandlers.logout}>\\n                <i class=\\"fa-solid fa-right-from-bracket\\"></i>\\n                <p>Cerrar Sesion</p>\\n            </button>\\n        </div>\\n    </div>\\n    <div class=\\"contentContainer\\">\\n        <div class=\\"imagesContainer\\">\\n            <div class=\\"container\\" on:click={() => goto('/mortal/modificar/servicios/inclusion')}>\\n                <div class=\\"textContainer\\">\\n                    <p class=\\"texto\\">Inclusión</p>\\n                </div>\\n                <div class=\\"iconContainer\\">\\n                    <i class=\\"fa-solid fa-user-group\\"></i>\\n                </div>\\n            </div>\\n            <div class=\\"container\\" on:click={() => goto('/mortal/modificar/servicios/reubicacion')}>\\n                <div class=\\"textContainer\\">\\n                    <p class=\\"texto\\">Reubicación</p>\\n                </div>\\n                <div class=\\"iconContainer\\">\\n                    <i class=\\"fa-solid fa-arrows-rotate\\"></i>\\n                </div>\\n            </div>\\n            <div class=\\"container\\" on:click={() => goto('/mortal/modificar/servicios/educacion')}>\\n                <div class=\\"textContainer\\">\\n                    <p class=\\"texto\\">Educación</p>\\n                </div>\\n                <div class=\\"iconContainer\\">\\n                    <i class=\\"fa-solid fa-book\\"></i>\\n                </div>\\n            </div>\\n            <div class=\\"container\\" on:click={() => goto('/mortal/modificar/servicios/empleabilidad')}>\\n                <div class=\\"textContainer\\">\\n                    <p class=\\"texto\\">Empleabilidad</p>\\n                </div>\\n                <div class=\\"iconContainer\\">\\n                    <i class=\\"fa-solid fa-briefcase\\"></i>\\n                </div>\\n            </div>\\n            <div class=\\"container\\" on:click={() => goto('/mortal/modificar/servicios/saludmental')}>\\n                <div class=\\"textContainer\\">\\n                    <p class=\\"texto\\">Salud Mental</p>\\n                </div>\\n                <div class=\\"iconContainer\\">\\n                    <i class=\\"fa-solid fa-brain\\"></i>\\n                </div>\\n            </div>\\n        </div>\\n    </div>\\n</div>\\n\\n<style>\\n    .mainContainer {\\n        display: flex;\\n        flex-direction: column;\\n        min-height: 100vh;\\n        gap: 24px;\\n        padding: 24px;\\n        width: 100%;\\n        max-width: 1000px;\\n        margin: 0 auto;\\n    }\\n\\n    .headerContainer {\\n        display: flex;\\n        align-items: center;\\n        justify-content: space-between;\\n    }\\n\\n    .headerContainer button {\\n        background: #d93443;\\n        color: white;\\n        padding: 15px 15px;\\n        border: none;\\n        border-radius: 4px;\\n        font-weight: 700;\\n        display: flex;\\n        align-items: center;\\n        gap: 4px;\\n    }\\n\\n    .headerContainer button:hover {\\n        opacity: 0.7;\\n        background-color: #fa6a02;\\n        cursor: pointer;\\n    }\\n\\n    .headerBtns {\\n        display: flex;\\n        align-items: center;\\n        gap: 10px;\\n    }\\n\\n    .contentContainer {\\n        display: flex;\\n        flex: 1;\\n        justify-content: center;\\n        align-items: center;\\n        width: 100%;\\n    }\\n\\n    .imagesContainer {\\n        display: flex;\\n        justify-content: center;\\n        gap: 50px;\\n        cursor: pointer;\\n    }\\n\\n    .container {\\n        display: flex;\\n        position: relative;\\n        flex-direction: column;\\n        align-items: center;\\n        width: 25vh;\\n        height: 30vh;\\n        cursor: pointer;\\n    }\\n\\n    .textContainer {\\n        position: absolute;\\n        top: 10px; /* Adjust as needed to position the text */\\n        left: 50%;\\n        transform: translateX(-50%);\\n    }\\n\\n    .iconContainer {\\n        display: flex;\\n        flex: 1;\\n        justify-content: center;\\n        align-items: center;\\n        width: 100%;\\n    }\\n\\n    .iconContainer > i {\\n        font-size: 500%;\\n    }\\n\\n    .texto {\\n        margin: 0; /* Remove margin */\\n        text-align: center;\\n        font-size: 25px;\\n        margin-top: -40px;\\n    }\\n</style>"],"names":[],"mappings":"AAqEI,0CAAe,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KAAK,CACjB,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IACd,CAEA,4CAAiB,CACb,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aACrB,CAEA,8BAAgB,CAAC,oBAAO,CACpB,UAAU,CAAE,OAAO,CACnB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GACT,CAEA,8BAAgB,CAAC,oBAAM,MAAO,CAC1B,OAAO,CAAE,GAAG,CACZ,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,OACZ,CAEA,uCAAY,CACR,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IACT,CAEA,6CAAkB,CACd,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IACX,CAEA,4CAAiB,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,OACZ,CAEA,sCAAW,CACP,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,QAAQ,CAClB,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OACZ,CAEA,0CAAe,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAC9B,CAEA,0CAAe,CACX,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IACX,CAEA,4BAAc,CAAG,eAAE,CACf,SAAS,CAAE,IACf,CAEA,kCAAO,CACH,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,KAChB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="mainContainer svelte-oj133b"><div class="headerContainer svelte-oj133b"><h1 data-svelte-h="svelte-13rcwlp">Servicios</h1> <div class="headerBtns svelte-oj133b"><button class="svelte-oj133b" data-svelte-h="svelte-gxqk2l"><i class="fa-solid fa-arrow-left"></i> <p>Regresar</p></button> <button class="svelte-oj133b" data-svelte-h="svelte-g014xp"><i class="fa-solid fa-right-from-bracket"></i> <p>Cerrar Sesion</p></button></div></div> <div class="contentContainer svelte-oj133b"><div class="imagesContainer svelte-oj133b"><div class="container svelte-oj133b" data-svelte-h="svelte-pqamoc"><div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Inclusión</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-user-group svelte-oj133b"></i></div></div> <div class="container svelte-oj133b" data-svelte-h="svelte-1clq1t3"><div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Reubicación</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-arrows-rotate svelte-oj133b"></i></div></div> <div class="container svelte-oj133b" data-svelte-h="svelte-c0ca36"><div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Educación</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-book svelte-oj133b"></i></div></div> <div class="container svelte-oj133b" data-svelte-h="svelte-1nnnj4z"><div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Empleabilidad</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-briefcase svelte-oj133b"></i></div></div> <div class="container svelte-oj133b" data-svelte-h="svelte-1mxvpd"><div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Salud Mental</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-brain svelte-oj133b"></i></div></div></div></div> </div>`;
});
export {
  Page as default
};
