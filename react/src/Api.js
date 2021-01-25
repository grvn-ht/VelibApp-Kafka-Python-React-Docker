import axios from 'axios';
import {popEvent} from "./Popup";

function Api(container, control, ll, i) {
  const option = {
    method: 'post',
    url: 'https://terjack.space/coor',
    data: JSON.stringify(ll),
    responseType: 'json',
  };
  axios(option)
  .then(function (response) {
    console.log(response.data);
    console.log('here we go!!!!');

    Object.entries(response.data).map(([key, station]) => {
    const name = station.name
    const meca = station.mechanical.toString()
    const elec = station.ebike.toString()
    const code = station.stationcode
    const libre = station.numdocksavailable.toString()
    const location = station.coordonnees_geo
    console.log(location);
    const active = station.is_returning
    const capa = station.capacity
    const ava = station.numbikesavailable
    const broke_e = station.broke_ebike.length
    console.log(broke_e);
    const broke_m = station.broke_mechanical.length

    if(key === '0'){
      control.spliceWaypoints(i, 1, location);
      popEvent(container, name, meca, elec, libre, location, code, active, ava, capa, broke_e, broke_m);
    }else{
      popEvent(container, name, meca, elec, libre, location, code, active, ava, capa, broke_e, broke_m);
    }
    });
    if(i === 2) {
      control.spliceWaypoints(3 , 1, ll);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  return () => {
    container.removeControl(control);
  }

}


export default Api;