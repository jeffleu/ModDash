const User = require('../db/queries').User;
const PubNub = require('pubnub');

var pubnub = new PubNub({
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    // uuid: "myUniqueUUID",
    ssl: true,
    // origin: "custom.pubnub.com",
    logVerbosity: false,
    presenceTimeout: 130,
    heartbeatInterval: 60
});

const publishEventAdded = (userId, message) => {
  message.messageType = 'eventAdded';
  User.getUser(userId)
  .then(user => {
    var channel = user.dataValues.pubnubid;
    pubnub.publish({
        message,
        channel,
        sendByPost: false, // true to send via post
        storeInHistory: false, // override default storage options
        meta: {} // publish extra meta with the request
      },
      (status, response) => {
        // handle status, response
        console.log('pubnub notification "eventAdded" was sent to client');
      }
    );
  })
  .catch(err => {
    console.warn('did not find user in pubnub publishEventAdded');
  });
};

const publishTimeToLeave = (channel, message) => {
  message.messageType = 'timeToLeave';
  pubnub.publish({
    message,
    channel,
    sendByPost: false, // true to send via post
    storeInHistory: false // override default storage options
    // meta: { "cool": "meta" } // publish extra meta with the request
    },
    (status, response) => {
      // Handle status and response
      console.log('Map notification was created.')
    }
  );
};

// example of publishing a message
// pubnub.publish(
//   {
//     message: { such: 'object' },
//     channel: 'ch1',
//     sendByPost: false, // true to send via post
//     storeInHistory: false, //override default storage options
//     meta: { "cool": "meta" } // publish extra meta with the request
//   },
//   function (status, response) {
//       // handle status, response
//   }
// ); 

module.exports = {
  publishEventAdded,
  publishTimeToLeave
};