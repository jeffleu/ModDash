import React from 'react';
import ReactDOM from 'react-dom';
import Time from './Time.jsx';
import Calendar from './Calendar.jsx'
import Form from './Form.jsx';
import Chrono from '../lib/chrono.min.js';
import artyom from '../lib/artyom.min.js';
import $ from '../lib/jquery.js';
const commands = require('../scripts/commands.js');
const Modal = require('react-modal');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  getGeolocation() {
    let geoOptions = { timeout: 10000 };
    
    const geoSuccess = (position) => {
      let geolocation = `${position.coords.latitude} ${position.coords.longitude}`;

      fetch('http://localhost:9000/api/users/getGeolocation')
        .then((res) => res.json())
          .then((data) => {
            // If current geolocation doesn't match geolocation in DB, then update DB
            if (data.geolocation !== geolocation) {
              this.updateGeolocation(geolocation);
            } else {
              console.log('Geolocation not updated as current geolocation has not changed.');
            }
          })
          .catch((err) => {
            console.log('Error retrieving user\'s geolocation from database.\n', err);
          });
    };

    const geoError = (error) => {
      if (error.code === 0) {
        console.log(`Geolocation error occurred: unknown error`);
      } else if (error.code === 1) {
        console.log(`Geolocation error occurred: permission denied`);
      } else if (error.code === 2) {
        console.log(`Geolocation error occurred: position unavailable`);
      } else if (error.code === 3) {
        console.log(`Geolocation error occurred: timed out`);
      }
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  }

  updateGeolocation(geolocation) {
    fetch('http://localhost:9000/api/users/updateGeolocation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ geolocation })
    })
    .then((success) => {
      console.log('Geolocation was successfully updated!');
    })
    .catch((err) => {
      console.log('An error occurred while updating geolocation.');
    });
  }

  fetchAndUpdateEvents() {
    fetch('http://localhost:9000/api/calendar/getEvent')
      .then((res) => res.json())
        .then((data) => {
          let eventList = data.map((event) => {
            return {
              eventName: event.name,
              location: event.location,
              startTime: event.startdatetime,
              eventUrl: event.eventUrl
            };
          });

          this.sortAndUpdateEvents(eventList);
        })
        .catch((err) => {
          console.log('Error retrieving events', err);
        }); 
  }

  sortAndUpdateEvents(eventList) {
    // Get all event times
    let times = eventList.reduce((array, event) => {
      return array.concat(event.startTime);
    }, []);

    // Sort event times in chronological order
    times.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`));

    // TO DO: Bug fix - if there are multiple events are at the same time, the last 
    // event with the same time will overwrite the first one

    // Sort events based on start time
    let sortedEvents = eventList.reduce((sortedArray, event) => {
      sortedArray[times.indexOf(event.startTime)] = event;
      return sortedArray;
    }, []);

    // Update the state with sorted events
    this.setState({ events: sortedEvents });
  }

  componentDidMount() {
    this.fetchAndUpdateEvents(); 
    this.getGeolocation();

    // Checks for user's geolocation every 10 minutes
    setInterval(() => {
      this.getGeolocation();
    }, 600000);
  }

  render() {
    return (
      <div>
        <div>
          <Time />
        </div>
        <div>
          <Calendar events={this.state.events} />
        </div>
        <div>
          <Form refreshEvents={this.fetchAndUpdateEvents.bind(this)} commands={commands}/>
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
