document.addEventListener("DOMContentLoaded",(function(){let e=[];const t=L.map("map").setView([-14.235004,-51.92528],5),a=L.layerGroup(),o=L.layerGroup(),r=L.layerGroup(),n=L.layerGroup(),s=L.layerGroup(),i=L.layerGroup(),l=L.layerGroup(),c=document.getElementById("telaerro-conteudo"),d=document.getElementById("telaerro"),p=document.getElementById("load"),m=document.getElementById("loadImg"),g=(e,t)=>e?`./js/locations/old/${e}/${t}`:`./js/locations/${t}`,u=[w(g(verData,"locations-gpon.json"),"GPON","green","somatorio-gpon"),w(g(verData,"locations-hfc.json"),"HFC","red","somatorio-hfc"),w(g(verData,"locations-sobrepo.json"),"Sobreposição","yellow","somatorio-sobre"),w(g(verData,"locations-neutrogpon.json"),"GPON Rede neutra","grey","somatorio-neutragpon"),w(g(verData,"locations-neutrohfc.json"),"HFC Rede neutra","violet","somatorio-neutrahfc"),w(g(verData,"locations-nada.json"),"Sem serviço FIXO","black","somatorio-nada"),w(g(verData,"locations-erroapi.json"),"ERRO Consulta API","orange","somatorio-erroapi")],h=["./img/loading0.gif","./img/loading1.gif","./img/loading2.gif"],y=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors',maxZoom:18}),b={OpenStreetMap:y,"Satélite":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:'Imagery &copy; <a href="https://www.arcgis.com/" target="_blank">ArcGIS</a>',maxZoom:18}),"Stamen Terrain":L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",{attribution:'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0" target="_blank">CC BY SA</a>',maxZoom:18}),"Esri World Imagery":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri",maxZoom:18}),"CartoDB Positron":L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'}),"CartoDB Voyager":L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'}),"CartoDB Positron (Sem rótulos)":L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'}),"CartoDB Voyager (Sem rótulos)":L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.carto.com/">CartoDB</a> contributors'}),"CartoDB Dark Matter (Sem rótulos)":L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'}),"Esri World Street Map":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri",maxZoom:18}),"Esri World Topo Map":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri",maxZoom:18})},f={'GPON <img height="20" width="15" src="./img/marker-icon-green.png" alt="Marcador GPON"/>':a,'HFC <img height="20" width="15" src="./img/marker-icon-red.png" alt="Marcador HFC"/>':o,'Sobreposição <img height="20" width="15" src="./img/marker-icon-yellow.png" alt="Marcador Sobreposição"/>':r,'GPON Rede neutra <img height="20" width="15" src="./img/marker-icon-grey.png" alt="Marcador GPON Rede Neutra"/>':n,'HFC Rede neutra <img height="20" width="15" src="./img/marker-icon-violet.png" alt="Marcador HFC Rede Neutra"/>':s,'Sem serviço FIXO <img height="20" width="15" src="./img/marker-icon-black.png" alt="Marcador Sem serviço FIXO"/>':i,'ERRO Consulta API <img height="20" width="15" src="./img/marker-icon-orange.png" alt="Marcador ERRO Consulta API"/>':l},E={GPON:a,HFC:o,"Sobreposição":r,"GPON Rede neutra":n,"HFC Rede neutra":s,"Sem serviço FIXO":i,"ERRO Consulta API":l};function v(e){e.addTo(t)}async function w(t,a,o,r){try{const n=L.layerGroup(),s=await async function(e){try{const t=await fetch(e);if(!t.ok)throw new Error("Erro ao carregar dados.");return t.json()}catch(e){c.textContent=e.message,d.style.display="block"}}(t);e.push({type:a,color:o,data:s}),document.getElementById(r).innerHTML=`<span class="center">${s.length}</span>`;const i=`./img/marker-icon-${o}.png`,l=L.icon({iconUrl:i,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[0,-41]});s.forEach((function(e){L.marker([e.latitude,e.longitude],{icon:l}).bindPopup(e.name).addTo(n)})),s.length>0&&(a in E?E[a].addLayer(n):(c.textContent=`Tipo de localização desconhecido: ${a}`,d.style.display="block"))}catch(e){c.textContent=`Erro ao carregar dados: ${e}`,d.style.display="block"}}async function I(){if(m.setAttribute("src",h[Math.floor(Math.random()*h.length)]),!function(){const e=document.getElementById("cep").value,t=document.getElementById("numero").value;return p.style.display="none",8!==e.length?(c.innerHTML="O campo CEP deve conter 8 números.",d.style.display="block",!1):!(t.length<1||t.length>9)||(c.innerHTML="O campo Número deve conter de 1 a 9 números.",d.style.display="block",!1)}())return;d.style.display="none",p.style.display="block";const e=document.getElementById("cep").value,a=document.getElementById("numero").value,o=`https://api.amxrest.net/viability/${e}/${a}`;try{const r=await fetch(o);if(r.ok){const o=await r.json();let n="",s="",i="",l="";try{const t=await fetch(`https://viacep.com.br/ws/${e}/json/`);if(t.ok){const e=await t.json();n=e.logradouro||o.data.logradouro,s=e.bairro||o.data.bairro,i=e.localidade||o.data.cidade,l=e.uf||o.data.uf}else n=o.data.logradouro,s=o.data.bairro,i=o.data.cidade,l=o.data.uf,a=o.data.number}catch(e){n=o.data.logradouro,s=o.data.bairro,i=o.data.cidade,l=o.data.uf,a=o.data.number}let p="<span> Localização aproximada <br> ";p+=`Ver no <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${n}, ${a}, ${i}, ${l}, Brasil`)}" target="_blank"> Google Maps <img src="./img/google_maps_icon.png" /></a> </span> <br>`,p+=`Consulta oficial disponível na <a href="https://planos.claro.com.br/monte-sua-combinacao?cep=${e}&number=${a}" target="_blank">CLARO</a>`,p+=`<p>Endereço: ${n}, ${a}, ${s}, ${i}, ${l}, Brasil</p>`;for(const e of o.data.technologies){let t=null;const a=[];if("GPONAVTAL"===o.data.cableNodeID?t="REDE NEUTRA VTAL":"GPONAATC"===o.data.cableNodeID?t="REDE NEUTRA ATC":(t="HFC (COAXIAL)",e.gpon&&(t="GPON (FIBRA)")),"Cable"===e.name&&(e.tv&&a.push("TV"),e.phone&&a.push("TELEFONE FIXO"),e.internet&&a.push("INTERNET")),"Satellite"===e.name&&(t="SATELLITE / MÓVEL",e.tv&&a.push("TV"),e.phone&&a.push("TELEFONE FIXO"),e.internet&&a.push("INTERNET")),a.length>0){p+=`<p> SERVIÇOS VIA ${t}:<br>`;for(const e of a)p+=`&#9679; ${e}<br>`;p+="</p>"}else p+='<span> Ocorreu algum erro, se possível reporte via <a href="https://github.com/dudu15051505/mapa-claro-beta/issues/" target="_blank">GITHUB</a> informando o CEP e Numero pesquisado para futura verificação.</span>'}try{const e=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${n} ${a}, ${i}, ${l}, Brasil`)}`);if(e.ok){const a=await e.json();if(a.length>0){const e=a[0],o=parseFloat(e.lat),r=parseFloat(e.lon),n=L.icon({iconUrl:"./img/marker-icon-blue.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[0,-41]});L.marker([o,r],{icon:n}).addTo(t).bindPopup(p).openPopup(),t.panTo(new L.LatLng(o,r)),t.setView([o,r],16)}else c.innerHTML=`<b>Endereço não encontrado na base de geolocalização <a href="${e.url}#map=5/-13.240/-50.383" target="_blank">OpenStreetMap <img src="./img/osm_icon.svg" style="height: 20px;width: 20px;" /></a></b> <br><br>Dados retornados pela API Claro: <br><br> ${p}`,d.style.display="block"}else c.innerHTML="Erro ao processar a solicitação de geocodificação.",d.style.display="block"}catch(e){c.innerHTML="Erro ao processar a solicitação de geocodificação.",d.style.display="block"}}else c.innerHTML="Erro ao consultar a API.",d.style.display="block"}catch(e){c.innerHTML="Erro ao processar a solicitação.",d.style.display="block"}p.style.display="none"}!function(){const e=new XMLHttpRequest;if(e.open("GET","./js/locations/locations-data-lista.json",!1),e.send(null),200===e.status){const t=JSON.parse(e.responseText),a=document.getElementById("lista-data-dados");if(t.forEach(((e,t)=>{const a=new Date(e.data),o=`${a.getDate()+1}/${a.getMonth()+1}/${a.getFullYear()}`,r=new Option(e.informacaoExtra?`${o} - ${e.informacaoExtra}`:`${o}`,e.valorCampo);document.getElementById("lista-data-dados").appendChild(r);const n=document.getElementById("dados-info"),s=document.createElement("span");if(s.setAttribute("id",`dados-info-${t}`),s.style.display="none",e.textoUrl){const t=document.createElement("a");t.setAttribute("href",e.url),t.setAttribute("target","_blank"),t.textContent=e.textoUrl,s.appendChild(t),n.appendChild(s)}})),verData)a.value=verData;else{a.options[a.options.length-1].selected=!0}if(document.getElementById(`dados-info-${a.selectedIndex}`)){document.getElementById(`dados-info-${a.selectedIndex}`).style.display="block"}}else c.textContent="Erro ao carregar lista de dados passados.",d.style.display="block"}(),Promise.all(u).then((e=>{v(a),v(o),v(r),v(n)})).catch((e=>{c.textContent=`Erro ao carregar dados: ${e}`,d.style.display="block"})),y.addTo(t),L.control.layers(b,f).addTo(t),document.getElementById("formulario").addEventListener("submit",(function(e){e.preventDefault(),I()}))}));