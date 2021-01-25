import { useEffect } from "react";
import L from 'leaflet';
import { useLeafletContext } from '@react-leaflet/core';
import {pop} from "./Popup";
import "./style.css";

require('react-leaflet-markercluster/dist/styles.min.css');
require('leaflet.markercluster');


function MarkerCluster(props) {
  const context = useLeafletContext();

  const stations=props.pro;

  console.log(stations)

  useEffect(() => {

    const mcg = new L.markerClusterGroup();

    Object.entries(stations).map(([key, station]) => {


    const name = station.fields.name
    const meca = station.fields.mechanical.toString()
    const elec = station.fields.ebike.toString()
    const libre = station.fields.numdocksavailable.toString()
    const location = station.fields.coordonnees_geo
    const capa = station.fields.capacity
    const ava = station.fields.numbikesavailable
    const broke_e = station.fields.broke_ebike.length
    const broke_m = station.fields.broke_mechanical.length

    pop(name, meca, elec, libre, mcg, location, capa, ava, broke_e, broke_m)

    });
    
    const container = context.layerContainer || context.map
    container.addLayer(mcg);

    return () => {
      container.removeLayer(mcg);
    }

  }, [stations]);

  return null
  
}

export default MarkerCluster;