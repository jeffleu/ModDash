// const origins = 'Hack Reactor, 944 Market St, San Francisco, CA 94102';
// const url = 'https://maps.googleapis.com/maps/api/directions/json';
// const requestPromise = require('request-promise');
//
// const getMapDetails = function(event) {
//
//   // let directionsService = new google.maps.DirectionsService();
//
//   let options  = {
//     url,
//     qs: {
//       key: process.env.GOOGLE_DIRECTIONS_API_KEY,
//       origin: '944 Market Street San Francisco, CA',
//       destination: '1734 Mckinnon Ave San Francisco, CA',
//       mode: 'driving',
//       unitSystem: 'imperial'
//     }
//   };
//
//   return requestPromise(options)
//   .then(body => {
//     body = JSON.parse(body);
//     console.log('gmap api body response', body);
//   })
//   .catch((err) => {
//     console.log('did not get gmap data', err);
//   })
// };
//
// module.exports = {
//   getMapDetails
// }
