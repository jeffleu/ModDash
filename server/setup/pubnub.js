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

module.exports = pubnub; 
