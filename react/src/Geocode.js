import { useLeafletContext } from '@react-leaflet/core'
import { useEffect } from "react";
import { geosearch } from 'esri-leaflet-geocoder';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'

const position = [48.8566, 2.3522];

function Geocoder() {
    const context = useLeafletContext();
    useEffect(() => {

        const control = geosearch({position : 'topleft', useMapBounds : false, zoomToResult : false, expanded : true, placeholder : 'entre ta destination!', title : 'Destination'});
        
        const container = context.layerContainer || context.map;
        container.addControl(control);
        
        return () => {
            container.removeControl(control);
          }

    });

    return null
}

export default Geocoder;