import React from 'react';
import ReactDOM from 'react-dom';
import Time from './Time.jsx';
import Calendar from './Calendar.jsx'

class App extends React.Component {
  constructor(props) {
      super(props);
  }


    // handleSubmit(e) {
    //   var event = this.state.event;
    //   console.log('event', event);
    //   e.preventDefault();
    //   fetch('http://localhost:9000/api/calendar/addEvent', {
    //     method: 'POST',
    //     body: JSON.stringify(event),
    //     mode: 'cors-with-forced-preflight',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }).then((res) => {
    //     console.log('res', res);
    //     return res.json();
    //   }).then((data) => {
    //     // do something
    //     console.log('data', data);
    //   }).catch((err) => {
    //     console.log('err', err);
    //   });
    // }

  render() {
    return (
      <div>
        <div>
          <Time />
        </div>
        <div>
          <Calendar />
        </div>
      </div>
    )
  }
}
// console.log('am i getting here', ReactDOM);
ReactDOM.render(<App />, document.getElementById('app'));
