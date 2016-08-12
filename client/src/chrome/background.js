
// let newEvents = [];
// let ids = [];
// let latestId;


var socket = io.connect('http://localhost:9000');
socket.on('test', function (data) {
  console.log('did it get here', data);

  var notify = {
    type: 'basic',
    title: 'Your Calendar Event Has Been Added!',
    message: data,
    iconUrl: 'sonic-sega.png'
  };

  // chrome.notifications.onButtonClicked.addListener(function() {
  //   window.open(data.htmlLink);
  // });

  chrome.notifications.create(notify, function() {
    console.log('sucess!');
  });
});




// function fetchData(data) {
//   for (var i = 0; i < data.items.length; i++) {
//     ids[i] = data.items[i].id;
//     events[i] = {'time': data.items[i].start.dateTime + ' - ' + data.items[i].end.dateTime, 'location': data.items[i].location, 'link': data.items[i].htmlLink}
//   }
//
//   if(latestId === ids[0]) {
//     // no update
//   } else if (latestId === undefined) {
//     // first run browser session
//     latestId = ids[0];
//   } else if (latestId !== ids[0]) {
//     for (var j = 0; j <= ids.length; j++) {
//       if(latestId === ids[j]) {
//         break;
//       } else {
//         newEvents[j] = events[j];
//       }
//     }
//     latestId = ids[0];
//   }
//
//   console.log('newEvents', newEvents);
//   if (newEvents.length === 0) {
//     // do nothing
//   } else {
//     for (var h = 0; h < newEvents.length; h++) {
//       var event = {
//         type: 'basic',
//         title: 'New Calendar Event Added!',
//         meesage: newEvents[i].time + '\n' + newEvents[i].location,
//         buttons: [{
//           title: "Click to See Details",
//
//         }],
//         iconUrl: 'charlie.jpg'
//       };
//       chrome.notifications.onButtonClicked.addListener(function() {
//         window.open(newEvents[i].link)
//       })
//       chrome.notifications.create(event);
//     }
//   }
// }


// time start and end
// location
// confirm saved to calendar
// need summary


// setInterval(fetchData(calendarData), 2000);
