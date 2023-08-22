import{d as M,H as Y,o as d,e as c,r as Z,K as ee,T as x,c as U,w as r,f as h,a as t,b as l,g as m,l as I,p as te,u as o,q as oe,s as se,h as N,F as L,t as i,y as le,O as ae,n as D}from"./app-c6ff63a7.js";import{_ as re}from"./AppLayout-54861043.js";import{a as H}from"./DialogModal-796d0d82.js";import{_ as P}from"./SecondaryButton-abb87fbd.js";import{_ as B}from"./PrimaryButton-6194fcd6.js";import{_ as ne,a as ie}from"./Toaster-d5dffb0c.js";import{a as p,_ as w}from"./TextInput-55f5c2cc.js";import{_}from"./InputLabel-21502b8b.js";import{_ as de}from"./TextArea-fbf12e86.js";import{_ as ce}from"./DangerButton-59696932.js";import"./_plugin-vue_export-helper-c27b6911.js";const ue=["value"],T={__name:"SelectInput",props:{modelValue:String},emits:["update:modelValue"],setup(C,{expose:y}){const g=M(null);return Y(()=>{g.value.hasAttribute("autofocus")&&g.value.focus()}),y({focus:()=>g.value.focus()}),(v,k)=>(d(),c("select",{ref_key:"input",ref:g,class:"border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",value:C.modelValue,onInput:k[0]||(k[0]=b=>v.$emit("update:modelValue",b.target.value))},[Z(v.$slots,"option")],40,ue))}},me=t("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"}," Project ",-1),pe={class:"p-12"},_e={class:"card w-auto bg-white dark:bg-gray-800 shadow-xl"},ge={class:"card-body"},fe={class:"card-title grid grid-cols-1 sm:grid-cols-2 sm:justify-between"},he={class:"join w-full sm:justify-end"},ye=t("option",{value:"",selected:""}," Semua Tipe Project ",-1),ve=t("option",{value:"1"},"Custom Project",-1),we=t("option",{value:"2"},"Partnership",-1),ke=t("option",{value:"3"},"Maintenance",-1),be=[ye,ve,we,ke],je=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"})],-1),Ve={key:0},xe={key:1},Me=["onClick"],Ce=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"})],-1),Se=[Ce],De=["onClick"],He=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})],-1),Pe=[He],Te=["onClick"],$e=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})],-1),ze=[$e],Ue={class:"grid grid-cols-1 gap-3 px-8"},Ie={class:"col-span-6 sm:col-span-4"},Ne=t("option",{value:""},"-- Pilih Client --",-1),Le=["value"],Be={class:"col-span-6 sm:col-span-4"},Ae={class:"col-span-6 sm:col-span-4"},Ee=t("option",{value:""}," -- Pilih Tipe Project -- ",-1),Fe=t("option",{value:"1"},"Custom Project",-1),qe=t("option",{value:"2"},"Parthnership",-1),Oe=t("option",{value:"3"},"Maintenance",-1),Re={class:"col-span-6 sm:col-span-4"},Ge={class:"col-span-6 sm:col-span-4"},Ke={class:"grid sm:grid-cols-2 gap-3 grid-cols-1"},Je={class:"col-span-6 sm:col-span-4"},Qe=t("option",{value:""}," -- Pilih Tipe Hosting -- ",-1),We=t("option",{value:"1"},"Hosting Sendiri",-1),Xe=t("option",{value:"2"},"Sewa Hosting",-1),Ye={key:0,class:"col-span-6 sm:col-span-4"},Ze={key:1,class:"grid sm:grid-cols-2 gap-3 grid-cols-1"},et={key:2,class:"col-span-6 sm:col-span-4"},tt={key:0,class:"loading loading-spinner loading-xs"},ot={class:"text-black dark:text-white"},st={key:0,class:"loading loading-spinner loading-xs"},lt={class:"overflow-x-auto"},at={class:"table text-black dark:text-white"},rt=t("th",null,"Tipe Hosting",-1),nt={key:0},it=t("th",null," Nama Domain ",-1),dt=["href"],ct={key:1},ut=t("th",null," Masa Aktif ",-1),mt={key:2},pt=t("th",null,"Harga",-1),_t={key:3},gt=t("th",null,"Status",-1),ft=t("th",null,"Deskripsi Project",-1),St={__name:"Project",props:{clients:Object,projects:Object},setup(C){const y=C,g=M(!1),v=M(!1),k=M(!1),b=ee();let S=null,$=null;const s=x({client_id:null,project_name:null,project_type:null,description:null,project_worth:null,start_from:null,until:null,project_warranty:null,host_type:null,domain_name:null,contract_from:null,contract_until:null,price:null}),j=x({search:null,project_type:""}),u=x({project_id:null,project_name:null}),z=(f,a=null)=>{g.value=!0,S=f,$=a,f=="Modal Ubah"&&le.get("project/"+a+"/edit").then(e=>{s.client_id=e.data.client_id,s.project_name=e.data.project_name,s.project_type=e.data.project_type,s.description=e.data.description,s.project_worth=e.data.project_worth,s.start_from=e.data.start_from,s.until=e.data.until,s.project_warranty=e.data.project_warranty,s.host_type=e.data.host_type,s.domain_name=e.data.domain_name,s.contract_from=e.data.contract_from,s.contract_until=e.data.contract_until}).catch(e=>{b.props.flash.message=e,setTimeout(()=>{b.props.flash.message=null},2e3)})},A=()=>{g.value=!1,s.reset(),s.clearErrors()},E=()=>{console.log("test"),S=="Modal Tambah"?s.post(route("project.store"),{preserveScroll:!0,onSuccess:()=>{g.value=!1,s.reset(),s.clearErrors(),setTimeout(()=>{b.props.flash.message=null},2e3)}}):s.patch(route("project.update",$),{preserveScroll:!0,onSuccess:()=>{g.value=!1,s.reset(),s.clearErrors(),setTimeout(()=>{b.props.flash.message=null},2e3)}})},F=(f,a)=>{v.value=!0,u.project_id=f,u.project_name=a},q=()=>{v.value=!1,u.reset(),u.clearErrors()},n=x({host_type:null,description:null,domain_name:null,contract_from:null,contract_until:null,price:null,contract_status:null}),O=(f,a,e,V,Q,W,X)=>{k.value=!0,n.host_type=f,n.description=a,n.domain_name=e,n.contract_from=V,n.contract_until=Q,n.price=W,n.contract_status=X},R=()=>{k.value=!1,n.reset()},G=()=>{u.delete(route("project.destroy",u.project_id),{preserveScroll:!0,onSuccess:()=>{v.value=!1,u.reset(),u.clearErrors(),setTimeout(()=>{b.props.flash.message=null},2e3)}})},K=()=>{ae.visit("project",{data:{search:j.search,project_type:j.project_type},replace:!0,preserveState:!0})};let J=Object.keys(y.projects.data).length==0;return(f,a)=>(d(),U(re,{title:"Project"},{header:r(()=>[me]),default:r(()=>[f.$page.props.flash.message!=null?(d(),U(ne,{key:0,response:f.$page.props.flash.message},null,8,["response"])):h("",!0),t("div",pe,[t("div",_e,[t("div",ge,[t("div",fe,[l(B,{class:"mr-2",onClick:a[0]||(a[0]=e=>z("Modal Tambah"))},{default:r(()=>[m("Tambah + ")]),_:1}),t("div",he,[t("div",null,[t("div",null,[I(t("input",{"onUpdate:modelValue":a[1]||(a[1]=e=>o(j).search=e),class:"input input-bordered join-item w-auto",placeholder:"Cari Nama Project"},null,512),[[te,o(j).search,void 0,{lazy:!0}]])])]),I(t("select",{"onUpdate:modelValue":a[2]||(a[2]=e=>o(j).project_type=e),class:"select select-bordered join-item w-auto sm:w-32"},be,512),[[oe,o(j).project_type,void 0,{lazy:!0}]]),t("div",{class:"indicator w-auto"},[t("button",{onClick:K,class:"btn join-item"},[m(" Cari "),je])])])]),l(ie,{theads:["Client","Nama Project","Tipe Project","Tanggal","Harga Project","Garansi","Status","Aksi"],current_page:y.projects.current_page,next_page:y.projects.next_page_url,prev_page:f.route("project.index")+"?page="+(y.projects.current_page-1)},se({_:2},[o(J)==!1?{name:"content",fn:r(()=>[(d(!0),c(L,null,N(y.projects.data,e=>(d(),c("tr",{key:e.id,class:"hover"},[t("td",null,i(e.client.name),1),t("td",null,i(e.project_name),1),t("td",null,i(e.project_type=="1"?"Custom Project":e.project_type=="2"?"Partnership":"Maintenance"),1),t("td",null,i(new Date(e.start_from).toLocaleDateString("id-ID"))+" - "+i(new Date(e.until).toLocaleDateString("id-ID")),1),t("td",null,i(new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(e.project_worth)),1),t("td",null,i(e.warranty??"-"),1),e.project_type=="2"?(d(),c("td",Ve,[t("div",{class:D(["badge gap-2",e.project_status==!0?"badge-success":"badge-error"])},i(e.project_status==!0?"Bermitra":"Expire"),3)])):(d(),c("td",xe,[t("div",{class:D(["badge gap-2",e.project_status==!0?"badge-success":"badge-error"])},i(e.project_status==!0?"Selesai":"Proses Pengerjaan"),3)])),t("td",null,[t("button",{class:D(["mr-3",e.contract_status==!1?"text-error":"text-info"]),onClick:V=>O(e.host_type,e.description,e.domain_name,e.contract_from,e.contract_until,e.price,e.contract_status)},Se,10,Me),t("button",{class:"mr-3 text-warning",onClick:V=>z("Modal Ubah",e.id)},Pe,8,De),t("button",{class:"text-error",onClick:V=>F(e.id,e.project_name)},ze,8,Te)])]))),128))]),key:"0"}:{name:"empty",fn:r(()=>[t("tr",{class:"text-center"},[t("td",{colspan:"8"},"Tidak ada data")])]),key:"1"}]),1032,["current_page","next_page","prev_page"])])])]),l(H,{show:g.value,onClose:a[15]||(a[15]=e=>g.value=!1)},{title:r(()=>[m(i(o(S)),1)]),content:r(()=>[t("div",Ue,[t("div",Ie,[l(_,{for:"client_id",value:"Nama Client"}),l(T,{id:"client_id",modelValue:o(s).client_id,"onUpdate:modelValue":a[3]||(a[3]=e=>o(s).client_id=e),modelModifiers:{lazy:!0},class:"mt-1 block w-full",disabled:o(s).processing},{option:r(()=>[Ne,(d(!0),c(L,null,N(y.clients,e=>(d(),c("option",{key:e.id,value:e.id},i(e.name),9,Le))),128))]),_:1},8,["modelValue","disabled"]),l(p,{class:"mt-2",message:o(s).errors.client_id},null,8,["message"])]),t("div",Be,[l(_,{for:"project_name",value:"Nama Project"}),l(w,{id:"project_name",modelValue:o(s).project_name,"onUpdate:modelValue":a[4]||(a[4]=e=>o(s).project_name=e),modelModifiers:{lazy:!0},type:"text",class:"mt-1 block w-full",autocomplete:"project_name",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.project_name},null,8,["message"])]),t("div",Ae,[l(_,{for:"project_type",value:"Tipe Project"}),l(T,{id:"project_type",modelValue:o(s).project_type,"onUpdate:modelValue":a[5]||(a[5]=e=>o(s).project_type=e),modelModifiers:{lazy:!0},class:"mt-1 block w-full",disabled:o(s).processing},{option:r(()=>[Ee,Fe,qe,Oe]),_:1},8,["modelValue","disabled"]),l(p,{class:"mt-2",message:o(s).errors.project_type},null,8,["message"])]),t("div",Re,[l(_,{for:"description",value:"Deskripsi"}),l(de,{id:"description",modelValue:o(s).description,"onUpdate:modelValue":a[6]||(a[6]=e=>o(s).description=e),modelModifiers:{lazy:!0},readonly:o(s).processing,class:"mt-1 block w-full"},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.description},null,8,["message"])]),t("div",Ge,[l(_,{for:"project_worth",value:"Harga Project"}),l(w,{id:"project_worth",modelValue:o(s).project_worth,"onUpdate:modelValue":a[7]||(a[7]=e=>o(s).project_worth=e),modelModifiers:{lazy:!0},type:"number",min:"0",class:"mt-1 block w-full",autocomplete:"project_worth",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.project_worth},null,8,["message"])]),t("div",Ke,[t("div",null,[l(_,{for:"start_from",value:"Tanggal Mulai"}),l(w,{id:"start_from",modelValue:o(s).start_from,"onUpdate:modelValue":a[8]||(a[8]=e=>o(s).start_from=e),modelModifiers:{lazy:!0},type:"date",class:"mt-1 block w-full",autocomplete:"start_from",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.start_from},null,8,["message"])]),t("div",null,[l(_,{for:"until",value:"Tanggal Selesai"}),l(w,{id:"until",modelValue:o(s).until,"onUpdate:modelValue":a[9]||(a[9]=e=>o(s).until=e),modelModifiers:{lazy:!0},type:"date",class:"mt-1 block w-full",autocomplete:"until",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.until},null,8,["message"])])]),t("div",Je,[l(_,{for:"host_type",value:"Tipe Hosting"}),l(T,{id:"host_type",modelValue:o(s).host_type,"onUpdate:modelValue":a[10]||(a[10]=e=>o(s).host_type=e),modelModifiers:{lazy:!0},class:"mt-1 block w-full",disabled:o(s).processing},{option:r(()=>[Qe,We,Xe]),_:1},8,["modelValue","disabled"]),l(p,{class:"mt-2",message:o(s).errors.host_type},null,8,["message"])]),o(s).host_type=="2"?(d(),c("div",Ye,[l(_,{for:"domain_name",value:"Nama Domain"}),l(w,{id:"domain_name",modelValue:o(s).domain_name,"onUpdate:modelValue":a[11]||(a[11]=e=>o(s).domain_name=e),modelModifiers:{lazy:!0},type:"text",class:"mt-1 block w-full",autocomplete:"domain_name",required:"",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.domain_name},null,8,["message"])])):h("",!0),o(s).host_type=="2"?(d(),c("div",Ze,[t("div",null,[l(_,{for:"contract_from",value:"Contract Mulai Tanggal"}),l(w,{id:"contract_from",modelValue:o(s).contract_from,"onUpdate:modelValue":a[12]||(a[12]=e=>o(s).contract_from=e),modelModifiers:{lazy:!0},type:"date",class:"mt-1 block w-full",autocomplete:"contract_from",required:"",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.contract_from},null,8,["message"])]),t("div",null,[l(_,{for:"contract_until",value:"Sampai"}),l(w,{id:"contract_until",modelValue:o(s).contract_until,"onUpdate:modelValue":a[13]||(a[13]=e=>o(s).contract_until=e),modelModifiers:{lazy:!0},type:"date",class:"mt-1 block w-full",autocomplete:"contract_until",required:"",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.contract_until},null,8,["message"])])])):h("",!0),o(s).host_type=="2"?(d(),c("div",et,[l(_,{for:"price",value:"Harga Hosting"}),l(w,{id:"price",modelValue:o(s).price,"onUpdate:modelValue":a[14]||(a[14]=e=>o(s).price=e),modelModifiers:{lazy:!0},type:"number",min:"0",class:"mt-1 block w-full",autocomplete:"price",required:"",readonly:o(s).processing},null,8,["modelValue","readonly"]),l(p,{class:"mt-2",message:o(s).errors.price},null,8,["message"])])):h("",!0)])]),footer:r(()=>[l(B,{disabled:o(s).processing,onClick:E,class:"mr-2"},{default:r(()=>[o(s).processing?(d(),c("span",tt)):h("",!0),m(" Simpan")]),_:1},8,["disabled"]),l(P,{disabled:o(s).processing,type:"button",onClick:A},{default:r(()=>[m(" Tutup ")]),_:1},8,["disabled"])]),_:1},8,["show"]),l(H,{show:v.value,onClose:a[16]||(a[16]=e=>v.value=!1)},{title:r(()=>[m(" Modal Hapus ")]),content:r(()=>[t("p",ot,[m(" Apa ada yakin ingin menghapus data "),t("b",null,i(o(u).project_name),1),m(" ? ")])]),footer:r(()=>[l(ce,{disabled:o(u).processing,onClick:G,class:"mr-2"},{default:r(()=>[o(u).processing?(d(),c("span",st)):h("",!0),m(" Hapus")]),_:1},8,["disabled"]),l(P,{disabled:o(u).processing,type:"button",onClick:q},{default:r(()=>[m(" Batal ")]),_:1},8,["disabled"])]),_:1},8,["show"]),l(H,{show:k.value,onClose:a[17]||(a[17]=e=>k.value=!1)},{title:r(()=>[m(" Modal Detail ")]),content:r(()=>[t("div",lt,[t("table",at,[t("tr",null,[rt,t("td",null,i(o(n).host_type=="1"?"Hosting Sendiri":"Sewa Hosting"),1)]),o(n).host_type=="2"?(d(),c("tr",nt,[it,t("td",null,[t("a",{class:"hover:text-blue-500",target:"_blank",href:"https://"+o(n).domain_name},i(o(n).domain_name),9,dt)])])):h("",!0),o(n).host_type=="2"?(d(),c("tr",ct,[ut,t("td",null,i(new Date(o(n).contract_from).toLocaleDateString("id-ID"))+" - "+i(new Date(o(n).contract_until).toLocaleDateString("id-ID")),1)])):h("",!0),o(n).host_type=="2"?(d(),c("tr",mt,[pt,t("td",null,i(new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(o(n).price)),1)])):h("",!0),o(n).host_type=="2"?(d(),c("tr",_t,[gt,t("td",null,i(o(n).contract_status?"Aktif":"Expire"),1)])):h("",!0),t("tr",null,[ft,t("td",null,i(o(n).description),1)])])])]),footer:r(()=>[l(P,{type:"button",onClick:R},{default:r(()=>[m(" Tutup ")]),_:1})]),_:1},8,["show"])]),_:1}))}};export{St as default};