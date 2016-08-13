var pubnub = PUBNUB({
  subscribe_key: 'sub-c-db638056-601a-11e6-9bf3-02ee2ddab7fe',

  error: function (error) {
    console.log('Error:', error);
  },
  message: function( message, env, channel ){
    console.log('pubnub message', message)
  },
  connect: function(){
    console.log("Connected")
  },
  disconnect: function(){
    console.log("Disconnected")
  },
  reconnect: function(){
    console.log("Reconnected")
  }
});


pubnub.subscribe ({
  channel: 'eventAdded',
  message: function(data){
    let start = moment(data.start.dateTime).format('LT');
    let end = moment(data.end.dateTime).format('LT');
    console.log('start', start);
    var notify = {
      type: 'basic',
      title: 'Your Calendar Event Has Been Added!',
      message: data.location + '\n' + start + ' - ' + end,
      iconUrl: 'sonic-dash.gif',
      buttons: [{
        title: 'Click To See Event Details'
      }]
    };
    chrome.notifications.onButtonClicked.addListener(function() {
      window.open(data.htmlLink);
    });

    chrome.notifications.create(notify, function() {
      console.log('successfully created notification!');
    });
  }
});

pubnub.subscribe ({
  channel: 'timeToLeave',
  message: function(data){
    var notify = {
      type: 'basic',
      title: `Time to Leave for ${data.destination}!`,
      message: `Looks like there might be traffic, and it will take ${Math.ceil(((data.initialEstimate / 60) / 1000))} minutes to get there`,
      iconUrl: 'sonic-sega.png',
      buttons: [{
        title: 'Click To See Map Details'
      }]
    };

    chrome.notifications.onButtonClicked.addListener(function() {
      window.open(data.htmlLink);
    });

    chrome.notifications.create(notify, function() {
      console.log('successfully created notification!');
    });
  }
});
