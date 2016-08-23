const Event = require('../../db/queries').Event;
const addTravel = require('../map/addTravel');
const queryTraffic = require('../../workers/queryTraffic');
const googleCal = require('./googleCal');


const getAllEvents = (userId) => {
  googleCal.getEventsFromGoogleCal(userId) 
  .then(events => {
    events.items.forEach(event => {
      addToEventDB(userId, event);
    });    
  });
};

const addToEventDB = (userId, event) => {
  Event.insertEvent(userId, event)
  .spread((event, created) => {
    if (created) {
      console.log('Event successfully added.\n', event.dataValues);
    }
  })
  .catch(err => {
    console.warn('error in adding events to DB', err);
  });
};

// const addToTravelAndTraffic = (userId) => {
//   Event.getAllUserEvents(userId)
//   .then(events => {
//     events.forEach(event => {
//       return addTravel(event)
//       .then(travel => {
//         return queryTraffic(travel);
//       });
//     });
//   })
//   .catch(err => {
//     console.warn('error in adding inital user events to travel & traffic', err);
//   });
// };
    // TO DO: FIX THIS
        // addTravel breaks because user does not have geolocation yet
        // options are to schedule addTravel later when we get the geolocation, or somehow get the user to send geolocation at the same time
        // could maybe tack on addTravel for all the user's events when we get their geolocation for the first time
          // if user.prevDataValues.geolocation === null, then it's the first time

  //     return addTravel(event);      
  //   } else {
  //     return null;
  //   }
  // })
  // .then(travel => {
  //   if (!travel) {
  //     console.log('Travel successfully added. Now scheduling queryTraffic worker.');
  //     return queryTraffic(travel);      
  //   }
  // })

module.exports = getAllEvents;