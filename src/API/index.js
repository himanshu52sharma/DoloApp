// var ServerURL = 'https://rapidhealth.me/api';
var ServerURL = 'https://rapidhealth.thakurjitourstravels.com/api';
var axios = require('axios');

const getData = async url => {
  try {
    const response = await fetch(`${ServerURL}/${url}`);
    const result = response.json();
    // console.log("error",response)

    return result;

  } catch (e) {
    return null;
  }
};

const getData2 = async url => {
  try {
  //  const result = axios.get(`${baseUrl}/${url}`).then((response) => {
  //   console.log(response.data);
    
  // });
  const response = await axios.get(`${baseUrl}/${url}`);

  const result = response.data;
    return result;

  } catch (e) {
    return null;
  }
};

const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log("error",response)
    console.log(response)

    return result;


   
  } catch (e) {
    // console.log(">>>>>>",e)
    return e;
  }
};

const postData2 = async (url, body) => {
    var config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(body),
    }
  try {
    const response = await axios.post(`${ServerURL}/${url}`,config,body);
    const result = await response.json();
    console.log("error",response)
    console.log(response)

    return result;


   
  } catch (e) {
    // console.log(">>>>>>",e)
    return e;
  }
};

// const postDataAndImage = async (url, formData) => {
//   var config = {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   };
//   try {
//     const response = await axios.post(`${ServerURL}/${url}`, formData, config);
//     const result = await response.data;
//     return result;
//   } catch (e) {
//     console.log('error', e);
//     return null;
//   }
// };



const postFormData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;'},
      body: body,
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.log(">>>>>>",e)
    return null;
  }
};



const postDataAndImage = async (url, formData) => {
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await axios.post(`${ServerURL}/${url}`, formData, config);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

//api call
const apiCall = async (route, method, data) => {
  // eslint-disable-next-line no-undef
  const url = `${ServerURL}/${route}`;
  let options = {
    method,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify(data),
  };
  return await fetch(url, options);
};

export {ServerURL, getData, postDataAndImage, postData, apiCall, postFormData,getData2,postData2};
