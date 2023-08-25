import{_ as c}from"./AppLayout-0cfccb15.js";import p from"./DeleteUserForm-fe00d7c7.js";import l from"./LogoutOtherBrowserSessionsForm-95c94f34.js";import{S as s}from"./SectionBorder-f45ae9f0.js";import f from"./TwoFactorAuthenticationForm-0bbd2269.js";import u from"./UpdatePasswordForm-7db3d16d.js";import d from"./UpdateProfileInformationForm-d2912a1c.js";import{o,c as _,w as n,a as i,e as r,b as t,f as a,F as h}from"./app-1f4bfe4c.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./ActionSection-301d2cbd.js";import"./SectionTitle-ee907770.js";import"./DangerButton-948bbd9b.js";import"./DialogModal-9c4da7cb.js";import"./TextInput-66fc6da5.js";import"./SecondaryButton-004f9634.js";import"./ActionMessage-f002564c.js";import"./PrimaryButton-b8d66e85.js";import"./InputLabel-916a89dc.js";import"./FormSection-da08f2f8.js";const g=i("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"}," Profile ",-1),$={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},k={key:0},w={key:1},y={key:2},G={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(m){return(e,x)=>(o(),_(c,{title:"Profile"},{header:n(()=>[g]),default:n(()=>[i("div",null,[i("div",$,[e.$page.props.jetstream.canUpdateProfileInformation?(o(),r("div",k,[t(d,{user:e.$page.props.auth.user},null,8,["user"]),t(s)])):a("",!0),e.$page.props.jetstream.canUpdatePassword?(o(),r("div",w,[t(u,{class:"mt-10 sm:mt-0"}),t(s)])):a("",!0),e.$page.props.jetstream.canManageTwoFactorAuthentication?(o(),r("div",y,[t(f,{"requires-confirmation":m.confirmsTwoFactorAuthentication,class:"mt-10 sm:mt-0"},null,8,["requires-confirmation"]),t(s)])):a("",!0),t(l,{sessions:m.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),e.$page.props.jetstream.hasAccountDeletionFeatures?(o(),r(h,{key:3},[t(s),t(p,{class:"mt-10 sm:mt-0"})],64)):a("",!0)])])]),_:1}))}};export{G as default};