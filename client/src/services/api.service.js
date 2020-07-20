/*
  This is the API service. Here we will place methods that will 
  communicate with the API.
*/
const API_URL = 'http://192.168.1.51:5000/user/login';

const ApiService = {
  sendCredsToAPI: async function (creds) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(creds)
    });

    return response.json();
  }

};

export default ApiService;