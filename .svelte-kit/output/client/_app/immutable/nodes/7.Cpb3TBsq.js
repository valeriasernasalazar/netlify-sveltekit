import{s as ne,n as W,r as ie,b as R}from"../chunks/scheduler.2ExYYgC5.js";import{S as re,i as ce,e as j,s as w,p as H,c as k,a as I,n as B,k as y,d as _,b as m,f as T,l as p,o as O,q as P,r as fe,h as U,j as A,m as K,u as oe}from"../chunks/index.BEfN5G4a.js";import{e as F}from"../chunks/each.D6YF6ztN.js";import{w as G}from"../chunks/index.BQLYkrUj.js";import{e as ue,f as de,h as he}from"../chunks/store.Czkyq5IA.js";import{g as X}from"../chunks/entry.BGfAofGz.js";function Y(n,t,l){const e=n.slice();return e[14]=t[l],e}function Z(n,t,l){const e=n.slice();return e[17]=t[l][0],e[18]=t[l][1],e}function x(n){let t,l,e="Buscar Migrante para Acceder a Servicios",s,c,o,r,C="Nombre Completo:",g,v,b,h,f,i="Fecha de Nacimiento:",u,a,d,E,S="Buscar",z,J,Q,N=n[3]&&$(n);return{c(){t=j("div"),l=j("h1"),l.textContent=e,s=w(),c=j("form"),o=j("div"),r=j("label"),r.textContent=C,g=w(),v=j("input"),b=w(),h=j("div"),f=j("label"),f.textContent=i,u=w(),a=j("input"),d=w(),E=j("button"),E.textContent=S,z=w(),N&&N.c(),this.h()},l(D){t=k(D,"DIV",{class:!0});var L=I(t);l=k(L,"H1",{"data-svelte-h":!0}),B(l)!=="svelte-1g3bcty"&&(l.textContent=e),s=y(L),c=k(L,"FORM",{class:!0});var V=I(c);o=k(V,"DIV",{class:!0});var M=I(o);r=k(M,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),B(r)!=="svelte-ttl2ka"&&(r.textContent=C),g=y(M),v=k(M,"INPUT",{type:!0,id:!0,class:!0}),M.forEach(_),b=y(V),h=k(V,"DIV",{class:!0});var q=I(h);f=k(q,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),B(f)!=="svelte-1w0esq5"&&(f.textContent=i),u=y(q),a=k(q,"INPUT",{type:!0,id:!0,class:!0}),q.forEach(_),d=y(V),E=k(V,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),B(E)!=="svelte-ouicbz"&&(E.textContent=S),V.forEach(_),z=y(L),N&&N.l(L),L.forEach(_),this.h()},h(){m(r,"for","nombrecompleto"),m(r,"class","svelte-1hj8d9v"),m(v,"type","text"),m(v,"id","nombrecompleto"),v.required=!0,m(v,"class","svelte-1hj8d9v"),m(o,"class","form-group svelte-1hj8d9v"),m(f,"for","fechanacimiento"),m(f,"class","svelte-1hj8d9v"),m(a,"type","date"),m(a,"id","fechanacimiento"),a.required=!0,m(a,"class","svelte-1hj8d9v"),m(h,"class","form-group svelte-1hj8d9v"),m(E,"type","submit"),m(E,"class","svelte-1hj8d9v"),m(c,"class","form-container svelte-1hj8d9v"),m(t,"class","main-container svelte-1hj8d9v")},m(D,L){T(D,t,L),p(t,l),p(t,s),p(t,c),p(c,o),p(o,r),p(o,g),p(o,v),P(v,n[0]),p(c,b),p(c,h),p(h,f),p(h,u),p(h,a),P(a,n[1]),p(c,d),p(c,E),p(t,z),N&&N.m(t,null),J||(Q=[O(v,"input",n[11]),O(a,"input",n[12]),O(c,"submit",fe(n[9]))],J=!0)},p(D,L){L&1&&v.value!==D[0]&&P(v,D[0]),L&2&&P(a,D[1]),D[3]?N?N.p(D,L):(N=$(D),N.c(),N.m(t,null)):N&&(N.d(1),N=null)},d(D){D&&_(t),N&&N.d(),J=!1,ie(Q)}}}function $(n){let t,l;return{c(){t=j("p"),l=U(n[3]),this.h()},l(e){t=k(e,"P",{class:!0});var s=I(t);l=A(s,n[3]),s.forEach(_),this.h()},h(){m(t,"class","error-message svelte-1hj8d9v")},m(e,s){T(e,t,s),p(t,l)},p(e,s){s&8&&K(l,e[3])},d(e){e&&_(t)}}}function ee(n){let t,l="Información del Migrante",e,s,c,o,r,C,g="Ir a modificar servicios para este migrante",v,b,h=F(n[4].data),f=[];for(let i=0;i<h.length;i+=1)f[i]=se(Y(n,h,i));return{c(){t=j("h2"),t.textContent=l,e=w(),s=j("div");for(let i=0;i<f.length;i+=1)f[i].c();c=w(),o=j("div"),r=j("div"),C=j("button"),C.textContent=g,this.h()},l(i){t=k(i,"H2",{class:!0,"data-svelte-h":!0}),B(t)!=="svelte-179nj3i"&&(t.textContent=l),e=y(i),s=k(i,"DIV",{class:!0});var u=I(s);for(let E=0;E<f.length;E+=1)f[E].l(u);u.forEach(_),c=y(i),o=k(i,"DIV",{class:!0});var a=I(o);r=k(a,"DIV",{class:!0});var d=I(r);C=k(d,"BUTTON",{class:!0,"data-svelte-h":!0}),B(C)!=="svelte-1twk8fj"&&(C.textContent=g),d.forEach(_),a.forEach(_),this.h()},h(){m(t,"class","section-title svelte-1hj8d9v"),m(s,"class","card svelte-1hj8d9v"),m(C,"class","service-button svelte-1hj8d9v"),m(r,"class","buttonContainer svelte-1hj8d9v"),m(o,"class","contentContainer svelte-1hj8d9v")},m(i,u){T(i,t,u),T(i,e,u),T(i,s,u);for(let a=0;a<f.length;a+=1)f[a]&&f[a].m(s,null);T(i,c,u),T(i,o,u),p(o,r),p(r,C),v||(b=O(C,"click",n[13]),v=!0)},p(i,u){if(u&272){h=F(i[4].data);let a;for(a=0;a<h.length;a+=1){const d=Y(i,h,a);f[a]?f[a].p(d,u):(f[a]=se(d),f[a].c(),f[a].m(s,null))}for(;a<f.length;a+=1)f[a].d(1);f.length=h.length}},d(i){i&&(_(t),_(e),_(s),_(c),_(o)),oe(f,i),v=!1,b()}}}function te(n){let t,l,e=(n[8][n[17].toLowerCase()]||n[17])+"",s,c,o,r,C=ae(n[18])+"",g,v;return{c(){t=j("div"),l=j("span"),s=U(e),c=U(":"),o=w(),r=j("span"),g=U(C),v=w(),this.h()},l(b){t=k(b,"DIV",{class:!0});var h=I(t);l=k(h,"SPAN",{class:!0});var f=I(l);s=A(f,e),c=A(f,":"),f.forEach(_),o=y(h),r=k(h,"SPAN",{class:!0});var i=I(r);g=A(i,C),i.forEach(_),v=y(h),h.forEach(_),this.h()},h(){m(l,"class","card-key svelte-1hj8d9v"),m(r,"class","card-value svelte-1hj8d9v"),m(t,"class","card-row svelte-1hj8d9v")},m(b,h){T(b,t,h),p(t,l),p(l,s),p(l,c),p(t,o),p(t,r),p(r,g),p(t,v)},p(b,h){h&16&&e!==(e=(b[8][b[17].toLowerCase()]||b[17])+"")&&K(s,e),h&16&&C!==(C=ae(b[18])+"")&&K(g,C)},d(b){b&&_(t)}}}function le(n){let t,l=(n[17]=="nombrecompleto"||n[17]=="fechanacimiento")&&te(n);return{c(){l&&l.c(),t=H()},l(e){l&&l.l(e),t=H()},m(e,s){l&&l.m(e,s),T(e,t,s)},p(e,s){e[17]=="nombrecompleto"||e[17]=="fechanacimiento"?l?l.p(e,s):(l=te(e),l.c(),l.m(t.parentNode,t)):l&&(l.d(1),l=null)},d(e){e&&_(t),l&&l.d(e)}}}function se(n){let t,l=F(Object.entries(n[14])),e=[];for(let s=0;s<l.length;s+=1)e[s]=le(Z(n,l,s));return{c(){for(let s=0;s<e.length;s+=1)e[s].c();t=H()},l(s){for(let c=0;c<e.length;c+=1)e[c].l(s);t=H()},m(s,c){for(let o=0;o<e.length;o+=1)e[o]&&e[o].m(s,c);T(s,t,c)},p(s,c){if(c&272){l=F(Object.entries(s[14]));let o;for(o=0;o<l.length;o+=1){const r=Z(s,l,o);e[o]?e[o].p(r,c):(e[o]=le(r),e[o].c(),e[o].m(t.parentNode,t))}for(;o<e.length;o+=1)e[o].d(1);e.length=l.length}},d(s){s&&_(t),oe(e,s)}}}function ve(n){let t,l,e,s,c='<i class="fa-solid fa-arrow-left"></i> <p>Inicio</p>',o,r,C='<i class="fa-solid fa-right-from-bracket"></i> <p>Cerrar Sesión</p>',g,v,b,h,f,i=!n[2]&&x(n),u=n[4]&&ee(n);return{c(){t=j("div"),l=j("div"),e=j("div"),s=j("button"),s.innerHTML=c,o=w(),r=j("button"),r.innerHTML=C,g=w(),i&&i.c(),v=w(),u&&u.c(),b=H(),this.h()},l(a){t=k(a,"DIV",{class:!0});var d=I(t);l=k(d,"DIV",{class:!0});var E=I(l);e=k(E,"DIV",{class:!0});var S=I(e);s=k(S,"BUTTON",{class:!0,"data-svelte-h":!0}),B(s)!=="svelte-92lfck"&&(s.innerHTML=c),o=y(S),r=k(S,"BUTTON",{class:!0,"data-svelte-h":!0}),B(r)!=="svelte-1p6l6vt"&&(r.innerHTML=C),S.forEach(_),E.forEach(_),d.forEach(_),g=y(a),i&&i.l(a),v=y(a),u&&u.l(a),b=H(),this.h()},h(){m(s,"class","svelte-1hj8d9v"),m(r,"class","svelte-1hj8d9v"),m(e,"class","hB svelte-1hj8d9v"),m(l,"class","Hc"),m(t,"class","Mc svelte-1hj8d9v")},m(a,d){T(a,t,d),p(t,l),p(l,e),p(e,s),p(e,o),p(e,r),T(a,g,d),i&&i.m(a,d),T(a,v,d),u&&u.m(a,d),T(a,b,d),h||(f=[O(s,"click",n[10]),O(r,"click",ue.logout)],h=!0)},p(a,[d]){a[2]?i&&(i.d(1),i=null):i?i.p(a,d):(i=x(a),i.c(),i.m(v.parentNode,v)),a[4]?u?u.p(a,d):(u=ee(a),u.c(),u.m(b.parentNode,b)):u&&(u.d(1),u=null)},i:W,o:W,d(a){a&&(_(t),_(g),_(v),_(b)),i&&i.d(a),u&&u.d(a),h=!1,ie(f)}}}function ae(n){return n.replace(/\b(\w)(\S*)/g,(t,l,e)=>l.toUpperCase()+e.toLowerCase())}function me(n,t,l){let e,s,c,o="",r="",C=G(null);R(n,C,d=>l(4,c=d));let g=G("");R(n,g,d=>l(3,s=d));let v=G(!1);R(n,v,d=>l(2,e=d));const b={nombrecompleto:"Nombre completo",fechanacimiento:"Fecha de nacimiento"};async function h(){try{const d=await fetch("/api/decrypt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nombrecompleto:o,fechanacimiento:r})});if(d.ok){const E=await d.json();console.log("Datos recibidos:",E),C.set(E),g.set(""),v.set(!0),de.set(o),he.set(r)}else{const E=await d.text();g.set(E||"Error desconocido")}}catch(d){g.set(`Error de conexión: ${d.message}`)}}const f=()=>X("/admin");function i(){o=this.value,l(0,o)}function u(){r=this.value,l(1,r)}return[o,r,e,s,c,C,g,v,b,h,f,i,u,()=>X("/admin/modificar/servicios")]}class ge extends re{constructor(t){super(),ce(this,t,me,ve,ne,{})}}export{ge as component};
