import React from 'react';
import CalendarEntry from './CalendarEntry.jsx';
import { Glyphicon, Overlay } from 'react-bootstrap';


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format('dddd, MMMM D'),
    };
  }

  render() {
    return (
      <div className='calendar'>
        <div className='calendar-title'>
          {this.state.date}
        </div>
        <div>
        {this.props.events.map((event, i) =>
          <CalendarEntry fetch={this.props.fetch} key={i} event={event} />
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;
