import { useLeafletContext } from '@react-leaflet/core'
import { useEffect } from "react";
import L from 'leaflet';
require('leaflet.locatecontrol')

function LocationMarker() {
    const context = useLeafletContext();

    useEffect(() => {
      const control = L.control.locate({
          position: 'topleft',
          strings: {
              title: "Show me where I am!"
          }
      });
      const container = context.layerContainer || context.map;
      container.addControl(control);


      return () => {
        container.removeControl(control);        
      }

    });

    return null
  }

  export default LocationMarker;