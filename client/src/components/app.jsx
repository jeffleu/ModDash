import React from 'react';
import ReactDOM from 'react-dom';
import Background from './Background.jsx';
import Time from './Time.jsx';
import Calendar from './Calendar.jsx';
import Form from './Form.jsx';
import SignIn from './SignIn.jsx';
import Setting from './Setting.jsx';
import Navigation from './Navigation.jsx';
import Commands from './Commands.jsx';
import TransitMode from './TransitMode.jsx';
import { addCommands, artyomStart, artyomStop, commands, speech } from '../scripts/commands';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      transitMode: '',
      signedIn: false,
      artyomListening: false,
      eventFormIsOpen: false,
      settingsIsOpen: false,
      commandsIsOpen: false,
      transitModeIsOpen: false,
      openCommandsIntro: true,
      openSettingsIntro: true,
      openTransitIntro: true
    };

    this.toggleEventForm = this.toggleEventForm.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleCommands = this.toggleCommands.bind(this);
    this.toggleTransitMode = this.toggleTransitMode.bind(this);
    this.toggleArtyomListener = this.toggleArtyomListener.bind(this);
    this.userSignIn = this.userSignIn.bind(this);
    this.fetchAndUpdateEvents = this.fetchAndUpdateEvents.bind(this);
    this.onTransitModeChange = this.onTransitModeChange.bind(this);
  }

  toggleEventForm() {
    (!this.state.eventFormIsOpen) ? this.setState({ eventFormIsOpen: true }) : this.setState({ eventFormIsOpen: false });
  }

  toggleSettings() {
    if (!this.state.settingsIsOpen) {
      this.setState({ settingsIsOpen: true });

      if (this.state.openSettingsIntro) {
        this.setState({ openSettingsIntro: false });
        speech.openSettingsModal();
      }
    } else {
      this.setState({ settingsIsOpen: false });
    }
  }

  toggleCommands() {
    if (!this.state.commandsIsOpen) {
      this.setState({ commandsIsOpen: true});

      if (this.state.openCommandsIntro) {
        this.setState({ openCommandsIntro: false });
        speech.openCommandsModal();
      }

    } else {
      this.setState({ commandsIsOpen: false });
    }
  }

  toggleTransitMode() {
    if (!this.state.transitModeIsOpen) {
      this.setState({ transitModeIsOpen: true});

      if (this.state.openTransitIntro) {
        this.setState({ openTransitIntro: false });
        speech.openTransitModal();
      }

    } else {
      this.setState({ transitModeIsOpen: false });
    }
  }

  toggleArtyomListener() {
    if (this.state.artyomListening) {
      this.setState({ artyomListening: false });
      artyomStop();
    } else {
      this.setState({ artyomListening: true });
      artyomStart();
    }
  }

  userSignIn() {
    this.setState({ signedIn: true });
  }

  onTransitModeChange(value) {
    this.setState({ transitMode: value });
  }

  fetchAndUpdateEvents() {
    var token = localStorage.getItem('token');

    // Gets Google Calendar events only if token exists
    if (token !== null) {
      // Post event to Google Calendar API
      fetch('http://localhost:9000/api/calendar/getDayEvents', {
        method: 'GET',
        mode: 'cors-with-forced-preflight',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }
      })
      .then((res) => res.json())
        .then((data) => {
          let eventList = data.map((event) => {
            event.startdatetime = moment(event.startdatetime).format('LT');
            return {
              eventName: event.name,
              location: event.location,
              startTime: event.startdatetime,
              eventUrl: event.eventUrl,
              eventId: event.googleCalendarEventId
            };
          });

          // SORTING NEEDS TO SORT BY DATE AS WELL, NOT JUST TIME
          this.sortAndUpdateEvents(eventList);
        })
      .catch((err) => {
        console.log('Error retrieving events', err);
      });
    }
  }

  // SORTING NEEDS TO SORT BY DATE AS WELL, NOT JUST TIME
  sortAndUpdateEvents(eventList) {
    // Get all event times
    let times = eventList.reduce((array, event) => {
      return array.concat(event.startTime);
    }, []);

    // Sort event times in chronological order
    times.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`));

    // TO DO: Bug fix - if there are multiple events are at the same time, the last event with the same time will overwrite the first one

    // Sort events based on start time
    let sortedEvents = eventList.reduce((sortedArray, event) => {
      sortedArray[times.indexOf(event.startTime)] = event;
      return sortedArray;
    }, []);

    // Update the state with sorted events
    this.setState({ events: sortedEvents });
  }

  displayTransitMode() {
    var token = localStorage.getItem('token');

    fetch('http://localhost:9000/api/users/getTransit', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ transitMode: data.transitmode });
      })
      .catch((err) => {
        console.log('Did not get User info', err);
      });
  }

  componentWillUpdate() {
    this.fetchAndUpdateEvents();
  }

  componentDidMount() {
    // Set up Artyom commands
    addCommands(commands);

    // artyomStart();

    // this.fetchAndUpdateEvents();
    this.displayTransitMode();

    if (localStorage.getItem('token') !== null) {
      this.userSignIn();
    }
  }

  render() {
    let showSignInOrCalendar = (this.state.signedIn) ? <div><Calendar fetch={this.fetchAndUpdateEvents} events={this.state.events} /></div> : <div><SignIn userSignIn={this.userSignIn} artyomStart={artyomStart} toggleArtyomListener={this.toggleArtyomListener}/></div>;

    return (
      <div>
        <Background />
        <div>
          <Navigation
            toggleEventForm = {this.toggleEventForm}
            toggleSettings = {this.toggleSettings}
            toggleCommands = {this.toggleCommands}
            toggleTransitMode = {this.toggleTransitMode}
            toggleArtyomListener = {this.toggleArtyomListener}
            listening = {this.state.artyomListening}
            transitMode = {this.state.transitMode}
          />
        </div>
        <div>
          <Time />
        </div>
        {showSignInOrCalendar}
        <div>
          <Form
            eventFormIsOpen = {this.state.eventFormIsOpen}
            toggleEventForm = {this.toggleEventForm}
            refreshEvents = {this.fetchAndUpdateEvents}
          />
        </div>
        <div>
          <Setting
            settingsIsOpen = {this.state.settingsIsOpen}
            toggleSettings = {this.toggleSettings}
          />
        </div>
        <div>
          <Commands
            commandsIsOpen = {this.state.commandsIsOpen}
            toggleCommands = {this.toggleCommands}
          />
        </div>
        <div>
          <TransitMode
            transitModeIsOpen = {this.state.transitModeIsOpen}
            toggleTransitMode = {this.toggleTransitMode}
            transitChange = {this.onTransitModeChange}
            transitMode = {this.state.transitMode}
          />
        </div>
      </div>
    );
  }
}

// export default App;

ReactDOM.render(<App />, document.getElementById('app'));
