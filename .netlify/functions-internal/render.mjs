import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["evolucion_ingresos.html","favicon.png","pruebanec.png"]),
	mimeTypes: {".html":"text/html",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BVmKNeNH.js","app":"_app/immutable/entry/app.Bl6sx9J2.js","imports":["_app/immutable/entry/start.BVmKNeNH.js","_app/immutable/chunks/entry.BGfAofGz.js","_app/immutable/chunks/scheduler.2ExYYgC5.js","_app/immutable/chunks/index.BQLYkrUj.js","_app/immutable/entry/app.Bl6sx9J2.js","_app/immutable/chunks/scheduler.2ExYYgC5.js","_app/immutable/chunks/index.BEfN5G4a.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js')),
			__memo(() => import('../server/nodes/14.js')),
			__memo(() => import('../server/nodes/15.js')),
			__memo(() => import('../server/nodes/16.js')),
			__memo(() => import('../server/nodes/17.js')),
			__memo(() => import('../server/nodes/18.js')),
			__memo(() => import('../server/nodes/19.js')),
			__memo(() => import('../server/nodes/20.js')),
			__memo(() => import('../server/nodes/21.js')),
			__memo(() => import('../server/nodes/22.js')),
			__memo(() => import('../server/nodes/23.js')),
			__memo(() => import('../server/nodes/24.js')),
			__memo(() => import('../server/nodes/25.js')),
			__memo(() => import('../server/nodes/26.js')),
			__memo(() => import('../server/nodes/27.js')),
			__memo(() => import('../server/nodes/28.js')),
			__memo(() => import('../server/nodes/29.js')),
			__memo(() => import('../server/nodes/30.js')),
			__memo(() => import('../server/nodes/31.js')),
			__memo(() => import('../server/nodes/32.js')),
			__memo(() => import('../server/nodes/33.js')),
			__memo(() => import('../server/nodes/34.js')),
			__memo(() => import('../server/nodes/35.js')),
			__memo(() => import('../server/nodes/36.js')),
			__memo(() => import('../server/nodes/37.js')),
			__memo(() => import('../server/nodes/38.js')),
			__memo(() => import('../server/nodes/39.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin/ajustes",
				pattern: /^\/admin\/ajustes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/alta",
				pattern: /^\/admin\/alta\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/buscar",
				pattern: /^\/admin\/buscar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/modificar",
				pattern: /^\/admin\/modificar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/modificar/servicios",
				pattern: /^\/admin\/modificar\/servicios\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/modificar/servicios/educacion",
				pattern: /^\/admin\/modificar\/servicios\/educacion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/modificar/servicios/empleabilidad",
				pattern: /^\/admin\/modificar\/servicios\/empleabilidad\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/modificar/servicios/inclusion",
				pattern: /^\/admin\/modificar\/servicios\/inclusion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/modificar/servicios/reubicacion",
				pattern: /^\/admin\/modificar\/servicios\/reubicacion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/modificar/servicios/saludmental",
				pattern: /^\/admin\/modificar\/servicios\/saludmental\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/reporte",
				pattern: /^\/admin\/reporte\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/usuarios",
				pattern: /^\/admin\/usuarios\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/api/encrypt",
				pattern: /^\/api\/encrypt\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/encrypt/_server.js'))
			},
			{
				id: "/mortal",
				pattern: /^\/mortal\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/mortal/alta",
				pattern: /^\/mortal\/alta\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/mortal/buscar",
				pattern: /^\/mortal\/buscar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/mortal/modificar",
				pattern: /^\/mortal\/modificar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/mortal/modificar/servicios",
				pattern: /^\/mortal\/modificar\/servicios\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/mortal/modificar/servicios/educacion",
				pattern: /^\/mortal\/modificar\/servicios\/educacion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/mortal/modificar/servicios/empleabilidad",
				pattern: /^\/mortal\/modificar\/servicios\/empleabilidad\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/mortal/modificar/servicios/inclusion",
				pattern: /^\/mortal\/modificar\/servicios\/inclusion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/mortal/modificar/servicios/reubicacion",
				pattern: /^\/mortal\/modificar\/servicios\/reubicacion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/mortal/modificar/servicios/saludmental",
				pattern: /^\/mortal\/modificar\/servicios\/saludmental\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/mortal/reporte",
				pattern: /^\/mortal\/reporte\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/nivel2",
				pattern: /^\/nivel2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/nivel2/ajustes",
				pattern: /^\/nivel2\/ajustes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/nivel2/alta",
				pattern: /^\/nivel2\/alta\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/nivel2/buscar",
				pattern: /^\/nivel2\/buscar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/nivel2/modificar",
				pattern: /^\/nivel2\/modificar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/nivel2/modificar/servicios",
				pattern: /^\/nivel2\/modificar\/servicios\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/nivel2/modificar/servicios/educacion",
				pattern: /^\/nivel2\/modificar\/servicios\/educacion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/nivel2/modificar/servicios/empleabilidad",
				pattern: /^\/nivel2\/modificar\/servicios\/empleabilidad\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/nivel2/modificar/servicios/inclusion",
				pattern: /^\/nivel2\/modificar\/servicios\/inclusion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/nivel2/modificar/servicios/reubicacion",
				pattern: /^\/nivel2\/modificar\/servicios\/reubicacion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/nivel2/modificar/servicios/saludmental",
				pattern: /^\/nivel2\/modificar\/servicios\/saludmental\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/nivel2/reporte",
				pattern: /^\/nivel2\/reporte\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/nivel2/usuarios",
				pattern: /^\/nivel2\/usuarios\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 39 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
