import{d as u,T as b,o as a,e as s,b as o,u as t,w as m,F as c,Z as h,a as i,g as n,i as _,n as C,m as w}from"./app-c6ff63a7.js";import{A as V}from"./AuthenticationCard-3f625cc5.js";import{_ as T}from"./AuthenticationCardLogo-953d57bc.js";import{_ as p,a as v}from"./TextInput-55f5c2cc.js";import{_ as g}from"./InputLabel-21502b8b.js";import{_ as $}from"./PrimaryButton-6194fcd6.js";import"./_plugin-vue_export-helper-c27b6911.js";const I={class:"mb-4 text-sm text-gray-600 dark:text-gray-400"},U=["onSubmit"],B={key:0},F={key:1},N={class:"flex items-center justify-end mt-4"},A=["onClick"],q={__name:"TwoFactorChallenge",setup(P){const r=u(!1),e=b({code:"",recovery_code:""}),f=u(null),y=u(null),k=async()=>{r.value^=!0,await w(),r.value?(f.value.focus(),e.code=""):(y.value.focus(),e.recovery_code="")},x=()=>{e.post(route("two-factor.login"))};return(R,l)=>(a(),s(c,null,[o(t(h),{title:"Two-factor Confirmation"}),o(V,null,{logo:m(()=>[o(T)]),default:m(()=>[i("div",I,[r.value?(a(),s(c,{key:1},[n(" Please confirm access to your account by entering one of your emergency recovery codes. ")],64)):(a(),s(c,{key:0},[n(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")],64))]),i("form",{onSubmit:_(x,["prevent"])},[r.value?(a(),s("div",F,[o(g,{for:"recovery_code",value:"Recovery Code"}),o(p,{id:"recovery_code",ref_key:"recoveryCodeInput",ref:f,modelValue:t(e).recovery_code,"onUpdate:modelValue":l[1]||(l[1]=d=>t(e).recovery_code=d),type:"text",class:"mt-1 block w-full",autocomplete:"one-time-code"},null,8,["modelValue"]),o(v,{class:"mt-2",message:t(e).errors.recovery_code},null,8,["message"])])):(a(),s("div",B,[o(g,{for:"code",value:"Code"}),o(p,{id:"code",ref_key:"codeInput",ref:y,modelValue:t(e).code,"onUpdate:modelValue":l[0]||(l[0]=d=>t(e).code=d),type:"text",inputmode:"numeric",class:"mt-1 block w-full",autofocus:"",autocomplete:"one-time-code"},null,8,["modelValue"]),o(v,{class:"mt-2",message:t(e).errors.code},null,8,["message"])])),i("div",N,[i("button",{type:"button",class:"text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer",onClick:_(k,["prevent"])},[r.value?(a(),s(c,{key:1},[n(" Use an authentication code ")],64)):(a(),s(c,{key:0},[n(" Use a recovery code ")],64))],8,A),o($,{class:C(["ml-4",{"opacity-25":t(e).processing}]),disabled:t(e).processing},{default:m(()=>[n(" Log in ")]),_:1},8,["class","disabled"])])],40,U)]),_:1})],64))}};export{q as default};
