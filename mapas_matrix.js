///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -3],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});



///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título

var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h3>Esperanza de vida de población de mayores';
	 return div;
	};
	title2.addTo(map);
//Logo Matrix	

var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="75%" ></img></a>';
	 return div;
	};
	title1.addTo(map);
//Logo demos

var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/DEMOS.png" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 

//Logo mayorsig

var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  

///////////Cartografía de referencia///////////

var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});

//Límites

var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.4,
	opacity: 0.3,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

var limitespj = L.geoJson(limitespj, {
	color: "#17202A", 
	weight: 1.2,
	opacity: 0.6,
	fillOpacity: 1,
	pane: 'límites',
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	});

//Capas Google

//Rasters overlay//

var rast_65T = L.imageOverlay('images/65T.png',
  imageBounds = [
    [27.097, -18.73],
    [44.75660, 4.99]
  ]);

var rast_65H = L.imageOverlay('images/65H.png',
  imageBounds = [
    [27.097, -18.83],
    [44.75660, 5.0]
  ]);

var rast_65M = L.imageOverlay('images/65M.png',
  imageBounds = [
    [27.097, -18.73],
    [44.75660, 4.99]
  ]);

var rast_80T = L.imageOverlay('images/80M.png',
  imageBounds = [
    [27.097, -18.83],
    [44.75660, 5.0]
  ]);

var rast_80H = L.imageOverlay('images/80H.png',
  imageBounds = [
    [27.097, -18.73],
    [44.75660, 4.99]
  ]);

var rast_80M = L.imageOverlay('images/80M.png',
  imageBounds = [
    [27.097, -18.83],
    [44.75660, 5.0]
  ]);

///////////Otras funcionalidades

//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					

//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);

//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////

// Curvas 65T

function style1(feature) {
	return {
		fillColor: '#000000',
		weight: 1.5,
		opacity: 1,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};

var geojson1 = L.geoJson(C65T, {
	style: style1,

onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.Contour.toString(),{permanent: true, opacity: 1, direction: 'center',});
    }
});	


// Curvas 65H

function style2(feature) {
	return {
		fillColor: '#000000',
		weight: 1.5,
		opacity: 1,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};

var geojson2 = L.geoJson(C65H, {
	style: style2,

onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.ELEV.toString(),{permanent: true, opacity: 1, direction: 'center',});
    }
});	

// Curvas 65M

function style3(feature) {
	return {
		fillColor: '#000000',
		weight: 1.5,
		opacity: 1,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};

var geojson3 = L.geoJson(C65M, {
	style: style3,

onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.ELEV.toString(),{permanent: true, opacity: 1, direction: 'center',});
    }
});	


 // Curvas 80T

function style4(feature) {
	return {
		fillColor: '#000000',
		weight: 1.5,
		opacity: 1,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};

var geojson4 = L.geoJson(C80T, {
	style: style4,

onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.ELEV.toString(),{permanent: true, opacity: 1, direction: 'center',});
    }
});	
   

// Curvas 80H

function style5(feature) {
	return {
		fillColor: '#000000',
		weight: 1.5,
		opacity: 1,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};

var geojson5 = L.geoJson(C80H, {
	style: style5,

onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.ELEV.toString(),{permanent: true, opacity: 1, direction: 'center',});
    }
});	


// Curvas 80M

function style6(feature) {
	return {
		fillColor: '#000000',
		weight: 1.5,
		opacity: 1,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};

var geojson6 = L.geoJson(C80M, {
	style: style6,

onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.ELEV.toString(),{permanent: true, opacity: 1, direction: 'center',});
    }
});	


/*
//estilo y popups de tasas

function getColor3(a) {
	
	return  a > 9.5? '#D91B35' :
	a > 9.0? '#EA663F' :
	a > 8.5? '#EE874C' :
	a > 8.0? '#F1A15A' :
	a > 7.5? '#F5BB67' : 
	a > 7.0? '#F8D271' : 
	a > 6.5? '#F5BB67' :
	a > 6.0? '#FAE278':
	a > 5.5? '#FBEB7A' :
	a > 5.0? '#FDF382' :
	a > 4.5? '#EAED86' :
	a > 4.0? '#D6E78B' :
	a > 3.5? '#C1DD90' :
	a > 3.0? '#ADD797' :
	a > 2.5? '#99CF9B' :
	'#C2523C';
};


function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.TASA_14_18),
		weight: 0.5,
		opacity: 0,
		color: 'none',
		dashArray: '0',
		fillOpacity: 0.8
	};

};

function popup3(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT) {
		layer.bindTooltip("<div id='custom'>"
             +"<strong>Tasa: </strong>"+  
			feature.properties.TASA_14_18.toString().replace(".", ",")+
			"‰<br><strong>Partido judicial: </strong>"+
			feature.properties.PJ+
			"<br><strong>Provincia: </strong>"+ 
            feature.properties.Name_prov+
			"<br><strong>Municipio: </strong>"+
			 feature.properties.NAMEUNIT,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson3 = L.geoJson(prueba, {
	style: style3,
	onEachFeature: popup3
});

//estilo mapa Cambio

function getColor4(a) {
	return a == 'Crecimiento muy alto' ? '#D7696A' :
	a == 'Crecimiento alto' ? '#FCC664' :
	a == 'Crecimiento moderado'? '#F8F266' :
	a == 'Decrecimiento'? '#B2D88F': 
	'#C2523C';
};
function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.cambio_text),
		weight: 0.5,
		opacity: 0.6,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup4(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT) {
		layer.bindTooltip("<div id='custom'>"
           +"<strong>Cambio: </strong>"+ 
			feature.properties.cambio_text+
			"<br><strong>Partido judicial: </strong>"+
			feature.properties.PJ+
			"<br><strong>Provincia: </strong>"+ 
            feature.properties.Name_prov+
			"<br><strong>Municipio: </strong>"+
			 feature.properties.NAMEUNIT,

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};



var geojson4 = L.geoJson(prueba, {
	style: style4,
	onEachFeature: popup4
});


//estilo y popups de situación

function getColor5(a) {
	return a == "Situación crítica" ? '#d76969' :
	a == 'Situación grave'? '#FCC664' :
	a == 'Situación en deterioro'? '#F8F266': 
	a == 'Situación en observación' ? '#B2D88F' :
   
	'green';

};
function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.Situacion),
		weight: 0.5,
		opacity: 0.60,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup5(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT) {
		layer.bindTooltip("<div id='custom'>"
           +"<strong>Situación: </strong>"+ 
			feature.properties.Situacion+
			"<br><strong>Partido judicial: </strong>"+
			feature.properties.PJ+
			"<br><strong>Provincia: </strong>"+ 
            feature.properties.Name_prov+
			"<br><strong>Municipio: </strong>"+
			 feature.properties.NAMEUNIT,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson5 = L.geoJson(prueba, {
	style: style5,
	onEachFeature: popup5
});

*/

var mapa1 = L.layerGroup([geojson1,rast_65T]).addTo(map);
var mapa2 = L.layerGroup([geojson2,rast_65H]);
var mapa3 = L.layerGroup([geojson3,rast_65M]);
var mapa4 = L.layerGroup([geojson4,rast_65H]);
var mapa5 = L.layerGroup([geojson5,rast_65M]);
var mapa6 = L.layerGroup([geojson6,rast_65H]);




var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Modelos espaciales de esperanza de vida',
	children: [
	
	  { label: "Edad de defunción media de personas mayores",layer: mapa1},
		{ label: "Edad de defunción media de hombres mayores",layer: mapa2},
	  { label: "Edad de defunción media de mujeres mayores",layer: mapa3},
		{ label: "Edad de defunción media de personas mayores de edad avanzada",layer: mapa4},
		{ label: "Edad de defunción media de hombres mayores de edad avanzada",layer: mapa5},
		{ label: "Edad de defunción media de mujeres mayores de edad avanzada",layer: mapa6}
		
		 ]
	},
	];
	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
	//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
	{ label: "OpenStreetMap", layer: osm},
		]
};	

//leyenda 65T

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Esperanza de vida de la población de mayores. Periodo 2007-2018'+"<\h2>",
			style: style1,
			layer: geojson1,
			elements: [{


				label:"<h3>"+  '<br>Edad de defunción media de la población de personas mayores <br>(≥ 65 años) provincial.<br>'+"<\h3>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Unidades : años'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<img src="images/leyenda.jpg",></img><br>',
		

				IMG:"<h3>"+  '<BR>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos provinciales del Instituto Nacional de Estadística (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);

	// leyenda 65H

	var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Esperanza de vida de la población de hombres mayores. Periodo 2007-2018'+"<\h2>",
			style: style2,
			layer: geojson2,
			elements: [{


				label:"<h3>"+  '<br>Edad de defunción media de la población de hombres mayores <br>(≥ 65 años) provincial.<br>'+"<\h3>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Unidades : años'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<img src="images/leyenda.jpg",></img><br>',
		

				IMG:"<h3>"+  '<BR>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos provinciales del Instituto Nacional de Estadística (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);

// leyenda 65M

		var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Esperanza de vida de la población de mujeres mayores. Periodo 2007-2018'+"<\h2>",
			style: style3,
			layer: geojson3,
			elements: [{


				label:"<h3>"+  'Edad de defunción media de la población de mujeres mayores <br>(≥ 65 años) provincial.<br>'+"<\h3>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Unidades : años'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<img src="images/leyenda.jpg",></img><br>',
		

				IMG:"<h3>"+  '<BR>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos provinciales del Instituto Nacional de Estadística (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);

// leyenda 80T

		var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Esperanza de vida de la población de personas de edad avanzada.<br> Periodo 2007-2018'+"<\h2>",
			style: style4,
			layer: geojson4,
			elements: [{


				label:"<h3>"+  'Edad de defunción media de la población de personas mayores <br>de edad avanzada (≥ 80 años) provincial.<br>'+"<\h3>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Unidades : años'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<img src="images/leyenda80.jpg",></img><br>',
		

				IMG:"<h3>"+  '<BR>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos provinciales del Instituto Nacional de Estadística (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);

	//80H

	var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Esperanza de vida de la población de hombres mayores de edad avanzada. Periodo 2007-2018'+"<\h2>",
			style: style5,
			layer: geojson5,
			elements: [{


				label:"<h3>"+  'Edad de defunción media de la población de hombres mayores <br>de edad avanzada (≥ 80 años) provincial.<br>'+"<\h3>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Unidades : años'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<img src="images/leyenda80.jpg",></img><br>',
		

				IMG:"<h3>"+  '<BR>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos provinciales del Instituto Nacional de Estadística (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend5);

	//80M


	var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Esperanza de vida de la población de mujeres mayores de edad avanzada. Periodo 2007-2018'+"<\h2>",
			style: style6,
			layer: geojson6,
			elements: [{


				label:"<h3>"+  'Edad de defunción media de la población de mujeres mayores de edad avanzada (≥ 80 años) provincial.<br>'+"<\h3>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Unidades : años'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:'<img src="images/leyenda80.jpg",></img><br>',
		

				IMG:"<h3>"+  '<BR>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos provinciales del Instituto Nacional de Estadística (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend6);



//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});

	//autor: Juan Carlos Hernández Alcalde, diseñador de aplicaciones webmapping para Fundación Matrix