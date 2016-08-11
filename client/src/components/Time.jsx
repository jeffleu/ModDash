import React from 'react';
const moment = require('moment');

class Time extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return(
      <div>
        <div className='time'>
          {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </div>
        <div className='date'>
        </div>
      </div>
    )
  }
}

export default Time;
