"use strict";(self.webpackChunkinfoseclessons=self.webpackChunkinfoseclessons||[]).push([[203],{7985:(i,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>e,toc:()=>o});const e=JSON.parse('{"id":"operating-systems/windows/bitlocker","title":"BitLocker N\u0259dir?","description":"Windows sisteml\u0259rind\u0259 disk \u015fifr\u0259l\u0259m\u0259si \xfc\xe7\xfcn istifad\u0259 edil\u0259n BitLocker texnologiyas\u0131na giri\u015f.","source":"@site/docs/operating-systems/windows/bitlocker.md","sourceDirName":"operating-systems/windows","slug":"/operating-systems/windows/bitlocker","permalink":"/infoseclessons/operating-systems/windows/bitlocker","draft":false,"unlisted":false,"editUrl":"https://github.com/farzaliyevemil/infoseclessons/edit/main/docs/operating-systems/windows/bitlocker.md","tags":[],"version":"current","frontMatter":{"id":"bitlocker","title":"BitLocker N\u0259dir?","description":"Windows sisteml\u0259rind\u0259 disk \u015fifr\u0259l\u0259m\u0259si \xfc\xe7\xfcn istifad\u0259 edil\u0259n BitLocker texnologiyas\u0131na giri\u015f."},"sidebar":"tutorialSidebar","previous":{"title":"AppLocker N\u0259dir?","permalink":"/infoseclessons/operating-systems/windows/applocker"},"next":{"title":"Run Commands in Windows","permalink":"/infoseclessons/operating-systems/windows/run-commands"}}');var r=n(4848),l=n(8453);const t={id:"bitlocker",title:"BitLocker N\u0259dir?",description:"Windows sisteml\u0259rind\u0259 disk \u015fifr\u0259l\u0259m\u0259si \xfc\xe7\xfcn istifad\u0259 edil\u0259n BitLocker texnologiyas\u0131na giri\u015f."},a="\ud83d\udd10 BitLocker N\u0259dir?",d={},o=[{value:"\ud83c\udfaf \u018fsas M\u0259qs\u0259di",id:"-\u0259sas-m\u0259qs\u0259di",level:2},{value:"\u2699\ufe0f \u0130\u015f Prinsipi",id:"\ufe0f-i\u0307\u015f-prinsipi",level:2},{value:"\u2705 \xdcst\xfcnl\xfckl\u0259ri",id:"-\xfcst\xfcnl\xfckl\u0259ri",level:2},{value:"\u26a0\ufe0f M\u0259hdudiyy\u0259tl\u0259r",id:"\ufe0f-m\u0259hdudiyy\u0259tl\u0259r",level:2},{value:"\ud83d\udee0\ufe0f Aktivl\u0259\u015fdirm\u0259",id:"\ufe0f-aktivl\u0259\u015fdirm\u0259",level:2},{value:"GUI il\u0259:",id:"gui-il\u0259",level:3},{value:"PowerShell il\u0259:",id:"powershell-il\u0259",level:3},{value:"\ud83e\uddfe Recovery Key Harada Saxlan\u0131r?",id:"-recovery-key-harada-saxlan\u0131r",level:2},{value:"\ud83e\udde0 Q\u0131sa N\u0259tic\u0259",id:"-q\u0131sa-n\u0259tic\u0259",level:2}];function c(i){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...i.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"-bitlocker-n\u0259dir",children:"\ud83d\udd10 BitLocker N\u0259dir?"})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"BitLocker"})," \u2014 Windows t\u0259r\u0259find\u0259n t\u0259qdim edil\u0259n disk \u015fifr\u0259l\u0259m\u0259 texnologiyas\u0131d\u0131r. M\u0259qs\u0259di m\u0259lumatlar\u0131n qorunmas\u0131n\u0131 t\u0259min etm\u0259kdir. H\u0259tta sistem a\xe7\u0131lmam\u0131\u015f olsa bel\u0259, m\u0259lumatlar qorunur."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-\u0259sas-m\u0259qs\u0259di",children:"\ud83c\udfaf \u018fsas M\u0259qs\u0259di"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Fiziki o\u011furluq v\u0259 ya cihaz itkisi zaman\u0131 diskin oxunmas\u0131n\u0131n qar\u015f\u0131s\u0131n\u0131 almaq."}),"\n",(0,r.jsx)(s.li,{children:"Offline h\xfccumlara qar\u015f\u0131 qoruma."}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"\ufe0f-i\u0307\u015f-prinsipi",children:"\u2699\ufe0f \u0130\u015f Prinsipi"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Tam Disk \u015eifr\u0259l\u0259m\u0259si (Full Disk Encryption)"}),": Diskd\u0259ki b\xfct\xfcn m\u0259lumatlar\u0131 \u015fifr\u0259l\u0259yir."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"TPM (Trusted Platform Module) il\u0259 \u0130nteqrasiya"}),": \u015eifr\u0259l\u0259m\u0259 a\xe7arlar\u0131n\u0131 t\u0259hl\xfck\u0259siz saxlamaq \xfc\xe7\xfcn TPM istifad\u0259 olunur."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Recovery Key il\u0259 B\u0259rpa"}),": \u015eifr\u0259l\u0259nmi\u015f diskl\u0259ri b\u0259rpa etm\u0259k \xfc\xe7\xfcn Recovery Key istifad\u0259 olunur."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-\xfcst\xfcnl\xfckl\u0259ri",children:"\u2705 \xdcst\xfcnl\xfckl\u0259ri"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Sad\u0259 idar\u0259etm\u0259 (GUI v\u0259 PowerShell il\u0259)."}),"\n",(0,r.jsx)(s.li,{children:"Tam disk \u015fifr\u0259l\u0259m\u0259si."}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"BitLocker To Go"}),": USB cihazlar \xfc\xe7\xfcn \u015fifr\u0259l\u0259m\u0259 d\u0259st\u0259yi."]}),"\n",(0,r.jsx)(s.li,{children:"TPM d\u0259st\u0259yi il\u0259 daha y\xfcks\u0259k t\u0259hl\xfck\u0259sizlik."}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"\ufe0f-m\u0259hdudiyy\u0259tl\u0259r",children:"\u26a0\ufe0f M\u0259hdudiyy\u0259tl\u0259r"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Home Edition"})," versiyas\u0131nda m\xf6vcud deyil."]}),"\n",(0,r.jsx)(s.li,{children:"TPM olmayan sisteml\u0259rd\u0259 konfiqurasiya \xe7\u0259tin ola bil\u0259r."}),"\n",(0,r.jsx)(s.li,{children:"Az da olsa performans itkisi m\xfc\u015fahid\u0259 edil\u0259 bil\u0259r."}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"\ufe0f-aktivl\u0259\u015fdirm\u0259",children:"\ud83d\udee0\ufe0f Aktivl\u0259\u015fdirm\u0259"}),"\n",(0,r.jsx)(s.h3,{id:"gui-il\u0259",children:"GUI il\u0259:"}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:'"Manage BitLocker"'})," axtar\u0131n."]}),"\n",(0,r.jsx)(s.li,{children:"\u0130st\u0259diyiniz diski se\xe7in v\u0259 aktiv edin."}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Recovery Key"})," saxlamaq \xfcsulunu se\xe7in (Microsoft hesab\u0131, USB v\u0259 ya \xe7ap)."]}),"\n",(0,r.jsx)(s.li,{children:"\u015eifr\u0259l\u0259m\u0259 tipini se\xe7in v\u0259 prosesi ba\u015flad\u0131n."}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"powershell-il\u0259",children:"PowerShell il\u0259:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-powershell",children:'Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes256 -UsedSpaceOnly -TpmProtector\n'})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-recovery-key-harada-saxlan\u0131r",children:"\ud83e\uddfe Recovery Key Harada Saxlan\u0131r?"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Microsoft Hesab\u0131"}),": Recovery Key avtomatik olaraq hesab\u0131n\u0131za y\xfckl\u0259nir."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Active Directory"}),": \u015e\u0259b\u0259k\u0259 m\xfchitl\u0259rind\u0259 saxlan\u0131la bil\u0259r."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Azure AD"}),": Bulud \u0259sasl\u0131 idar\u0259etm\u0259 \xfc\xe7\xfcn."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"USB v\u0259 ya \xc7ap"}),": Fiziki olaraq saxlamaq \xfc\xe7\xfcn."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-q\u0131sa-n\u0259tic\u0259",children:"\ud83e\udde0 Q\u0131sa N\u0259tic\u0259"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"BitLocker"}),", \u015f\u0259xsi v\u0259 korporativ istifad\u0259\xe7il\u0259r \xfc\xe7\xfcn effektiv t\u0259hl\xfck\u0259sizlik vasit\u0259sidir. Diskin offline \u015fifr\u0259l\u0259nm\u0259si h\xfccumlara qar\u015f\u0131 ilkin qoruma s\u0259viyy\u0259sini t\u0259min edir. Do\u011fru qurulduqda, m\u0259lumatlar\u0131n t\u0259hl\xfck\u0259sizliyini art\u0131rmaq \xfc\xe7\xfcn \u0259v\u0259zolunmaz bir vasit\u0259dir."]})]})}function h(i={}){const{wrapper:s}={...(0,l.R)(),...i.components};return s?(0,r.jsx)(s,{...i,children:(0,r.jsx)(c,{...i})}):c(i)}},8453:(i,s,n)=>{n.d(s,{R:()=>t,x:()=>a});var e=n(6540);const r={},l=e.createContext(r);function t(i){const s=e.useContext(l);return e.useMemo((function(){return"function"==typeof i?i(s):{...s,...i}}),[s,i])}function a(i){let s;return s=i.disableParentContext?"function"==typeof i.components?i.components(r):i.components||r:t(i.components),e.createElement(l.Provider,{value:s},i.children)}}}]);