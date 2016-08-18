// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//   console.log(token);
//   fetch('https://localhost:9000/api/extensionAuth', {
//     method: 'POST',
//     body: JSON.stringify({token: token}),
//     mode: 'cors-with-forced-preflight',
//     headers: {'Content-Type': 'application/json'}
//   })
//   .then(res => {
//     // console.log(res);
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//   });
// });