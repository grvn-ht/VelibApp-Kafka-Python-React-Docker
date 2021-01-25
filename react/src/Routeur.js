import { useLeafletContext } from '@react-leaflet/core'
import { useEffect, useRef } from "react";
import L from 'leaflet';
import {blackIcon, redIcon} from "./Icon";

import { geosearch } from 'esri-leaflet-geocoder';

import Api from './Api';

import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'

require('leaflet-routing-machine');

require('leaflet-control-geocoder');



function Rout() {

    const context = useLeafletContext();
    const refcount = useRef(0);

    useEffect(() => {

        const control = L.Routing.control({
            show: false,

            geocoder: L.Control.Geocoder.nominatim(),
            
            router: new L.Routing.osrmv1({
                serviceUrl: "https://terjack.space/route/v1",
                profile: 'cycling',
            }),
            routeWhileDragging: true,
            reverseWaypoints: true,
            createMarker: function(i, wp, nWps) {
                if (i === 0 ) {
                  // here change the starting icons
                  return L.marker(wp.latLng, {
                    icon: redIcon // here pass the custom marker icon instance
                  }).bindPopup("start").openPopup();
                } else if ( i === 3) { // remplacer nwps - 1 par 3 pour seulement montrer la destination
                  // here change the ending icons
                  return L.marker(wp.latLng, {
                    icon: redIcon // here pass the custom marker icon instance
                  }).bindPopup("end").openPopup();
                } else {
                    // here change all the others
                    return L.marker(wp.latLng, {
                      icon: blackIcon
                    });
                  }
            }
            })

        const container = context.layerContainer || context.map;
        container.addControl(control);
        const err = L.Routing.errorControl(control);
        container.addControl(err);
        const search = geosearch({position : 'topleft', useMapBounds : false, zoomToResult : false, expanded : true, placeholder : 'entre ta destination!', title : 'Destination'});
        container.addControl(search);

        search.on('results', function(e) {
          console.log(e);

/*           refcount.current +=1;
 */          
          Api(container, control,e.latlng, 2);
        });

/*         container.on('layeradd', function(e) {
          console.log(e);
          if(e.layer._leaflet_id === 105){
            if(e.layer._latlng.lat !== 0){
              console.log(e.layer._latlng);
              control.spliceWaypoints(0, 1, e.layer._latlng);
              Api(container, control,e.layer._latlng, 1);
            }
          }
        });
 */
        container.on('locationfound', function(e) {
          console.log(e.latlng);

/*           if(refcount.current === 1){
 */
          if(refcount.current === 0){

            console.log(refcount);
            control.spliceWaypoints(0, 1, e.latlng);
            Api(container, control,e.latlng, 1);
            refcount.current +=1;

/*             refcount.current = 0;
 */            
          }
        });
    
        container.on('locationerror', function(e) {
          alert(e.message);
        });
        
        return () => {
            container.removeControl(control);
            container.removeControl(err);
            container.removeControl(search);
          }
      
    }, []);

    return null

}

export default Rout;


/* function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}
 */

/*         const nb = control.getWaypoints().length
        console.log(nb)
 */

/*         container.on('click', function(e) {

            const ccc = L.DomUtil.create('div'),
                startBtn = createButton('Start from this location', ccc),
                destBtn = createButton('Go to this location', ccc);
        
            L.popup()
                .setContent(ccc)
                .setLatLng(e.latlng)
                .openOn(container);

            L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                Api(container, control,e.latlng, 1);
                container.closePopup();
            });
            L.DomEvent.on(destBtn, 'click', function() {

                Api(container, control,e.latlng, 2);
                container.closePopup();
            });

        });
 */

/*         const lc = new Locate();
 */

/*         const gps = new L.Control.Gps({autoActive: true, autoCenter: true, maxZoom: 17, autoUpdate: 1, position: 'topleft'} );
        gps
        .on('gps:located', function(e) {
            console.log(e.latlng)
            console.log(count)
        })
        .on('gps:disabled', function(e) {
            e.marker.closePopup()
        });
        container.addControl(gps);
 */
/*         if(count){
          control.spliceWaypoints(0, 1, container.getCenter());
          Api(container, control,container.getCenter(), 1);  
        }
 */
/*         container.addControl(lc);
 */
/*         lc.start();
 */        
/*         container.locate();
 */
/*         container.on('layeradd', function(e) {
          console.log(e)
          if(e.layer._leaflet_id === 105){
            setcount(true)
            console.log(count)
          }
        });
 */
/*         container.on('layeradd', function(e) {
          if(e.layer._leaflet_id === 105){
            console.log(e.layer._latlng.lat)
            const ll = e.layer._latlng
            console.log(e)
            console.log(ll)

            console.log(container.getCenter())
            control.spliceWaypoints(0, 1, e.layer._latlng)
            Api(container, control,e.layer._latlng, 1);
          }
        });
 */
