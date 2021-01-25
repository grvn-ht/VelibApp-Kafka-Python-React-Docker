import { useLeafletContext } from '@react-leaflet/core';
import { useEffect } from "react";
import L from 'leaflet';

import 'leaflet-gps'

function Gps() {
    const context = useLeafletContext();
    useEffect(() => {
        const gps = new L.Control.Gps({autoActive: true, autoCenter: true, maxZoom: 17, autoUpdate: 1, position: 'bottomleft'} );
        const container = context.layerContainer || context.map;

/*         gps
        .on('gps:located', function(e) {
            console.log('e.latlng.lat')
        })
        .on('gps:disabled', function(e) {
            e.marker.closePopup()
        });
 */
        container.addControl(gps);
        
        return () => {
            container.removeControl(gps);
          }

    });

    return null
}

export default Gps;