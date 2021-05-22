(()=>{"use strict";var e,t={4282:(e,t,r)=>{var n=r(7294),a=r(3935),o=r(3727),c=r(8790);const l={component:function(e){var t=e.route;return n.useEffect((function(){var e=document.querySelector("#jss-server-side");e&&e.parentElement.removeChild(e)}),[]),n.createElement(n.Fragment,null,(0,c.H)(t.routes))}};var i=r(282),m=r(5834),u=r(4871),s=r(553),p=r(2880),d=r(9895),f=r(1749),b=r(2318),g=(0,r(1120).Z)((function(e){return{root:{height:"100vh"},image:{backgroundImage:"url(https://source.unsplash.com/random)",backgroundRepeat:"no-repeat",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center"},paper:{height:"100%",padding:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));const h={component:function(){var e=g();return n.createElement(f.Z,{container:!0,component:"main",className:e.root},n.createElement(m.ZP,null),n.createElement(f.Z,{item:!0,xs:!1,sm:4,md:7,className:e.image}),n.createElement(f.Z,{item:!0,xs:12,sm:8,md:5,component:d.Z,elevation:6,square:!0},n.createElement("div",{className:e.paper},n.createElement(b.Z,{component:"h1",variant:"h4"},"EPS Online Judge"),n.createElement("form",{className:e.form,noValidate:!0},n.createElement(u.Z,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0}),n.createElement(u.Z,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),n.createElement(s.Z,{control:n.createElement(p.Z,{value:"remember",color:"primary"}),label:"Remember me"}),n.createElement(i.Z,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit},"Sign In")))))}};var v=r(3832),y=r(7748),E=r(9659);function O(){return n.createElement(b.Z,{variant:"body2",color:"textSecondary",align:"center"},"Copyright © ",n.createElement(E.Z,{color:"inherit",href:"https://material-ui.com/"},"Your Website")," ",(new Date).getFullYear(),".")}const j={component:function(){return n.createElement(v.Z,{maxWidth:"sm"},n.createElement(y.Z,{my:4},n.createElement(b.Z,{variant:"h4",component:"h1",gutterBottom:!0},"Server Rendering v4-beta example Test2"),n.createElement(O,null)))}};function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Z(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){P(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const k=[Z(Z({},l),{},{routes:[Z(Z({},h),{},{path:"/",exact:!0}),Z(Z({},j),{},{path:"/home"})]})];var x=r(3457),C=r(1173),S=r(907);const D=(0,C.Z)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:S.Z.A400},background:{default:"#fff"}}});function q(){return n.createElement(o.VK,null,n.createElement(x.Z,{theme:D},n.createElement(m.ZP,null),(0,c.H)(k)))}(0,a.hydrate)(n.createElement(q,null),document.querySelector("#root"))}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,a,o)=>{if(!r){var c=1/0;for(m=0;m<e.length;m++){for(var[r,a,o]=e[m],l=!0,i=0;i<r.length;i++)(!1&o||c>=o)&&Object.keys(n.O).every((e=>n.O[e](r[i])))?r.splice(i--,1):(l=!1,o<c&&(c=o));l&&(e.splice(m--,1),t=a())}return t}o=o||0;for(var m=e.length;m>0&&e[m-1][2]>o;m--)e[m]=e[m-1];e[m]=[r,a,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,[c,l,i]=r,m=0;for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(i)var u=i(n);for(t&&t(r);m<c.length;m++)o=c[m],n.o(e,o)&&e[o]&&e[o][0](),e[c[m]]=0;return n.O(u)},r=self.webpackChunkepsoj=self.webpackChunkepsoj||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[736],(()=>n(4282)));a=n.O(a)})();