let events = [];
let newEvents = [];
let ids = [];
let latestId;

var event = {
    'summary': 'Suyash Kale Birthday', // here comes the title of you event;
    'location': 'Sai Kripa Colony, Scheme No 171, Indore, Madhya Pradesh', // location, you can find the exact location here;
    'description': 'A chance to hear more about Google's developer products.',
    'start': { // here comes the event's start time details;
        'dateTime': '2015-05-28T09:00:00-07:00', // date and time for the event;
        'timeZone': 'America/Los_Angeles' // time zone for the event;
    },
    'end': { // here comes the event's end time details;
        'dateTime': '2015-05-28T17:00:00-07:00', // date and time for the event;
        'timeZone': 'America/Los_Angeles' // time zone for the event;
    }
  };



function fetchData(data) {
  for (var i = 0; i < data.items.length; i++) {
    ids[i] = data.items[i].id;
    events[i] = {'time': data.items[i].start.dateTime + ' - ' + data.items[i].end.dateTime, 'location': data.items[i].location, 'link': data.items[i].htmlLink}
  }

  if(latestId === ids[0]) {
    // no update
  } else if (latestId === undefined) {
    // first run browser session
    latestId = ids[0];
  } else if (latestId !== ids[0]) {
    for (var j = 0; j <= ids.length; j++) {
      if(latestId === ids[j]) {
        break;
      } else {
        newEvents[j] = events[j];
      }
    }
    latestId = ids[0];
  }

  console.log('newEvents', newEvents);
  if (newEvents.length === 0) {
    // do nothing
  } else {
    for (var h = 0; h < newEvents.length; h++) {
      var event = {
        type: 'basic',
        title: 'New Calendar Event Added!',
        meesage: newEvents[i].time + '\n' + newEvents[i].location,
        buttons: [{
          title: "Click to See Details",

        }],
        iconUrl: 'charlie.jpg'
      };
      chrome.notifications.onButtonClicked.addListener(function() {
        window.open(newEvents[i].link)
      })
      chrome.notifications.create(event);
    }
  }
}


// time start and end
// location
// confirm saved to calendar
// need summary
var calendarData = {
 "kind": "calendar#events",
 "etag": "\"p328anfmuvemss0g\"",
 "summary": "nevermissoutapp@gmail.com",
 "updated": "2016-08-06T23:42:18.650Z",
 "timeZone": "America/Los_Angeles",
 "accessRole": "owner",
 "defaultReminders": [
  {
   "method": "popup",
   "minutes": 30
  }
 ],
 "nextSyncToken": "CJCrvt77rc4CEJCrvt77rc4CGAU=",
 "items": [
  {


   "kind": "calendar#event",
   "etag": "\"2941004817610000\"",
   "id": "b1l88kkkko3svoudr7d9lm61j8",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=YjFsODhra2trbzNzdm91ZHI3ZDlsbTYxajhfMjAxNjA4MDhUMDUwMDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T16:52:42.000Z",
   "updated": "2016-08-06T16:53:28.805Z",
   "summary": "Karaoke with Frank at Playground",
   "location": "Playground, 1705 Buchanan St San Francisco, CA 94115",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-07T22:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-07T23:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "iCalUID": "b1l88kkkko3svoudr7d9lm61j8@google.com",
   "sequence": 1,
   "reminders": {
    "useDefault": true
   }
  },
  {


   "kind": "calendar#event",
   "etag": "\"2941005056526000\"",
   "id": "5n6o8siqrm23fo96028u5o3fuo",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=NW42bzhzaXFybTIzZm85NjAyOHU1bzNmdW9fMjAxNjA4MDdUMTU1MDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T16:54:49.000Z",
   "updated": "2016-08-06T16:55:28.263Z",
   "summary": "Check in with Lizzy at Hack Reactor",
   "location": "Hack Reactor, 944 Market St, San Francisco, CA 94102",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-07T08:50:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-07T09:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "iCalUID": "5n6o8siqrm23fo96028u5o3fuo@google.com",
   "sequence": 1,
   "reminders": {
    "useDefault": true
   }
  },
  {


   "kind": "calendar#event",
   "etag": "\"2941053149332000\"",
   "id": "om0evu16tdhqk62m6f2k5vtkvg",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=b20wZXZ1MTZ0ZGhxazYybTZmMms1dnRrdmdfMjAxNjA4MDZUMTcwMDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T16:49:49.000Z",
   "updated": "2016-08-06T23:36:14.666Z",
   "summary": "Planking with Pyry",
   "location": "Berkeley Ironworks, 800 Potter Street, Berkeley, CA 94710",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-06T10:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-06T11:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "transparency": "transparent",
   "iCalUID": "om0evu16tdhqk62m6f2k5vtkvg@google.com",
   "sequence": 1,
   "reminders": {
    "useDefault": true
   }
  },
  {


   "kind": "calendar#event",
   "etag": "\"2941053513412000\"",
   "id": "l87al842cgpai6e0jh79pl4724",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=bDg3YWw4NDJjZ3BhaTZlMGpoNzlwbDQ3MjRfMjAxNjA4MDZUMjMyMDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T16:48:25.000Z",
   "updated": "2016-08-06T23:39:16.706Z",
   "summary": "Do some shit at Google",
   "location": "1600 Amphitheatre Parkway, Mountain View, CA 94043",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-06T16:20:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-06T17:20:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "iCalUID": "l87al842cgpai6e0jh79pl4724@google.com",
   "sequence": 2,
   "reminders": {
    "useDefault": true
   }
  },
  {


   "kind": "calendar#event",
   "etag": "\"2941053534794000\"",
   "id": "vvns7li93g10pitj15h5othikc",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=dnZuczdsaTkzZzEwcGl0ajE1aDVvdGhpa2NfMjAxNjA4MTNUMjIwMDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T18:09:39.000Z",
   "updated": "2016-08-06T23:39:27.397Z",
   "summary": "Learn React at Facebook HQ",
   "location": "1 Hacker Way, Menlo Park, CA 94025",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-13T15:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-13T16:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "iCalUID": "vvns7li93g10pitj15h5othikc@google.com",
   "sequence": 2,
   "reminders": {
    "useDefault": true
   }
  },
  {


   "kind": "calendar#event",
   "etag": "\"2941053663102000\"",
   "id": "sjlnbhvktdcngqljidochpqco8",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=c2psbmJodmt0ZGNuZ3Fsamlkb2NocHFjbzhfMjAxNjA4MTRUMDEwMDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T18:07:08.000Z",
   "updated": "2016-08-06T23:40:31.551Z",
   "summary": "Catching Pokemon with June in Lake Tahoe",
   "location": "3411 Lake Tahoe Blvd, South Lake Tahoe, CA 96150",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-13T18:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-13T19:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "iCalUID": "sjlnbhvktdcngqljidochpqco8@google.com",
   "sequence": 1,
   "reminders": {
    "useDefault": true
   }
  },
  {
   "kind": "calendar#event",
   "etag": "\"2941053837762000\"",
   "id": "2tn5hdbbq75bp1ht8nj68sbctc",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=MnRuNWhkYmJxNzVicDFodDhuajY4c2JjdGNfMjAxNjA4MTRUMDMwMDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T18:08:47.000Z",
   "updated": "2016-08-06T23:41:58.881Z",
   "summary": "Dinner at Shan Dong in Oakland w HR Fam",
   "location": "328 10th St #101, Oakland, CA 94607",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-13T20:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-13T21:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "iCalUID": "2tn5hdbbq75bp1ht8nj68sbctc@google.com",
   "sequence": 1,
   "reminders": {
    "useDefault": true
   }
  },
  {
   "kind": "calendar#event",
   "etag": "\"2941053876928000\"",
   "id": "u7mqr626ffc821lvaf1ja2k058",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=dTdtcXI2MjZmZmM4MjFsdmFmMWphMmswNThfMjAxNjA4MDdUMjAwMDAwWiBuZXZlcm1pc3NvdXRhcHBAbQ",
   "created": "2016-08-06T16:55:46.000Z",
   "updated": "2016-08-06T23:42:18.464Z",
   "summary": "Body by Julius",
   "location": "Aloft San Francisco Airport, 401 E Millbrae Ave, Millbrae, CA 94030, USA",
   "creator": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "organizer": {
    "email": "nevermissoutapp@gmail.com",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-07T13:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "end": {
    "dateTime": "2016-08-07T14:00:00-07:00",
    "timeZone": "America/Los_Angeles"
   },
   "recurrence": [
    "RRULE:FREQ=DAILY"
   ],
   "iCalUID": "u7mqr626ffc821lvaf1ja2k058@google.com",
   "sequence": 2,
   "reminders": {
    "useDefault": true
    }
  }]
}

setInterval(fetchData(calendarData), 2000);
