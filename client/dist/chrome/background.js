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

const subscribe = () => {
  var channel = localStorage.getItem('channel');
  console.log('running subscribe', channel);
  if (channel) {
    pubnub.subscribe({
      channel: channel,
      message: function(data) {
        sendNotification(data);
      }
    });
  } else {
    setTimeout(subscribe, 10000);
    // check every 10 seconds to see if user is logged in and has a channel to subscribe to for notifications
  }
}

setTimeout(subscribe, 1000);

const sendNotification = (data) => {
  if (data.messageType === 'eventAdded') {
    sendEventAddedNotification(data);
  }
  if (data.messageType === 'timeToLeave') {
    sendTimeToLeaveNotification(data);
  }
}

const sendEventAddedNotification = (data) => {
  let start = moment(data.start.dateTime).format('LT');
  let end = moment(data.end.dateTime).format('LT');
  var notify = {
    type: 'basic',
    title: 'Your Calendar Event Has Been Added!',
    message: data.location + '\n' + start + ' - ' + end,
    iconUrl: './../assets/emoji_calendar1.png',
    buttons: [{
      title: 'Click To See Event Details'
    }]
  };

  chrome.notifications.create(notify, function(id) {
    console.log('created event added notification!');
    chrome.notifications.onButtonClicked.addListener(function(clickId) {
      if (id === clickId) {
        window.open(data.htmlLink);
      }
    });
  });
}

const sendTimeToLeaveNotification = (data) => {
  let transit = (data) => {
    if (data.transit === 'driving') {
      return 'data=!4m2!4m1!3e0';
    } else if (data.transit === 'bicycling') {
      return 'data=!4m2!4m1!3e1';
    } else if (data.transit === 'walking') {
      return 'data=!4m2!4m1!3e2';
    } else if (data.transit === 'transit') {
      return 'data=!4m2!4m1!3e3';
    }
  };

  let start = moment(data.startdatetime).format('LT');
  let leave = {
    type: 'basic',
    title: `Time to Leave for ${data.name} at ${data.location}!`,
    message: `Your event is at ${start}, and it will take about ${Math.ceil(((parseInt(data.traffic) / 60) / 1000))} minutes to get there`,
    iconUrl: './../assets/emoji_rocket.png',
    buttons: [{
      title: 'Click To See Map Details'
    }]
  };

  chrome.notifications.create(leave, function(id) {
    console.log('created time to leave notification!');
    chrome.notifications.onButtonClicked.addListener(function(clickId) {
      if (clickId === id) {
        window.open(`https://www.google.com/maps/dir/${data.origin}/${data.location}/${transit(data)}`);
      }
    });
  });
}
