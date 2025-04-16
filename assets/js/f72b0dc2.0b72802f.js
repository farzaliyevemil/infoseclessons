"use strict";(self.webpackChunkinfoseclessons=self.webpackChunkinfoseclessons||[]).push([[393],{2624:(e,s,d)=>{d.r(s),d.d(s,{assets:()=>l,contentTitle:()=>t,default:()=>x,frontMatter:()=>c,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"operating-systems/windows/run-commands","title":"Run Commands in Windows","description":"Useful and practical Windows Run commands for IT and InfoSec professionals.","source":"@site/docs/operating-systems/windows/run-commands.md","sourceDirName":"operating-systems/windows","slug":"/operating-systems/windows/run-commands","permalink":"/infoseclessons/operating-systems/windows/run-commands","draft":false,"unlisted":false,"editUrl":"https://github.com/farzaliyevemil/infoseclessons/edit/main/docs/operating-systems/windows/run-commands.md","tags":[],"version":"current","frontMatter":{"id":"run-commands","title":"Run Commands in Windows","description":"Useful and practical Windows Run commands for IT and InfoSec professionals."},"sidebar":"tutorialSidebar","previous":{"title":"What is BitLocker?","permalink":"/infoseclessons/operating-systems/windows/bitlocker"},"next":{"title":"Disabling Unnecessary Windows Services","permalink":"/infoseclessons/operating-systems/windows/disable-windows-services"}}');var r=d(4848),i=d(8453);const c={id:"run-commands",title:"Run Commands in Windows",description:"Useful and practical Windows Run commands for IT and InfoSec professionals."},t=void 0,l={},o=[{value:"\ud83d\udee0\ufe0f System Tools",id:"\ufe0f-system-tools",level:2},{value:"\ud83d\udd52 Time &amp; Regional",id:"-time--regional",level:2},{value:"\ud83d\udcd0 Display &amp; Appearance",id:"-display--appearance",level:2},{value:"\ud83e\uddf0 Miscellaneous",id:"-miscellaneous",level:2}];function h(e){const s={blockquote:"blockquote",code:"code",h2:"h2",hr:"hr",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.p,{children:"This page provides a categorized list of practical Windows Run commands, useful for administrators, blue teamers, and anyone managing Windows systems."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"\ufe0f-system-tools",children:"\ud83d\udee0\ufe0f System Tools"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Task"}),(0,r.jsx)(s.th,{children:"Run Command"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Add Hardware Wizard"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"hdwwiz"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Programs and Features"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"appwiz.cpl"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Admin Tools"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"control admintools"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Advanced User Accounts"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"netplwiz"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Authorization Manager"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"azman.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Backup and Restore"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"sdclt"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Certificate Manager"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"certmgr.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Check Disk Utility"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"chkdsk"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Color Management"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"colorcpl.exe"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Command Prompt"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"cmd"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Component Services"}),(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"dcomcnfg"})," / ",(0,r.jsx)(s.code,{children:"comexp.msc"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Computer Management"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"compmgmt.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Credential Backup & Restore"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"credwiz"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Data Execution Prevention"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"SystemPropertiesDataExecutionPrevention"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Device Manager"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"devmgmt.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Disk Management"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"diskmgmt.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Disk Partition Manager"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"diskpart"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Driver Verifier"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"verifier"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Encrypting File System (EFS)"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"rekeywiz"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Event Viewer"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"eventvwr.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"File Signature Verification"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"sigverif"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Firewall Settings"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"firewall.cpl"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Group Policy Editor"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"gpedit.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"IP Configuration (CMD)"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"cmd.exe /k %windir%\\system32\\ipconfig.exe"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Internet Properties"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"inetcpl.cpl"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Local Security Policy"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"secpol.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Local Users and Groups"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"lusrmgr.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Microsoft Management Console"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"mmc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Network Connections"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"ncpa.cpl"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Notepad"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"notepad"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Performance Monitor"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"perfmon.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Registry Editor"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"regedit"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Remote Desktop"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"mstsc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Resource Monitor"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"resmon"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Services"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"services.msc"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Task Scheduler"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"control schedtasks"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"UAC Settings"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"useraccountcontrolsettings.exe"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Windows Troubleshooter"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"control.exe /name Microsoft.Troubleshooting"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Windows Update"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"control /name Microsoft.WindowsUpdate"})})]})]})]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-time--regional",children:"\ud83d\udd52 Time & Regional"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Task"}),(0,r.jsx)(s.th,{children:"Run Command"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Date and Time"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"timedate.cpl"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Regional Settings"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"intl.cpl"})})]})]})]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-display--appearance",children:"\ud83d\udcd0 Display & Appearance"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Task"}),(0,r.jsx)(s.th,{children:"Run Command"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Display Color Calibration"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"dccw"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Display DPI / Text Size"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"dpiscaling"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Screen Resolution"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"desk.cpl"})})]})]})]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"-miscellaneous",children:"\ud83e\uddf0 Miscellaneous"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Task"}),(0,r.jsx)(s.th,{children:"Run Command"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"On-Screen Keyboard"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"osk"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Snipping Tool"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"snippingtool"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Paint"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"mspaint"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Word"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"winword"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"PowerPoint"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"powerpnt"})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"Excel"}),(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"excel"})})]})]})]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:["\ud83d\udca1 ",(0,r.jsx)(s.strong,{children:"Note"}),": Most commands can be opened by pressing ",(0,r.jsx)(s.code,{children:"Win + R"}),", typing the command, and hitting Enter."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{})]})}function x(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},8453:(e,s,d)=>{d.d(s,{R:()=>c,x:()=>t});var n=d(6540);const r={},i=n.createContext(r);function c(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function t(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);