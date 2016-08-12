import React from 'react';
import ReactDOM from 'react-dom';
// import CalendarForm from './CalendarForm.jsx';
import Time from './Time.jsx';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        event: {
          'summary': 'Google I/O 2015',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'dateTime': '2016-08-14T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2016-08-15T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          // 'recurrence': [
          //   'RRULE:FREQ=DAILY;COUNT=2'
          // ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }
      }
    }


    handleSubmit(e) {
      var event = this.state.event;
      console.log('event', event);
      e.preventDefault();
      fetch('http://localhost:9000/api/calendar/addEvent', {
        method: 'POST',
        body: JSON.stringify(event),
        mode: 'cors-with-forced-preflight',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log('res', res);
        return res.json();
      }).then((data) => {
        // do something
        console.log('data', data);
      }).catch((err) => {
        console.log('err', err);
      });
    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='submit'></input>
        </form>
      </div>
    )
  }
}
// console.log('am i getting here', ReactDOM);
ReactDOM.render(<App />, document.getElementById('app'));