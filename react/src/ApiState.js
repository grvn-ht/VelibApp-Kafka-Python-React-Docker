import axios from 'axios';


function ApiState(json) {
    const option = {
      method: 'post',
      url: 'https://terjack.space/state',
      data: JSON.stringify(json),
      responseType: 'json',
    };
    axios(option)
    .then(function (response) {
      console.log(response.data);
      console.log('here we go station state!!!!');
    })
    .catch(function (error) {
      console.log(error);
    });
  
    return null
  
}

export default ApiState;
