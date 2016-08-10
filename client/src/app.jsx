import React from 'react';
import ReactDOM from 'react-dom';

var event = {
    'summary': 'Suyash Kale Birthday', // here comes the title of you event;
    'location': 'Sai Kripa Colony, Scheme No 171, Indore, Madhya Pradesh', // location, you can find the exact location here;
    'description': "A chance to hear more about Google's developer products.",
    'start': { // here comes the event's start time details;
        'dateTime': '2015-05-28T09:00:00-07:00', // date and time for the event;
        'timeZone': 'America/Los_Angeles' // time zone for the event;
    },
    'end': { // here comes the event's end time details;
        'dateTime': '2015-05-28T17:00:00-07:00', // date and time for the event;
        'timeZone': 'America/Los_Angeles' // time zone for the event;
    }
  };


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        'summary': 'Suyash Kale Birthday', // here comes the title of you event;
        'location': 'Sai Kripa Colony, Scheme No 171, Indore, Madhya Pradesh', // location, you can find the exact location here;
        'description': "A chance to hear more about Google's developer products.",
        'start': { // here comes the event's start time details;
            'dateTime': '2015-05-28T09:00:00-07:00', // date and time for the event;
            'timeZone': 'America/Los_Angeles' // time zone for the event;
        },
        'end': { // here comes the event's end time details;
            'dateTime': '2015-05-28T17:00:00-07:00', // date and time for the event;
            'timeZone': 'America/Los_Angeles' // time zone for the event;
        }
      }
    }
    var event = this.state.event;
  }


  handleSubmit(e) {
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
        <form onSubmit={this.handleSubmit}>
          <input type='submit'></input>
        </form>
      </div>
    )
  }
}
// console.log('am i getting here', ReactDOM);
ReactDOM.render(<App />, document.getElementById('app'));
