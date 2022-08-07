(()=>{const e=document.getElementById("submit"),t=document.getElementById("save"),n=document.getElementById("table");document.getElementById("itmType").value;window.onload=function(){if(localStorage.getItem("data")){let e=JSON.parse(localStorage.getItem("data"));document.querySelector("#NPU").value=e.NPU,document.querySelector("#chair").value=e.chair,document.querySelector("#location").value=e.loc,document.querySelector("#planner").value=e.planner}},document.querySelector("#itmType").addEventListener("change",(function(){switch(document.querySelector("#itmType").value){case"MOSE":case"LRB":applName.setAttribute("placeholder","Applicant Name"),applName.value="";break;case"ZRB":case"Text Amendment":applName.value="Z-22-",applName.setAttribute("placeholder","Z-");break;case"SUP":applName.value="U-22-",applName.setAttribute("placeholder","U-");break;case"BZA":applName.value="V-22-",applName.setAttribute("placeholder","V-");break;case"CDP":applName.value="CDP-22-",applName.setAttribute("placeholder","CDP-");break;case"SD":applName.value="SD-22-",applName.setAttribute("placeholder","SD-");break;case"LOR":applName.value="LOR-22-",applName.setAttribute("placeholder","LOR-");break;case"N/A":applName.value="",applName.removeAttribute("placeholder")}})),e.addEventListener("click",(e=>{e.preventDefault();let t=document.querySelector("#itmType").selectedOptions[0].value,l=document.querySelector("#applName").value.trim(),a=document.querySelector("#disposal").value||"",o=document.querySelector("#conditions").value.trim()||"";if("Type"===t||""===l)return;let r=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("button"),i=document.createElement("td"),u=document.createElement("td"),m=document.createElement("td");c.innerText=t,c.prepend(d),d.setAttribute("type","button"),d.setAttribute("class","btn-close"),i.textContent=l,i.setAttribute("contenteditable","true"),i.classList.add("applName"),u.textContent=a,u.classList.add("disp"),m.textContent=o,m.classList.add("comments");let s=document.createElement("tbody");if(s.append(r),n.append(s),r.appendChild(c),r.appendChild(i),r.appendChild(u),""!==o){let e=document.createElement("tr");m.setAttribute("colspan","3"),m.setAttribute("contenteditable","true"),m.classList.add("comments"),m.textContent=o,e.appendChild(m),s.appendChild(e)}console.log("new row added"),document.querySelector("#addItem").reset(),function(){if(null===document.querySelector("#demo"))return;document.querySelector("#demo").remove()}()})),document.querySelector("#table").addEventListener("click",(e=>{if(e.target.classList.contains("btn-close")){if(!confirm("Are you sure you want to delete this item?"))return;e.target.parentElement.parentElement.parentElement.remove()}})),document.querySelector("#table").addEventListener("click",(e=>{e.target.classList.contains("disp")&&(e.target.innerHTML='<select><option value="Approval">Approval</option><option value="Approval w/C">Approval w/C</option><option value="Denial">Denial</option><option value="Defer">Defer</option><option value="Abstain">Abstain</option></select>',e.target.firstChild.focus()),e.target.addEventListener("blur",(e=>{"SELECT"===e.target.tagName&&(e.target.parentElement.textContent=e.target.value)}))})),document.querySelector("#table").addEventListener("keydown",(e=>{if(!0===e.target.classList.contains("applName")&&"Tab"===e.key&&null==e.target.parentElement.nextElementSibling){let t=document.createElement("tr"),n=document.createElement("td");n.setAttribute("colspan","3"),n.setAttribute("contenteditable","true"),n.classList.add("comments"),n.textContent="",t.appendChild(n),e.target.parentElement.parentElement.appendChild(t)}})),window.onbeforeunload=function(e){return"Form contents will be lost!"},today=document.querySelector("#date").valueAsDate=new Date,document.querySelector("#print").addEventListener("click",(()=>{let e=document.querySelectorAll(".disp");for(let t=0;t<e.length;t++)if("PENDING"===e[t].textContent)return void e[t].classList.add("highlight");window.print()}));let l=document.querySelector("#date");window.addEventListener("beforeprint",(()=>{NPU=document.getElementById("NPU").value;let e=new Date(`${l.value}T00:00:00`),t=`${e.getMonth()+1}-${e.getDate()}-${e.getFullYear()}`;console.log(t),document.title=`Voting Report_NPU-${NPU}_${t}`,document.querySelector("#header").innerText=`VOTING REPORT: NPU-${NPU}  |  ${t}`,document.getElementById("instructions").style.display="none",document.getElementById("print").style.display="none",document.getElementById("report").style.display="none",document.getElementById("save").style.display="none",document.querySelectorAll(".btn-close").forEach((e=>{e.style.display="none",document.getElementById("signature").style.display="block"})),document.querySelectorAll('td[contenteditable="true"]').forEach((e=>{""===e.textContent&&e.parentElement.remove()})),document.querySelectorAll(".highlight").forEach((e=>{e.classList.remove("highlight")}))})),window.addEventListener("afterprint",(()=>{document.title="Planner’s Voting Report",function(){let e={NPU:document.getElementById("NPU").selectedOptions[0].value||"",chair:document.querySelector("#chair").value.trim()||"",loc:document.querySelector("#location").value.trim()||"",planner:document.querySelector("#planner").value.trim()||""};localStorage.setItem("data",JSON.stringify(e)),console.log(e)}(),document.getElementById("instructions").style.display="block",document.getElementById("print").style.display="block",document.getElementById("save").style.display="block",document.getElementById("report").style.display="block",document.querySelectorAll(".btn-close").forEach((e=>{e.style.display="inline"})),document.getElementById("signature").style.display="none"})),t.onClick=()=>{let e={fields:{NPU:document.getElementById("NPU").value,date:document.getElementById("date").value,signature:document.getElementById("signature").value,comments:document.querySelectorAll(".comments").map((e=>e.textContent))}};fetch("https://api.airtable.com/v0/appotIP5Ss3YUKYYR/Table%201",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer keyDFa7RNG5otUO3C"},body:JSON.stringify(e)}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}})();
//# sourceMappingURL=app.js.map
