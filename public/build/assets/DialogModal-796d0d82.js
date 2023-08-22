import{B as h,k as f,o as u,c as y,b as c,w as o,l as i,a as s,G as r,C as n,n as x,r as l,f as w,M as v}from"./app-c6ff63a7.js";const g={class:"fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50","scroll-region":""},p={class:"fixed inset-0 transform transition-all"},b=s("div",{class:"absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"},null,-1),_=[b],k={__name:"Modal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(e,{emit:d}){const a=e;h(()=>a.show,()=>{a.show?document.body.style.overflow="hidden":document.body.style.overflow=null});const t=f(()=>({sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"})[a.maxWidth]);return(m,S)=>(u(),y(v,{to:"body"},[c(r,{"leave-active-class":"duration-200"},{default:o(()=>[i(s("div",g,[c(r,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:o(()=>[i(s("div",p,_,512),[[n,e.show]])]),_:1}),c(r,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:o(()=>[i(s("div",{class:x(["mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto",t.value])},[e.show?l(m.$slots,"default",{key:0}):w("",!0)],2),[[n,e.show]])]),_:3})],512),[[n,e.show]])]),_:3})]))}},$={class:"px-6 py-4"},B={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},C={class:"mt-4 text-sm text-gray-600 dark:text-gray-400"},W={class:"flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-right"},N={__name:"DialogModal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(e,{emit:d}){const a=()=>{d("close")};return(t,m)=>(u(),y(k,{show:e.show,"max-width":e.maxWidth,closeable:e.closeable,onClose:a},{default:o(()=>[s("div",$,[s("div",B,[l(t.$slots,"title")]),s("div",C,[l(t.$slots,"content")])]),s("div",W,[l(t.$slots,"footer")])]),_:3},8,["show","max-width","closeable"]))}};export{k as _,N as a};
