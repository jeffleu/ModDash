import React from 'react';
import ReactDOM from 'react-dom';
import Time from './Time.jsx';
import Calendar from './Calendar.jsx'
import Form from './Form.jsx';
import Chrono from '../lib/chrono.min.js';
import artyom from '../lib/artyom.min.js';
import $ from '../lib/jquery.js';
const commands = require('../scripts/commands.js');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  addEventChange(event) {
    this.setState({
      events: this.state.concat(event)
    })
  }

  render() {
    return (
      <div>
        <div>
          <Time />
        </div>
        <div>
          <Calendar />
        </div>
        <div>
          <Form commands={commands}/>
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
