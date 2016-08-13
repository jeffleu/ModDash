import React from 'react';

const CalendarEntry = (props) => {
  return (
      <div className='event-entry'>
        <div className='event-name'>
          {props.event.eventName}
        </div>
        <div className='event-location'>
          {props.event.location}
        </div>
        <div className='event-start-time'>
          {props.event.startTime}
        </div>
      </div>
  );
}

export default CalendarEntry;
