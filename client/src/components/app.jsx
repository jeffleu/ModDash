import React from 'react';
import ReactDOM from 'react-dom';
// import CalendarForm from './CalendarForm.jsx';
import Time from './Time.jsx';

class App extends React.Component {

  render() {
    return (
      <div>
        <Time />
      </div>
    )
  }
}
// console.log('am i getting here', ReactDOM);
ReactDOM.render(<App />, document.getElementById('app'));
