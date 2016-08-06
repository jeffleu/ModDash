import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        hello
      </div>
    )
  }
}
// console.log('am i getting here', ReactDOM);
ReactDOM.render(<App />, document.getElementById('app'));
