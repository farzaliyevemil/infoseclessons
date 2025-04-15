"use strict";(self.webpackChunkinfoseclessons=self.webpackChunkinfoseclessons||[]).push([[669],{3242:(r,i,s)=>{s.r(i),s.d(i,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>t,metadata:()=>e,toc:()=>o});const e=JSON.parse('{"id":"servers/jump-server","title":"Jump Server N\u0259dir?","description":"Jump Server (Bastion Host) n\u0259dir, harada istifad\u0259 olunur v\u0259 \xfcst\xfcnl\xfckl\u0259ri n\u0259l\u0259rdir?","source":"@site/docs/servers/jump-server.md","sourceDirName":"servers","slug":"/servers/jump-server","permalink":"/infoseclessons/servers/jump-server","draft":false,"unlisted":false,"editUrl":"https://github.com/farzaliyevemil/infoseclessons/edit/main/docs/servers/jump-server.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"id":"jump-server","title":"Jump Server N\u0259dir?","description":"Jump Server (Bastion Host) n\u0259dir, harada istifad\u0259 olunur v\u0259 \xfcst\xfcnl\xfckl\u0259ri n\u0259l\u0259rdir?","sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Coming Soon","permalink":"/infoseclessons/operating-systems/linux/placeholder-server"},"next":{"title":"LAPS (Local Administrator Password Solution) N\u0259dir?","permalink":"/infoseclessons/servers/laps"}}');var n=s(4848),l=s(8453);const t={id:"jump-server",title:"Jump Server N\u0259dir?",description:"Jump Server (Bastion Host) n\u0259dir, harada istifad\u0259 olunur v\u0259 \xfcst\xfcnl\xfckl\u0259ri n\u0259l\u0259rdir?",sidebar_position:1},a=void 0,d={},o=[{value:"\ud83d\udd10 Jump Server (v\u0259 ya Bastion Host) N\u0259dir?",id:"-jump-server-v\u0259-ya-bastion-host-n\u0259dir",level:2},{value:"\ud83e\udded Harada \u0130stifad\u0259 Olunur?",id:"-harada-i\u0307stifad\u0259-olunur",level:2},{value:"\ud83d\udee1\ufe0f \u018fsas \xdcst\xfcnl\xfckl\u0259r",id:"\ufe0f-\u0259sas-\xfcst\xfcnl\xfckl\u0259r",level:2},{value:"\ud83e\uddf0 Texniki Misal",id:"-texniki-misal",level:2},{value:"\ud83e\uddf1 Real Misal \u2013 SSH il\u0259 istifad\u0259:",id:"-real-misal--ssh-il\u0259-istifad\u0259",level:3},{value:"OpenSSH konfiqurasiyas\u0131nda:",id:"openssh-konfiqurasiyas\u0131nda",level:3},{value:"\u2757 Riskl\u0259r v\u0259 T\xf6vsiy\u0259l\u0259r",id:"-riskl\u0259r-v\u0259-t\xf6vsiy\u0259l\u0259r",level:2},{value:"\ud83d\udccc N\u0259tic\u0259",id:"-n\u0259tic\u0259",level:2}];function c(r){const i={br:"br",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...r.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h2,{id:"-jump-server-v\u0259-ya-bastion-host-n\u0259dir",children:"\ud83d\udd10 Jump Server (v\u0259 ya Bastion Host) N\u0259dir?"}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.strong,{children:"Jump Server"})," \u2014 daxili \u015f\u0259b\u0259k\u0259d\u0259 yerl\u0259\u015f\u0259n sisteml\u0259r\u0259 giri\u015fi ",(0,n.jsx)(i.strong,{children:"m\u0259rk\u0259zl\u0259\u015fdirilmi\u015f v\u0259 t\u0259hl\xfck\u0259siz"})," \u015f\u0259kild\u0259 t\u0259min ed\u0259n x\xfcsusi bir serverdir.",(0,n.jsx)(i.br,{}),"\n","\u0130stifad\u0259\xe7il\u0259r v\u0259 ya administratorlar \u0259vv\u0259lc\u0259 bu server\u0259 daxil olurlar, daha sonra buradan dig\u0259r daxili serverl\u0259r\u0259 ke\xe7id edirl\u0259r."]}),"\n",(0,n.jsx)(i.hr,{}),"\n",(0,n.jsx)(i.h2,{id:"-harada-i\u0307stifad\u0259-olunur",children:"\ud83e\udded Harada \u0130stifad\u0259 Olunur?"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Bank v\u0259 maliyy\u0259 qurumlar\u0131"}),"\n",(0,n.jsx)(i.li,{children:"B\xf6y\xfck korporativ \u015f\u0259b\u0259k\u0259l\u0259r"}),"\n",(0,n.jsx)(i.li,{children:"Cloud provider-l\u0259rd\u0259 (AWS, Azure, GCP)"}),"\n",(0,n.jsx)(i.li,{children:"T\u0259hl\xfck\u0259siz DevOps m\xfchitl\u0259rind\u0259 (CI/CD arxitekturas\u0131 il\u0259)"}),"\n"]}),"\n",(0,n.jsx)(i.hr,{}),"\n",(0,n.jsx)(i.h2,{id:"\ufe0f-\u0259sas-\xfcst\xfcnl\xfckl\u0259r",children:"\ud83d\udee1\ufe0f \u018fsas \xdcst\xfcnl\xfckl\u0259r"}),"\n",(0,n.jsxs)(i.table,{children:[(0,n.jsx)(i.thead,{children:(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.th,{children:(0,n.jsx)(i.strong,{children:"\xdcst\xfcnl\xfck"})}),(0,n.jsx)(i.th,{children:(0,n.jsx)(i.strong,{children:"\u0130zah"})})]})}),(0,n.jsxs)(i.tbody,{children:[(0,n.jsxs)(i.tr,{children:[(0,n.jsxs)(i.td,{children:["\ud83d\udd12 ",(0,n.jsx)(i.strong,{children:"T\u0259hl\xfck\u0259sizlik"})]}),(0,n.jsx)(i.td,{children:"\u018fsas giri\u015f n\xf6qt\u0259si t\u0259k bir server\u0259 y\xf6n\u0259ldilir. Bu da daxili sisteml\u0259rin birba\u015fa exposed olmamas\u0131n\u0131 t\u0259min edir."})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsxs)(i.td,{children:["\ud83e\uddfe ",(0,n.jsx)(i.strong,{children:"Auditing & Monitoring"})]}),(0,n.jsx)(i.td,{children:"Jump Server-l\u0259r \xfcz\u0259rind\u0259n ke\xe7\u0259n b\xfct\xfcn ba\u011flant\u0131lar loq fayllarda qeyd olunur v\u0259 izl\u0259n\u0259 bilir."})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsxs)(i.td,{children:["\ud83e\uddcd ",(0,n.jsx)(i.strong,{children:"Identity Control"})]}),(0,n.jsx)(i.td,{children:"Kim hans\u0131 sistem\u0259 daxil olub? Hans\u0131 \u0259mrl\u0259ri icra edib? \u2013 b\xfct\xfcn bu suallar\u0131n cavab\u0131 izl\u0259nil\u0259 bil\u0259r."})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsxs)(i.td,{children:["\ud83d\udd01 ",(0,n.jsx)(i.strong,{children:"Multi-hop SSH"})]}),(0,n.jsx)(i.td,{children:"Yaln\u0131z birba\u015fa \u015f\u0259b\u0259k\u0259y\u0259 \xe7\u0131x\u0131\u015f\u0131 olmayan serverl\u0259r\u0259 t\u0259k hopla deyil, jump host vasit\u0259sil\u0259 giri\u015f imkan\u0131 verir."})]})]})]}),"\n",(0,n.jsx)(i.hr,{}),"\n",(0,n.jsx)(i.h2,{id:"-texniki-misal",children:"\ud83e\uddf0 Texniki Misal"}),"\n",(0,n.jsxs)(i.p,{children:["Bir \u015firk\u0259td\u0259 yaln\u0131z ",(0,n.jsx)(i.code,{children:"10.0.0.0/8"})," daxili \u015f\u0259b\u0259k\u0259sind\u0259 olan sisteml\u0259r\u0259 SSH il\u0259 daxil olmaq icaz\u0259lidir. Amma bu sisteml\u0259r ",(0,n.jsx)(i.strong,{children:"internet\u0259 a\xe7\u0131q deyil"}),". O halda:"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-plaintext",children:"Client (\u0130nternet) \u2192 Jump Server (DMZ-d\u0259 yerl\u0259\u015fir) \u2192 Daxili Serverl\u0259r (SSH)\n"})}),"\n",(0,n.jsx)(i.h3,{id:"-real-misal--ssh-il\u0259-istifad\u0259",children:"\ud83e\uddf1 Real Misal \u2013 SSH il\u0259 istifad\u0259:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-bash",children:"ssh -J user@jump-host user@internal-server\n"})}),"\n",(0,n.jsx)(i.h3,{id:"openssh-konfiqurasiyas\u0131nda",children:"OpenSSH konfiqurasiyas\u0131nda:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-plaintext",children:"Host internal\r\n  HostName 10.0.0.5\r\n  User emil\r\n  ProxyJump jumpuser@jump.example.com\n"})}),"\n",(0,n.jsx)(i.hr,{}),"\n",(0,n.jsx)(i.h2,{id:"-riskl\u0259r-v\u0259-t\xf6vsiy\u0259l\u0259r",children:"\u2757 Riskl\u0259r v\u0259 T\xf6vsiy\u0259l\u0259r"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.strong,{children:"Riskl\u0259r"}),":",(0,n.jsx)(i.br,{}),"\n","Jump Server-l\u0259r m\u0259rk\u0259zi n\xf6qt\u0259 oldu\u011fu \xfc\xe7\xfcn kompromis olarsa, b\xfct\xfcn daxili sisteml\u0259r risk\u0259 gir\u0259 bil\u0259r."]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.strong,{children:"T\xf6vsiy\u0259l\u0259r"}),":"]}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"MFA (Multi-Factor Authentication) v\u0259 \u015fifr\u0259 \u0259v\u0259zin\u0259 SSH key istifad\u0259si \u015f\u0259rtdir."}),"\n",(0,n.jsx)(i.li,{children:"VPN il\u0259 birl\u0259\u015f\u0259r\u0259k istifad\u0259 t\xf6vsiy\u0259 olunur."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(i.hr,{}),"\n",(0,n.jsx)(i.h2,{id:"-n\u0259tic\u0259",children:"\ud83d\udccc N\u0259tic\u0259"}),"\n",(0,n.jsxs)(i.p,{children:['Jump Server sad\u0259c\u0259 bir "ke\xe7id n\xf6qt\u0259si" deyil \u2013 t\u0259tbiq olunan t\u0259hl\xfck\u0259sizlik siyas\u0259tl\u0259rinin m\u0259rk\u0259zidir.',(0,n.jsx)(i.br,{}),"\n","Do\u011fru qurulmu\u015f Jump Server, \u015f\u0259b\u0259k\u0259 h\xfccumlar\u0131n\u0131n qar\u015f\u0131s\u0131n\u0131 almaqda b\xf6y\xfck rol oynay\u0131r."]})]})}function u(r={}){const{wrapper:i}={...(0,l.R)(),...r.components};return i?(0,n.jsx)(i,{...r,children:(0,n.jsx)(c,{...r})}):c(r)}},8453:(r,i,s)=>{s.d(i,{R:()=>t,x:()=>a});var e=s(6540);const n={},l=e.createContext(n);function t(r){const i=e.useContext(l);return e.useMemo((function(){return"function"==typeof r?r(i):{...i,...r}}),[i,r])}function a(r){let i;return i=r.disableParentContext?"function"==typeof r.components?r.components(n):r.components||n:t(r.components),e.createElement(l.Provider,{value:i},r.children)}}}]);