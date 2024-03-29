class mensagemErro extends Error {
	constructor(message) {
		super(message);
		this.name = "Erro";
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const telaErroConteudoElement = document.getElementById('telaerro-conteudo');
	const telaErroElement = document.getElementById('telaerro');
   const map = L.map('map').setView([-14.235004, -51.925280], 5);
   const locationsGponLayer = L.layerGroup();
	const locationsHfcLayer = L.layerGroup();
	const locationsSobreproLayer = L.layerGroup();
	const locationsGponNeutroLayer = L.layerGroup();
	const locationsHfcNeutroLayer = L.layerGroup();
	const locationsSemNadaLayer = L.layerGroup();
	const locationsErroApiLayer = L.layerGroup();
   const telaLoad = document.getElementById('load');
	const loadImg = document.getElementById('loadImg');
   const getJsonPath = (verData, filename) => verData ? `./js/locations/old/${verData}/${filename}` : `./js/locations/${filename}`;
	
	const urls = [
		`./img/loading0.gif`,
		`./img/loading1.gif`,
		`./img/loading2.gif`
	];
	
	const carregarMarcacoesMapa = [
		[true, 'GPON', () => addMarkersAndLayers(getJsonPath(verData, "locations-gpon.json"), "GPON", 'somatorio-gpon')],
		[true,'HFC', () => addMarkersAndLayers(getJsonPath(verData, "locations-hfc.json"), "HFC", 'somatorio-hfc')],
		[true,'Sobreposição', () => addMarkersAndLayers(getJsonPath(verData, "locations-sobrepo.json"), "Sobreposição", 'somatorio-sobre')],
		[true,'GPON Rede neutra', () => addMarkersAndLayers(getJsonPath(verData, "locations-neutrogpon.json"), "GPON Rede neutra", 'somatorio-neutragpon')],
		[false,'HFC Rede neutra', () => addMarkersAndLayers(getJsonPath(verData, "locations-neutrohfc.json"), "HFC Rede neutra", 'somatorio-neutrahfc')],
		[false,'ERRO Consulta API', () => addMarkersAndLayers(getJsonPath(verData, "locations-erroapi.json"), "ERRO Consulta API", 'somatorio-erroapi')],
		[false,'Sem serviço FIXO', () => addMarkersAndLayers(getJsonPath(verData, "locations-nada.json"), "Sem serviço FIXO", 'somatorio-nada')]
	];

	const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors',
		maxZoom: 18,
	});

	const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Imagery &copy; <a href="https://www.arcgis.com/" target="_blank">ArcGIS</a>',
		maxZoom: 18,
	});

	const stamenTerrainLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
		attribution: 'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0" target="_blank">CC BY SA</a>',
		maxZoom: 18,
	});

	const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
		maxZoom: 18
	});

	const cartoDBPositron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'
	});

	const cartoDBVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'
	});

	const cartoDBPositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'
	});

	const cartoDBVoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.carto.com/">CartoDB</a> contributors'
	});

	const cartoDBDarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.carto.com/" target="_blank">CartoDB</a> contributors'
	});

	const esriWorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
		maxZoom: 18
	});

	const esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
		maxZoom: 18
	});

	const baseLayers = {
		'OpenStreetMap': osmLayer,
		'Satélite': satelliteLayer,
		'Stamen Terrain': stamenTerrainLayer,
		"Esri World Imagery": esriWorldImagery,
		"CartoDB Positron": cartoDBPositron,
		"CartoDB Voyager": cartoDBVoyager,
		"CartoDB Positron (Sem rótulos)": cartoDBPositronNoLabels,
		"CartoDB Voyager (Sem rótulos)": cartoDBVoyagerNoLabels,
		"CartoDB Dark Matter (Sem rótulos)": cartoDBDarkMatterNoLabels,
		"Esri World Street Map": esriWorldStreetMap,
		"Esri World Topo Map": esriWorldTopoMap
	};

   const overlayMaps = {
		'GPON <img height="20" width="15" src="./img/marker-icon-green.png" alt="Marcador GPON"/>': locationsGponLayer,
		'HFC <img height="20" width="15" src="./img/marker-icon-red.png" alt="Marcador HFC"/>': locationsHfcLayer,
		'Sobreposição <img height="20" width="15" src="./img/marker-icon-yellow.png" alt="Marcador Sobreposição"/>': locationsSobreproLayer,
		'GPON Rede neutra <img height="20" width="15" src="./img/marker-icon-grey.png" alt="Marcador GPON Rede Neutra"/>': locationsGponNeutroLayer,
		'HFC Rede neutra <img height="20" width="15" src="./img/marker-icon-violet.png" alt="Marcador HFC Rede Neutra"/>': locationsHfcNeutroLayer,
		'Sem serviço FIXO <img height="20" width="15" src="./img/marker-icon-black.png" alt="Marcador Sem serviço FIXO"/>': locationsSemNadaLayer,
		'ERRO Consulta API <img height="20" width="15" src="./img/marker-icon-orange.png" alt="Marcador ERRO Consulta API"/>': locationsErroApiLayer
	};

   const locationLayers = {
      'GPON': locationsGponLayer,
      'HFC': locationsHfcLayer,
      'Sobreposição': locationsSobreproLayer,
      'GPON Rede neutra': locationsGponNeutroLayer,
      'HFC Rede neutra': locationsHfcNeutroLayer,
      'Sem serviço FIXO': locationsSemNadaLayer,
      'ERRO Consulta API': locationsErroApiLayer
   };4

	function deslocarMarcador(coordenada, maxOffset) {
		return parseFloat(coordenada) + (Math.random() * maxOffset - maxOffset / 2);
	}
	
	function ocultarTelaLoad(status = 'none') {
		telaLoad.style.display = status;
	}

	function ocultarTelaErro(status = 'none') {
		telaErroElement.style.display = status;
		ocultarTelaLoad();
	}
	
	function exibirErro(menssagem) {
		telaErroConteudoElement.innerHTML = menssagem;
		ocultarTelaErro('block');
	}

   function validarCampos() {
		const cep = document.getElementById('cep').value;
		const numero = document.getElementById('numero').value;

		ocultarTelaLoad();

		if (cep.length !== 8) {
			exibirErro('O campo CEP deve conter 8 números.');
			return false;
		}
		if (numero.length < 1 || numero.length > 9) {
			exibirErro('O campo Número deve conter de 1 a 9 números.');
			return false;
		}
		return true;
	}

	function Busca() {
		const buscaValor = document.getElementById('busca-valor').value;
		const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + buscaValor;

		fetch(url)
			.then(response => response.json())
			.then(data => {
				if (data.length > 0) {

					ocultarTelaErro();

					map.setView([parseFloat(data[0].lat), parseFloat(data[0].lon)], 10);
					L.marker([parseFloat(data[0].lat), parseFloat(data[0].lon)]).addTo(map);
				} else {
					console.error('Local não encontrado.');
					const urlPesquisaOpenStreetMap = `https://www.openstreetmap.org/search?query=${encodeURIComponent(buscaValor)}`;

					throw new mensagemErro(`Local não encontrado na base de geolocalização <a href="${urlPesquisaOpenStreetMap}#map=5/-13.240/-50.383" target="_blank">OpenStreetMap <img src="./img/osm_icon.svg" style="height: 20px;width: 20px;" /></a></b> <br><br>`);
				}
			})
			.catch(error => {
				exibirErro(error);
			});
	}

	async function loadDataList() {
		fetch('./js/locations/locations-data-lista.json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Erro ao carregar lista de dados passados.');
				}
				return response.json();
			})
			.then(data => {
				const listaDataDadosElement = document.getElementById('lista-data-dados');
	
				data.forEach((value, index) => {
					const tempDate = new Date(value.data);
					tempDate.setHours(tempDate.getHours() + 3);
					const formattedDate = `${tempDate.getDate()}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`;
					const option = new Option(
						value.informacaoExtra ? `${formattedDate} - ${value.informacaoExtra}` : `${formattedDate}`,
						value.valorCampo);
					document.getElementById('lista-data-dados').appendChild(option);
	
					const dadosInfoElement = document.getElementById('dados-info');
					const spanElement = document.createElement('span');
	
					spanElement.setAttribute('id', `dados-info-${index}`);
					spanElement.style.display = 'none';
	
					if (value.textoUrl) {
						const anchorElement = document.createElement('a');
						anchorElement.setAttribute('href', value.url);
						anchorElement.setAttribute('target', '_blank');
						anchorElement.textContent = value.textoUrl;
	
						spanElement.appendChild(anchorElement);
						dadosInfoElement.appendChild(spanElement);
					}
				});
	
				if (verData) {
					listaDataDadosElement.value = verData;
				} else {
					const lastOption = listaDataDadosElement.options[listaDataDadosElement.options.length - 1];
					lastOption.selected = true;
				}
	
				if (document.getElementById(`dados-info-${listaDataDadosElement.selectedIndex}`)) {
					const dadosInfoElement = document.getElementById(`dados-info-${listaDataDadosElement.selectedIndex}`);
					dadosInfoElement.style.display = 'block';
				}
	
			})
			.catch(error => {
				exibirErro(error);
			});
	}

	async function fetchJSON(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Erro ao carregar dados.');
			}
			return response.json();
		} catch (error) {
			exibirErro(error);
		}
	}

	async function addMarkersAndLayers(url, type, somatorioId) {
		try {
			const layerGroup = L.layerGroup();
			const conteudo = await fetchJSON(url);

			document.getElementById(somatorioId).innerHTML = `<span class="center">${conteudo.length}</span>`;			

			conteudo.forEach(function(dadosJson) {
				const customIcon = L.icon({
					iconUrl: `./img/marker-icon-${dadosJson.color}.png`,
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [0, -41]
				});

				const marker = L.marker([
					deslocarMarcador(dadosJson.latitude, 0.005), 
					deslocarMarcador(dadosJson.longitude, 0.005)
				], {
					icon: customIcon
				});

				marker.bindPopup(dadosJson.name);	

				marker.addTo(layerGroup);
			});

			if (conteudo.length > 0) {
               if (type in locationLayers) {
                    locationLayers[type].addLayer(layerGroup);
               } else {
						throw new mensagemErro(`Tipo de localização desconhecido: ${type}`);
               }
            }
		} catch (error) {
			exibirErro(error);
		}
	}

	async function consultarViabilidade() {
		loadImg.setAttribute('src', urls[Math.floor(Math.random() * urls.length)]);

		if (!validarCampos()) {
			return;
		}

      ocultarTelaErro();
		ocultarTelaLoad('block');

		const cep = document.getElementById('cep').value;
		const numero = document.getElementById('numero').value;
		const url = `https://api.amxrest.net/viability/${cep}/${numero}`;
		const urlOficialConsultaClaro = `https://planos.claro.com.br/monte-sua-combinacao?cep=${cep}&number=${numero}`;
		try {
			const response = await fetch(url);
			if (response.ok) {
				const dadosApiClaro = await response.json();

				let logradouro = '';
				let bairro = '';
				let cidade = '';
				let uf = '';

				try {
					const viacepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
					if (viacepResponse.ok) {
						const dadosViacep = await viacepResponse.json();
						logradouro = dadosViacep.logradouro || dadosApiClaro.data.logradouro;
						bairro = dadosViacep.bairro || dadosApiClaro.data.bairro;
						cidade = dadosViacep.localidade || dadosApiClaro.data.cidade;
						uf = dadosViacep.uf || dadosApiClaro.data.uf;
					} else {
						throw new mensagemErro('Erro ao carregar dados do viacep, fallback para dados fornecidos pela própria API claro.')
					}
				} catch (Error) {
					console.error(Error);
					logradouro = dadosApiClaro.data.logradouro;
					bairro = dadosApiClaro.data.bairro;
					cidade = dadosApiClaro.data.cidade;
					uf = dadosApiClaro.data.uf;
					numero = dadosApiClaro.data.number;
				}

				let resultado = `<span> Localização aproximada <br> `;
				resultado += `Ver no <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${logradouro}, ${numero}, ${cidade}, ${uf}, Brasil`)}" target="_blank"> Google Maps <img src="./img/google_maps_icon.png" /></a> </span> <br>`;
				resultado += `Consulta oficial disponível na <a href="${urlOficialConsultaClaro}" target="_blank">CLARO</a>`;
				resultado += `<p>CEP: ${cep} Número: ${numero}<br>`;
				resultado += `Endereço: ${logradouro}, ${numero}, ${bairro}, ${cidade}, ${uf}, Brasil </p>`;

				for (const technology of dadosApiClaro.data.technologies) {
					let tipoRede = null;
					const servicosDisponiveis = [];

					if (technology.name === 'Satellite') {
						tipoRede = 'SATELLITE / MÓVEL';
					} else if (dadosApiClaro.data.cableNodeID === 'GPONAVTAL') {
						tipoRede = 'REDE NEUTRA VTAL';
					} else if (dadosApiClaro.data.cableNodeID === 'GPONAATC') {
						tipoRede = 'REDE NEUTRA ATC';
					} else if (technology.gpon) {
						tipoRede = 'GPON (FIBRA)';
					} else if (!technology.gpon) {
						tipoRede = 'HFC (COAXIAL)';
					} else {
						const textoErro = `Erro ao definir tipo de tecnologia, se possível reporte via <a href="https://github.com/dudu15051505/mapa-claro-beta/issues/" target="_blank">GITHUB</a> informando o CEP e Numero pesquisado para futura verificação. <br>`;
						textoErro += resultado += `<span>${JSON.stringify(technology, null, "\t")}</span>`;
						throw new Error(textoErro);
					}

					if (technology.tv)
						servicosDisponiveis.push('TV');
					if (technology.phone)
						servicosDisponiveis.push('TELEFONE FIXO');
					if (technology.internet)
						servicosDisponiveis.push('INTERNET');
					
					if (servicosDisponiveis.length > 0) {
						resultado += `<p> SERVIÇOS VIA ${tipoRede}:<br>`;
						for (const servico of servicosDisponiveis) {
							resultado += `&#9679; ${servico}<br>`;
						}
						resultado += `</p>`;
					} else {
						if (technology.name === 'Cable' && servicosDisponiveis.length === 0) {							
							resultado += `<span> A tecnologia ${tipoRede} retornou na consulta, mas não a serviços ativos na API</span> <br>`;
							resultado += `<span>Realize uma consulta oficial diretamente no site da <a href="${urlOficialConsultaClaro}" target="_blank">CLARO</a> para confirmar os serviços disponíveis</span> <br>`;
						}
						else {
							resultado += `<span> Ocorreu algum erro, se possível reporte via <a href="https://github.com/dudu15051505/mapa-claro-beta/issues/" target="_blank">GITHUB</a> informando o CEP e Numero pesquisado para futura verificação.</span> <br>`;
							resultado += `<span>${JSON.stringify(technology, null, "\t")}</span>`;
						}
					}
				}

				try {
					const geocodingResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${logradouro} ${numero}, ${cidade}, ${uf}, Brasil`)}`);
					if (geocodingResponse.ok) {
						const data = await geocodingResponse.json();
						if (data.length > 0) {
							const firstResult = data[0];
							const latitude = parseFloat(firstResult.lat);
							const longitude = parseFloat(firstResult.lon);
							const customIcon = L.icon({
								iconUrl: './img/marker-icon-blue.png',
								iconSize: [25, 41],
								iconAnchor: [12, 41],
								popupAnchor: [0, -41]
							});
							const marker = L.marker([latitude, longitude], {
								icon: customIcon
							}).addTo(map);
							marker.bindPopup(resultado).openPopup();
							map.panTo(new L.LatLng(latitude, longitude));
							map.setView([latitude, longitude], 16);
						} else {
							console.error('Endereço não encontrado.');
							const urlPesquisaOpenStreetMap = `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${logradouro} ${numero}, ${cidade}, ${uf}, Brasil#map=5/-13.240/-50.383`)}`;
							
							throw new mensagemErro(`<b>Endereço não encontrado na base de geolocalização <a href="${urlPesquisaOpenStreetMap}" target="_blank">OpenStreetMap <img src="./img/osm_icon.svg" style="height: 20px;width: 20px;" /></a></b> <br><br>Dados retornados pela API Claro: <br><br> ${resultado}`);
						}
					} else {
						throw new mensagemErro('Erro ao processar a solicitação de geocodificação:', geocodingResponse.status, '-', geocodingResponse.statusText);
					}
				} catch (error) {
					exibirErro(error);
				}
			} else {
				exibirErro(`Erro ao consultar a API: ${response.status} - ${response.statusText}`);
			}
		} catch (error) {
			exibirErro(`Erro ao processar a solicitação: ${error}`);
		}

		ocultarTelaLoad();
	}

	async function addLayerToMap(layerName) {
		const layer = locationLayers[layerName];
		if (layer) {
			layer.addTo(map);
		} else {
			exibirErro(`Camada não encontrada: ${layerName}`);
		}
	}

	L.control.layers(baseLayers, overlayMaps).addTo(map);

	loadDataList();

	carregarMarcacoesMapa.forEach(async (valor, index) => {
		try {
			const layers = await Promise.race([valor[2]()]);
			if (valor[0]) {
				addLayerToMap(valor[1]);
		  }
		} catch (error) {
			exibirErro(`Erro ao carregar dados: ${error}`);
		}
	});

   osmLayer.addTo(map);
    
	document.getElementById('formulario').addEventListener('submit', function(event) {
		event.preventDefault();
		consultarViabilidade();
	});

	document.getElementById('busca').addEventListener('submit', function(event) {
		event.preventDefault();
		Busca();
	});
});