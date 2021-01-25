import React from 'react';
import L from 'leaflet';
import {donutIcon} from "./Icon";
import ApiState from "./ApiState"
import TableComponent from './Table';
import ReactDOMServer from 'react-dom/server';
import './App.css'

require('leaflet.markercluster');

function createButton(label, container) {
  const btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

function createButtonLink(label, container, code, type) {
  const url = "location.href='https://terjack.space/qrcode"+type+"/"+'?'+code.toString()+'\'';
  const btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.setAttribute('onclick', url);
  btn.innerHTML = label;
  return btn;
}


function createText(label, container) {
  const btn = L.DomUtil.create('text', '', container);
  btn.innerHTML = label;
  return btn;
}

export function pop(name, mecaa, elecc, libre, mcg, location, capa, avaa, broke_e, broke_m){
  let ava = avaa - (broke_m + broke_e)
  let resl = 2 * 22 / 7 * 5
  let pss = ava/capa * resl
  let meca = mecaa - broke_m
  let elec = elecc - broke_e


  /*   const popHome = L.DomUtil.create('div', ''),
    popHomePrez = createText('<div><h2>'+name+'</h2><p>vélib mecanique(s) disponnible(s):'+meca+'</p><p>vélib électrique(s) disponnible(s):'+elec+'</p></div>', popHome);
 */
  const popHome = L.DomUtil.create('div', 'butclass'),
  popHomePrez = createText(ReactDOMServer.renderToString(<TableComponent name={name} meca={meca} elec={elec} ava={ava} libre={libre} broke_e={broke_e} broke_m={broke_m}/>), popHome);

/*   popHomeProb = createButton('Signaler un problème', popHome);
 */
  const customOptions =
      {
      'maxWidth': '500',
      'className' : 'custom-popup',
      };

/* https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705
 */
  const marker = new L.marker(location, {icon: donutIcon(ava, pss, resl)})
        .addTo(mcg)
        .bindPopup(popHome,customOptions).openPopup();
}


export function popEvent(container, name, mecaa, elecc, libre, location, code, active, avaa, capa, broke_e, broke_m){
  let ava = avaa - (broke_m + broke_e)
  let resl = 2 * 22 / 7 * 5
  let pss = ava/capa * resl
  let meca = mecaa - broke_m
  let elec = elecc - broke_e

  const popHome = L.DomUtil.create('div', 'butclass'),
    popHomePrez = createText(ReactDOMServer.renderToString(<TableComponent name={name} meca={meca} elec={elec} ava={ava} libre={libre} broke_e={broke_e} broke_m={broke_m}/>), popHome),
    popHomeProb = createButton('Signaler la station', popHome),
    popHomeProbVel = createButton('Signaler un vélib', popHome);

  const problemSA = L.DomUtil.create('div', ''),
    problemSAText = createText('station active', problemSA),
    problemSAOui = createButton('Oui', problemSA),
    problemSANon = createButton('Non', problemSA);

  const problemVel = L.DomUtil.create('div', ''),
    problemVelText = createText('le vélib est', problemVel),
    problemVelMec = createButtonLink('Mécanique', problemVel, code,'M'),
    problemVelEle = createButtonLink('Électrique', problemVel, code,'E');

  const popHomeStationNonActive = L.DomUtil.create('div', ''),
    popHomeStationNonActivePrez = createText('<div><h2>'+name+'</h2><p>NON ACTIVE!!!</p></div>', popHomeStationNonActive),
    popHomeStationNonActiveChang = createButton('Signaler un changement', popHomeStationNonActive);

  const PopQrCode = L.DomUtil.create('div', ''),
    PopQrCodePrez = createText(ReactDOMServer.renderToString(<html/>), PopQrCode);

  const mcgg = new L.markerClusterGroup();

  const customOptions =
      {
      'maxWidth': '1000',
      'className' : 'custom-popup',
      };
  const marker = new L.marker(location, {icon: donutIcon(ava, pss, resl)});
  if(active==='OUI'){
    marker.addTo(mcgg);
    marker.bindPopup(popHome,customOptions).openPopup();
  }else{
    console.log('change in state!!!!');
    marker.addTo(mcgg);
    marker.bindPopup(popHomeStationNonActive,customOptions).openPopup();
  }
    

  container.addLayer(mcgg);

  const buttonChang = L.DomUtil.get(popHomeStationNonActiveChang);
  L.DomEvent.addListener(buttonChang, 'click', function (e) {
    marker.closePopup();
    marker.bindPopup(problemSA,customOptions).openPopup();
  });

  const buttonSubmit = L.DomUtil.get(popHomeProb);
  L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
    marker.closePopup();
    marker.bindPopup(problemSA,customOptions).openPopup();
  });

  const buttonSubmitNon = L.DomUtil.get(problemSANon);
  L.DomEvent.addListener(buttonSubmitNon, 'click', function (e) {
    marker.closePopup();
    console.log('station active:NON');
    ApiState({'velib':'', 'station active':'NON','code':code,'vKey':''});
    marker.bindPopup(popHomeStationNonActive,customOptions).openPopup();
  });

  const buttonSubmitOui = L.DomUtil.get(problemSAOui);
  L.DomEvent.addListener(buttonSubmitOui, 'click', function (e) {
    marker.closePopup();
    console.log('station active:OUI');
    ApiState({'velib':'', 'station active':'OUI','code':code,'vKey':''});
    marker.bindPopup(popHome,customOptions).openPopup();
  });

  const buttonVelib = L.DomUtil.get(popHomeProbVel);
  L.DomEvent.addListener(buttonVelib, 'click', function (e) {
    marker.closePopup();
    marker.bindPopup(problemVel,customOptions).openPopup();
  });

  const buttonVelibMec = L.DomUtil.get(problemVelMec);
  L.DomEvent.addListener(buttonVelibMec, 'click', function (e) {
    marker.closePopup();

/*     $('#mymodal').modal('show');
    ApiState({'velib':'M','station active':'','code':code});
    marker.bindPopup(PopQrCode,customOptions).openPopup();
 */
  });

  const buttonVelibEle = L.DomUtil.get(problemVelEle);
  L.DomEvent.addListener(buttonVelibEle, 'click', function (e) {
    marker.closePopup();

/*     ApiState({'velib':'E','station active':'','code':code});
    marker.bindPopup('<div id="qr-reader" style="width:500px"></div> <div id="qr-reader-results"></div>',customOptions).openPopup();
 */
  });

return () => {
  container.removeLayer(mcgg);
}

}

{/* <script > var resultContainer = document.getElementById("qr-reader-results"); var lastResult, countResults = 0; function onScanSuccess(qrCodeMessage) {if (qrCodeMessage !== lastResult) {++countResults;lastResult = qrCodeMessage;resultContainer.innerHTML += `<div>[${countResults}] - ${qrCodeMessage}</div>`;}}var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });html5QrcodeScanner.render(onScanSuccess);</script>
 */}

/* export function popEvent(container, name, meca, elec, libre, location, code, active){
  
  const popHome = L.DomUtil.create('div', ''),
    popHomePrez = createText('<div><h2>'+name+'</h2><p>vélib mecanique(s) disponnible(s):'+meca+'</p><p>vélib électrique(s) disponnible(s):'+elec+'</p></div>', popHome),
    popHomeProb = createButton('Signaler un problème', popHome);

  const problemSA = L.DomUtil.create('div', ''),
    problemSAText = createText('station active', problemSA),
    problemSAOui = createButton('Oui', problemSA),
    problemSANon = createButton('Non', problemSA);

  const popHomeStationNonActive = L.DomUtil.create('div', ''),
    popHomeStationNonActivePrez = createText('<div><h2>'+name+'</h2><p>NON ACTIVE!!!</p></div>', popHomeStationNonActive),
    popHomeStationNonActiveChang = createButton('Signaler un changement', popHomeStationNonActive);

  const mcgg = new L.markerClusterGroup();

  const customOptions =
      {
      'maxWidth': '1000',
      'className' : 'custom-popup',
      };
  const marker = new L.marker(location, {icon: greenIcon});
  if(active==='OUI'){
    marker.addTo(mcgg);
    marker.bindPopup(popHome,customOptions).openPopup();
  }else{
    console.log('change in state!!!!');
    marker.addTo(mcgg);
    marker.bindPopup(popHomeStationNonActive,customOptions).openPopup();
  }


  const buttonChang = L.DomUtil.get(popHomeStationNonActiveChang);
  L.DomEvent.addListener(buttonChang, 'click', function (e) {
    marker.closePopup();
    marker.bindPopup(problemSA,customOptions).openPopup();

    const buttonSubmitNon = L.DomUtil.get(problemSANon);
    L.DomEvent.addListener(buttonSubmitNon, 'click', function (e) {
      marker.closePopup();
      ApiState({'station active':'NON','code':code});
      marker.bindPopup(popHomeStationNonActive,customOptions).openPopup();
    });

    const buttonSubmitOui = L.DomUtil.get(problemSAOui);
    L.DomEvent.addListener(buttonSubmitOui, 'click', function (e) {
      marker.closePopup();
      ApiState({'station active':'OUI','code':code});
      marker.bindPopup(popHome,customOptions).openPopup();

    });
  });

  container.addLayer(mcgg);

  const buttonSubmit = L.DomUtil.get(popHomeProb);
  L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
    marker.closePopup();
    marker.bindPopup(problemSA,customOptions).openPopup();

    const buttonSubmitNon = L.DomUtil.get(problemSANon);
    L.DomEvent.addListener(buttonSubmitNon, 'click', function (e) {
      marker.closePopup();
      ApiState({'station active':'NON','code':code});
      marker.bindPopup(popHomeStationNonActive,customOptions).openPopup();
    });

    const buttonSubmitOui = L.DomUtil.get(problemSAOui);
    L.DomEvent.addListener(buttonSubmitOui, 'click', function (e) {
      marker.closePopup();
      ApiState({'station active':'OUI','code':code});
      marker.bindPopup(popHome,customOptions).openPopup();

    });

  });
  
  return null

}
 */



/*   const problemCE = L.DomUtil.create('div', ''),
    problemCEText = createText('vélo', problemCE),
    problemCECasse = createButton('Cassé', problemCE),
    problemCEEndommage = createButton('Endommagé', problemCE);
 */

/*   const endommage = L.DomUtil.create('div', ''),
    endommageText = createText('<div><h2>'+name+'</h2><p>vélib mecanique(s) disponnible(s):'+meca+'</p><p>vélib électrique(s) disponnible(s):'+elec+'</p></div>', endommage),
    endommage = createButton('Signaler un problème', endommage);

  const casse = L.DomUtil.create('div', ''),
    Btn1 = createText('<div><h2>'+name+'</h2><p>vélib mecanique(s) disponnible(s):'+meca+'</p><p>vélib électrique(s) disponnible(s):'+elec+'</p></div>', casse),
    Btn2 = createButton('Signaler un problème', casse);
 */ 


/*       const buttonSubmitCasse = L.DomUtil.get(problemCECasse);
      L.DomEvent.addListener(buttonSubmitCasse, 'click', function (e) {
        marker.closePopup();
        marker.bindPopup(popHome,customOptions).openPopup();
      });
  
      const buttonSubmitEndommage = L.DomUtil.get(problemCEEndommage);
      L.DomEvent.addListener(buttonSubmitEndommage, 'click', function (e) {
        marker.closePopup();
        marker.bindPopup(popHome,customOptions).openPopup();
      });
 */  




/*   return () => {
    container.removeLayer(mcgg);
  }
 */



/* function createInput(label, container) {
  const btn = L.DomUtil.create('input', '', container);
  btn.setAttribute('type', 'number');
  btn.innerHTML = label;
  return btn;
}
 */





/* export const template_home = '<form id="popup-form-home">\
  <table class="popup-table-home">\
    <tr class="popup-table-home-row">\
      <td colspan="4" id="name" class="popup-table-home-title" style="text-align:center;"> </td>\
    </tr>\
    <tr class="popup-table-home-row">\
      <th colspan="2"> </th>\
      <th class="popup-table-home-header1" style="text-align:center;">En état</th>\
      <th class="popup-table-home-header2" style="text-align:center;">Cassé</th>\
    </tr>\
    <tr class="popup-table-home-row">\
      <th rowspan="2" class="popup-table-home-subject" style="text-align:center;">Nombre de vélos disponibles</th>\
      <th class="popup-table-home-sub-subject" style="text-align:center;">électrique</th>\
      <td id="nb-elec-ee" class="popup-table-data"></td>\
      <td id="nb-elec-c" class="popup-table-data"></td>\
    </tr>\
    <tr class="popup-table-home-row">\
      <th class="popup-table-home-sub-subject" style="text-align:center;">mécanique</th>\
      <td id="nb-meca-ee" class="popup-table-data"></td>\
      <td id="nb-meca-c" class="popup-table-data"></td>\
    </tr>\
    <tr class="popup-table-home-row">\
      <th colspan="2" class="popup-table-home-subject" style="text-align:center;">Places Restantes:</th>\
      <td colspan="2" id="nb-places-dispo" class="popup-table-data"></td>\
    </tr>\
  </table>\
  <br>\
  <center><button id="button-submit" type="button">Signaler un Problème</button></center>\
</form>';

export const template_signalement_pb = '';
export const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export const template_endommage = '';

export const template_casse = '';export const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

 */

/* export const template_home = '<form id="popup-form">\
  <label for="input-speed">New speed:</label>\
  <input id="input-speed" class="popup-input" type="number" />\
  <table class="popup-table">\
    <tr class="popup-table-row">\
      <th class="popup-table-header">Arc numer:</th>\
      <td id="value-arc" class="popup-table-data"></td>\
    </tr>\
    <tr class="popup-table-row">\
      <th class="popup-table-header">Current speed:</th>\
      <td id="value-speed" class="popup-table-data"></td>\
    </tr>\
  </table>\
  <button id="button-submit" type="button">Save Changes</button>\
</form>';
 */
/* function layerClickHandler (e) {

  var marker = e.target,
      properties = e.target.feature.properties;
  
  if (marker.hasOwnProperty('_popup')) {
    marker.unbindPopup();
  }

  marker.bindPopup(template);
  marker.openPopup();

  L.DomUtil.get('value-arc').textContent = properties.arc;
  L.DomUtil.get('value-speed').textContent = properties.speed;

  var inputSpeed = L.DomUtil.get('input-speed');
  inputSpeed.value = properties.speed;
  L.DomEvent.addListener(inputSpeed, 'change', function (e) {
    properties.speed = e.target.value;
  });

  var buttonSubmit = L.DomUtil.get('button-submit');
  L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
    marker.closePopup();
  });

}

var map = L.map('leaflet', {
  'center': [0, 0],
  'zoom': 0,
  'layers': [
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }),
    L.geoJson({
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [0,0]
        },
        "properties": {
          "arc": 321,
          "speed": 123
        }
      }]
    }, {
      onEachFeature: function (feature, layer) {
        layer.on('click', layerClickHandler);
      }
    })
  ]
});
 */