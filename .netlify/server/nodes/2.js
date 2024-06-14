

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CFvfCU0_.js","_app/immutable/chunks/scheduler.2ExYYgC5.js","_app/immutable/chunks/index.BEfN5G4a.js","_app/immutable/chunks/store.Czkyq5IA.js","_app/immutable/chunks/index.BQLYkrUj.js"];
export const stylesheets = ["_app/immutable/assets/2.DXuZhZKV.css"];
export const fonts = [];
