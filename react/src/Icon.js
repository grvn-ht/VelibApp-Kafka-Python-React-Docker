import React from 'react';
import L from 'leaflet';
import SVGIconComponent from './Donut';
import ReactDOMServer from 'react-dom/server';

export const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export const blackIcon = new L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#000000;' class='marker-pin'></div>",
    iconSize: [10, 10],
    iconAnchor: [-6, -15]
  });


export function donutIcon(key, keyy, keyyy){
  return(
    new L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(<SVGIconComponent perc={key} percc={keyy} perccc={keyyy}/>),
      iconAnchor: [18, 28],
      popupAnchor: [0, -30]
    })
  )
}
