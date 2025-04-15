"use strict";(self.webpackChunkinfoseclessons=self.webpackChunkinfoseclessons||[]).push([[780],{5631:(i,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>t,default:()=>h,frontMatter:()=>d,metadata:()=>l,toc:()=>o});const l=JSON.parse('{"id":"servers/laps","title":"LAPS (Local Administrator Password Solution) N\u0259dir?","description":"Microsoft LAPS \u2013 Local Administrator \u015fifr\u0259l\u0259rinin m\u0259rk\u0259zl\u0259\u015fmi\u015f v\u0259 avtomatik idar\u0259si","source":"@site/docs/servers/laps.md","sourceDirName":"servers","slug":"/servers/laps","permalink":"/infoseclessons/az/servers/laps","draft":false,"unlisted":false,"editUrl":"https://github.com/farzaliyevemil/infoseclessons/edit/main/docs/servers/laps.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"id":"laps","title":"LAPS (Local Administrator Password Solution) N\u0259dir?","description":"Microsoft LAPS \u2013 Local Administrator \u015fifr\u0259l\u0259rinin m\u0259rk\u0259zl\u0259\u015fmi\u015f v\u0259 avtomatik idar\u0259si","sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Jump Server N\u0259dir?","permalink":"/infoseclessons/az/servers/jump-server"},"next":{"title":"placeholder","permalink":"/infoseclessons/az/networking/placeholder"}}');var s=r(4848),e=r(8453);const d={id:"laps",title:"LAPS (Local Administrator Password Solution) N\u0259dir?",description:"Microsoft LAPS \u2013 Local Administrator \u015fifr\u0259l\u0259rinin m\u0259rk\u0259zl\u0259\u015fmi\u015f v\u0259 avtomatik idar\u0259si",sidebar_position:2},t=void 0,a={},o=[{value:"\ud83d\udd10 LAPS (Local Administrator Password Solution) n\u0259dir?",id:"-laps-local-administrator-password-solution-n\u0259dir",level:2},{value:"\ud83c\udfaf Niy\u0259 LAPS?",id:"-niy\u0259-laps",level:2},{value:"\ud83d\udee0\ufe0f LAPS nec\u0259 i\u015fl\u0259yir?",id:"\ufe0f-laps-nec\u0259-i\u015fl\u0259yir",level:2},{value:"\ud83d\uddc2\ufe0f AD-d\u0259 saxlan\u0131lan m\u0259lumat",id:"\ufe0f-ad-d\u0259-saxlan\u0131lan-m\u0259lumat",level:2},{value:"\ud83e\uddfe Auditing &amp; Monitoring",id:"-auditing--monitoring",level:2},{value:"\ud83d\udd10 T\u0259hl\xfck\u0259sizlik v\u0259 \u018fn Yax\u015f\u0131 T\u0259cr\xfcb\u0259l\u0259r",id:"-t\u0259hl\xfck\u0259sizlik-v\u0259-\u0259n-yax\u015f\u0131-t\u0259cr\xfcb\u0259l\u0259r",level:2},{value:"\ud83c\udd95 Windows LAPS (2023+)",id:"-windows-laps-2023",level:2},{value:"\ud83e\udde0 N\u0259tic\u0259",id:"-n\u0259tic\u0259",level:2}];function c(i){const n={br:"br",code:"code",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,e.R)(),...i.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"-laps-local-administrator-password-solution-n\u0259dir",children:"\ud83d\udd10 LAPS (Local Administrator Password Solution) n\u0259dir?"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"LAPS"})," \u2014 Microsoft-un t\u0259qdim etdiyi bir h\u0259ll yoludur ki, h\u0259r bir domain-joined Windows cihaz\u0131n\u0131n ",(0,s.jsx)(n.strong,{children:"local administrator \u015fifr\u0259sini avtomatik d\u0259yi\u015fir"})," v\u0259 onu ",(0,s.jsx)(n.strong,{children:"Active Directory-d\u0259 t\u0259hl\xfck\u0259siz \u015f\u0259kild\u0259 saxlay\u0131r"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"\u018fsas m\u0259qs\u0259d:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Eyni \u015fifr\u0259 istifad\u0259sinin qar\u015f\u0131s\u0131n\u0131 almaq"}),"\n",(0,s.jsx)(n.li,{children:"\u015eifr\u0259 rotasiyas\u0131n\u0131 avtomatla\u015fd\u0131rmaq"}),"\n",(0,s.jsx)(n.li,{children:"Local admin hesablar\u0131n\u0131n t\u0259hl\xfck\u0259sizliyini art\u0131rmaq"}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"-niy\u0259-laps",children:"\ud83c\udfaf Niy\u0259 LAPS?"}),"\n",(0,s.jsx)(n.p,{children:"\u018fn\u0259n\u0259vi \u015f\u0259kild\u0259 \u015firk\u0259tl\u0259rd\u0259 b\xfct\xfcn komp\xfcterl\u0259rd\u0259 eyni local admin \u015fifr\u0259si olurdu. Bu is\u0259:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Bir cihaz kompromis olarsa, ",(0,s.jsx)(n.strong,{children:"b\xfct\xfcn cihazlara yol a\xe7\u0131r"})]}),"\n",(0,s.jsxs)(n.li,{children:["Red Team \xfc\xe7\xfcn ",(0,s.jsx)(n.strong,{children:"lateral movement"})," \xe7ox asan olur"]}),"\n",(0,s.jsx)(n.li,{children:"SOC & Blue Team \xfc\xe7\xfcn is\u0259 izl\u0259nm\u0259si v\u0259 n\u0259zar\u0259ti \xe7\u0259tindir"}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"\ufe0f-laps-nec\u0259-i\u015fl\u0259yir",children:"\ud83d\udee0\ufe0f LAPS nec\u0259 i\u015fl\u0259yir?"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Group Policy (GPO)"})," vasit\u0259sil\u0259 konfiqurasiya olunur."]}),"\n",(0,s.jsxs)(n.li,{children:["H\u0259r komp\xfcter m\xfc\u0259yy\u0259n intervalda (m\u0259s\u0259l\u0259n, 30 g\xfcnd\u0259 bir) \xf6z ",(0,s.jsx)(n.code,{children:"Administrator"})," \u015fifr\u0259sini ",(0,s.jsx)(n.strong,{children:"\xf6z-\xf6z\xfcn\u0259 d\u0259yi\u015fir"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Bu \u015fifr\u0259 ",(0,s.jsx)(n.strong,{children:"Active Directory (AD)"})," obyektinin atributu kimi saxlan\u0131l\u0131r."]}),"\n",(0,s.jsx)(n.li,{children:"Yaln\u0131z m\xfc\u0259yy\u0259n istifad\u0259\xe7il\u0259r v\u0259 ya qruplar bu \u015fifr\u0259ni g\xf6r\u0259 bil\u0259r."}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"\ufe0f-ad-d\u0259-saxlan\u0131lan-m\u0259lumat",children:"\ud83d\uddc2\ufe0f AD-d\u0259 saxlan\u0131lan m\u0259lumat"}),"\n",(0,s.jsxs)(n.p,{children:["LAPS \u015fifr\u0259ni Active Directory-d\u0259 ",(0,s.jsx)(n.code,{children:"ms-Mcs-AdmPwd"})," atributunda saxlay\u0131r.",(0,s.jsx)(n.br,{}),"\n","\u018flav\u0259 metadata is\u0259 ",(0,s.jsx)(n.code,{children:"ms-Mcs-AdmPwdExpirationTime"})," atributunda yerl\u0259\u015fir."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"-auditing--monitoring",children:"\ud83e\uddfe Auditing & Monitoring"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u015eifr\u0259y\u0259 kim bax\u0131b?"}),"\n",(0,s.jsx)(n.li,{children:"\u015eifr\u0259 n\u0259 vaxt d\u0259yi\u015filib?"}),"\n",(0,s.jsx)(n.li,{children:"Kimin icaz\u0259si var?"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"B\xfct\xfcn bu m\u0259lumatlar izl\u0259nil\u0259 bilir. Azure Sentinel, Sysmon v\u0259 s. il\u0259 inteqrasiya da m\xfcmk\xfcnd\xfcr."}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"-t\u0259hl\xfck\u0259sizlik-v\u0259-\u0259n-yax\u015f\u0131-t\u0259cr\xfcb\u0259l\u0259r",children:"\ud83d\udd10 T\u0259hl\xfck\u0259sizlik v\u0259 \u018fn Yax\u015f\u0131 T\u0259cr\xfcb\u0259l\u0259r"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"T\u0259hl\xfck\u0259sizlik Add\u0131m\u0131"}),(0,s.jsx)(n.th,{children:"T\xf6vsiy\u0259"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\ud83d\udd0d RBAC t\u0259tbiqi"}),(0,s.jsx)(n.td,{children:"\u015eifr\u0259y\u0259 baxa bil\u0259c\u0259k user v\u0259 qruplar ciddi \u015f\u0259kild\u0259 m\u0259hdudla\u015fd\u0131r\u0131lmal\u0131d\u0131r"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\ud83d\udd04 Rotation Interval"}),(0,s.jsx)(n.td,{children:"\u015eifr\u0259l\u0259r \u0259n az\u0131 30 g\xfcnd\u0259 bir avtomatik d\u0259yi\u015fdirilm\u0259lidir"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\ud83e\uddfe Monitoring"}),(0,s.jsx)(n.td,{children:"H\u0259r \u015fifr\u0259 oxuma hadis\u0259si loglanmal\u0131d\u0131r"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"\ud83d\udd10 MFA + Tiering"}),(0,s.jsx)(n.td,{children:"High-privileged admin-lar \xfc\xe7\xfcn \u0259lav\u0259 qoruma t\u0259dbirl\u0259ri g\xf6r\xfclm\u0259lidir"})]})]})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"-windows-laps-2023",children:"\ud83c\udd95 Windows LAPS (2023+)"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Windows Server 2022 v\u0259 Windows 11 il\u0259 g\u0259l\u0259n ",(0,s.jsx)(n.strong,{children:"yeni n\u0259sil LAPS"})," art\u0131q ",(0,s.jsx)(n.strong,{children:"built-in"})," \u015f\u0259kild\u0259 m\xf6vcuddur."]}),"\n",(0,s.jsx)(n.li,{children:"Art\u0131q \u0259lav\u0259 agent yazma\u011fa ehtiyac yoxdur."}),"\n",(0,s.jsx)(n.li,{children:"PowerShell modulu il\u0259 daha asan idar\u0259 olunur."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"Get-LapsADPassword -Identity PC-123\n"})}),"\n",(0,s.jsx)(n.h2,{id:"-n\u0259tic\u0259",children:"\ud83e\udde0 N\u0259tic\u0259"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"LAPS"})," \u2014 endpoint t\u0259hl\xfck\u0259sizliyind\u0259 \u0259n sad\u0259 v\u0259 effektiv h\u0259ll\u0259rd\u0259n biridir. \u018fg\u0259r t\u0259\u015fkilat local admin hesablar\u0131ndan istifad\u0259 edirs\u0259, m\xfctl\u0259q \u015f\u0259kild\u0259 LAPS t\u0259tbiq olunmal\u0131d\u0131r."]})]})}function h(i={}){const{wrapper:n}={...(0,e.R)(),...i.components};return n?(0,s.jsx)(n,{...i,children:(0,s.jsx)(c,{...i})}):c(i)}},8453:(i,n,r)=>{r.d(n,{R:()=>d,x:()=>t});var l=r(6540);const s={},e=l.createContext(s);function d(i){const n=l.useContext(e);return l.useMemo((function(){return"function"==typeof i?i(n):{...n,...i}}),[n,i])}function t(i){let n;return n=i.disableParentContext?"function"==typeof i.components?i.components(s):i.components||s:d(i.components),l.createElement(e.Provider,{value:n},i.children)}}}]);