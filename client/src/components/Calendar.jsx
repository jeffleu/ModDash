import React from 'react';
import CalendarEntry from './CalendarEntry.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('dddd, MMMM D')
    }
  }

  render() {
    return(
      <div className='calendar-background'>
        <div className='calendar'>
          <div className='calendar-title'>
            {this.state.date}
          </div>
          <div>{this.props.events.map((event, i) =>
            <CalendarEntry key={i} event={event} />
          )}
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar;
