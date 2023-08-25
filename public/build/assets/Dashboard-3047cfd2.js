import{_ as d}from"./AppLayout-0cfccb15.js";import{o as n,e as u,a as t,t as c,c as m,w as i,b as s,u as o}from"./app-1f4bfe4c.js";import"./_plugin-vue_export-helper-c27b6911.js";const _={class:"stats shadow bg-white dark:bg-gray-800 dark:text-white"},h={class:"stat"},g={class:"stat-title text-black dark:text-white"},p={class:"stat-value text-black dark:text-white"},v={class:"stat-desc text-black dark:text-white"},l={__name:"MainCard",props:{title:String,value:String,desc:String},setup(a){return(e,r)=>(n(),u("div",_,[t("div",h,[t("div",g,c(a.title),1),t("div",p,c(a.value),1),t("div",v,c(a.desc),1)])]))}},b=t("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"}," Dashboard ",-1),x={class:"p-12 text-center"},k={class:"grid grid-cols-1 sm:grid-cols-3 gap-4"},f={class:"grid grid-cols-1 mt-4 sm:grid-cols-2 gap-4"},S={__name:"Dashboard",props:{saldo:Number,pemasukan:Number,pengeluaran:Number,client:Number,project:Number},setup(a){const e=a,r=new Date().getFullYear();return(w,N)=>(n(),m(d,{title:"Dashboard"},{header:i(()=>[b]),default:i(()=>[t("div",x,[t("div",k,[s(l,{title:"Saldo",value:"Rp."+new Intl.NumberFormat("id-ID").format(e.saldo)},null,8,["value"]),s(l,{title:"Pemasukan",value:"Rp."+new Intl.NumberFormat("id-ID").format(e.pemasukan),desc:o(r)},null,8,["value","desc"]),s(l,{title:"Pengeluaran",value:"Rp."+new Intl.NumberFormat("id-ID").format(e.pengeluaran),desc:o(r)},null,8,["value","desc"])]),t("div",f,[s(l,{title:"Jumlah Client",value:e.client},null,8,["value"]),s(l,{title:"Jumlah Project",value:e.project},null,8,["value"])])])]),_:1}))}};export{S as default};