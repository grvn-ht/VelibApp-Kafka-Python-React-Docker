import React from "react";
import "./App.css";
import useSwr from "swr";
import MarkerCluster from './MarClus'

/* import LocationMarker from './Loca'
 */
import {MapContainer, LayersControl, TileLayer} from 'react-leaflet'
import Rout from './Routeur'
import Gps from './Gps'

import logo from "./velo-lulu/ezgif.com-crop.gif";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const position = [48.8566, 2.3522];

function App() {

    const url =
    "https://terjack.space/popup";

    const { data: result, error } = useSwr(url, { fetcher });
    if (error) return <h1>Something went wrong!</h1>
    if (!result) return <div><h1>Loading... </h1><h1><img src={logo} width="400" height="400"  id="masuperimage"/></h1></div>
    
    const stations = result ;


    return(

        <MapContainer center={position} zoom={12} zoomControl={false}>
          
        <Rout />

        <LayersControl position="bottomleft">

          <LayersControl.BaseLayer name="Normal">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Gris">
                <TileLayer 
                  url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                  attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Montrer toutes les stations">

            <MarkerCluster pro={stations} />

          </LayersControl.Overlay>

        </LayersControl>

        <Gps />

        </MapContainer>
      
    )
}

export default App;