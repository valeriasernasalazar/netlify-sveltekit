import{s as Q,n as R,r as W}from"../chunks/scheduler.2ExYYgC5.js";import{S as X,i as Y,e as s,s as j,c as i,a as g,n as m,k as C,d as H,b as l,f as Z,l as e,o as k}from"../chunks/index.BEfN5G4a.js";import{e as ee}from"../chunks/store.Czkyq5IA.js";import{g as M}from"../chunks/entry.BGfAofGz.js";function te(r){let a,o,p,E="Servicios",I,c,d,U='<i class="fa-solid fa-arrow-left"></i> <p>Regresar</p>',S,v,$='<i class="fa-solid fa-right-from-bracket"></i> <p>Cerrar Sesion</p>',w,x,t,f,z='<div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Inclusión</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-user-group svelte-oj133b"></i></div>',y,u,P='<div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Reubicación</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-arrows-rotate svelte-oj133b"></i></div>',B,b,A='<div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Educación</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-book svelte-oj133b"></i></div>',q,_,F='<div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Empleabilidad</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-briefcase svelte-oj133b"></i></div>',N,h,G='<div class="textContainer svelte-oj133b"><p class="texto svelte-oj133b">Salud Mental</p></div> <div class="iconContainer svelte-oj133b"><i class="fa-solid fa-brain svelte-oj133b"></i></div>',O,J;return{c(){a=s("div"),o=s("div"),p=s("h1"),p.textContent=E,I=j(),c=s("div"),d=s("button"),d.innerHTML=U,S=j(),v=s("button"),v.innerHTML=$,w=j(),x=s("div"),t=s("div"),f=s("div"),f.innerHTML=z,y=j(),u=s("div"),u.innerHTML=P,B=j(),b=s("div"),b.innerHTML=A,q=j(),_=s("div"),_.innerHTML=F,N=j(),h=s("div"),h.innerHTML=G,this.h()},l(L){a=i(L,"DIV",{class:!0});var T=g(a);o=i(T,"DIV",{class:!0});var D=g(o);p=i(D,"H1",{"data-svelte-h":!0}),m(p)!=="svelte-13rcwlp"&&(p.textContent=E),I=C(D),c=i(D,"DIV",{class:!0});var V=g(c);d=i(V,"BUTTON",{class:!0,"data-svelte-h":!0}),m(d)!=="svelte-136q0ln"&&(d.innerHTML=U),S=C(V),v=i(V,"BUTTON",{class:!0,"data-svelte-h":!0}),m(v)!=="svelte-g014xp"&&(v.innerHTML=$),V.forEach(H),D.forEach(H),w=C(T),x=i(T,"DIV",{class:!0});var K=g(x);t=i(K,"DIV",{class:!0});var n=g(t);f=i(n,"DIV",{class:!0,"data-svelte-h":!0}),m(f)!=="svelte-m14lny"&&(f.innerHTML=z),y=C(n),u=i(n,"DIV",{class:!0,"data-svelte-h":!0}),m(u)!=="svelte-do7clz"&&(u.innerHTML=P),B=C(n),b=i(n,"DIV",{class:!0,"data-svelte-h":!0}),m(b)!=="svelte-168u28c"&&(b.innerHTML=A),q=C(n),_=i(n,"DIV",{class:!0,"data-svelte-h":!0}),m(_)!=="svelte-8w3v4j"&&(_.innerHTML=F),N=C(n),h=i(n,"DIV",{class:!0,"data-svelte-h":!0}),m(h)!=="svelte-1ivu669"&&(h.innerHTML=G),n.forEach(H),K.forEach(H),T.forEach(H),this.h()},h(){l(d,"class","svelte-oj133b"),l(v,"class","svelte-oj133b"),l(c,"class","headerBtns svelte-oj133b"),l(o,"class","headerContainer svelte-oj133b"),l(f,"class","container svelte-oj133b"),l(u,"class","container svelte-oj133b"),l(b,"class","container svelte-oj133b"),l(_,"class","container svelte-oj133b"),l(h,"class","container svelte-oj133b"),l(t,"class","imagesContainer svelte-oj133b"),l(x,"class","contentContainer svelte-oj133b"),l(a,"class","mainContainer svelte-oj133b")},m(L,T){Z(L,a,T),e(a,o),e(o,p),e(o,I),e(o,c),e(c,d),e(c,S),e(c,v),e(a,w),e(a,x),e(x,t),e(t,f),e(t,y),e(t,u),e(t,B),e(t,b),e(t,q),e(t,_),e(t,N),e(t,h),O||(J=[k(d,"click",r[0]),k(v,"click",ee.logout),k(f,"click",r[1]),k(u,"click",r[2]),k(b,"click",r[3]),k(_,"click",r[4]),k(h,"click",r[5])],O=!0)},p:R,i:R,o:R,d(L){L&&H(a),O=!1,W(J)}}}function se(r){return[()=>M("/admin/modificar"),()=>M("/admin/modificar/servicios/inclusion"),()=>M("/admin/modificar/servicios/reubicacion"),()=>M("/admin/modificar/servicios/educacion"),()=>M("/admin/modificar/servicios/empleabilidad"),()=>M("/admin/modificar/servicios/saludmental")]}class oe extends X{constructor(a){super(),Y(this,a,se,te,Q,{})}}export{oe as component};