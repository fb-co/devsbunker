// we can re-use this module even for the signup, that's why there's line 16
export default function fetchAPI(creds) {
  const API_URL = 'http://192.168.1.51:5000/user/login';
  const err_div = document.getElementById('error');

  fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(creds)
    })
    .then(response => response.json())
    .then(result => {
      if (/Unable/.test(result.message)) {
        if (/taken/.test(result.message)) {
          err_div.innerHTML = "Unable to signup. Credentials are already taken.";
        } else {
          err_div.innerHTML = "Unable to login. Check your credentials.";
        }
      } else {
        localStorage.setItem('token', result.token);
        // [!] redirect to profile [!]
        alert('Successfully logged in!');
      }

    })
    .catch(e => {
      console.log(e);
    });
}