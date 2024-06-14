

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mortal/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.B4xrKrNE.js","_app/immutable/chunks/scheduler.2ExYYgC5.js","_app/immutable/chunks/index.BEfN5G4a.js","_app/immutable/chunks/store.Czkyq5IA.js","_app/immutable/chunks/index.BQLYkrUj.js","_app/immutable/chunks/entry.BGfAofGz.js"];
export const stylesheets = ["_app/immutable/assets/16.BcXLKpiS.css"];
export const fonts = [];
