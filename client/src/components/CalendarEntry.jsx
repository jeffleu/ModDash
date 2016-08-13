import React from 'react';

const CalendarEntry = (props) => {
  const getTime = (time) => {
    // const date = time.slice(0, time.length - 18);
    let hours = time.slice(0, 2);
    let minutes = time.slice(3, 5);
    let amPm;


    if (hours >= 12) {
      amPm = 'pm';
      hours = hours - 12;
    } else {
      amPm = 'am';
    }

    return `${hours}:${minutes} ${amPm}`;
  };

  let start = getTime(props.event.startTime)
  return (
    <div className='calendar-entry'>
      <div className='event-start'>
        {start}
      </div>
      <div className='event-summary-location'>
        {props.event.eventName} at {props.event.location}
      </div>
    </div>
  )
}

export default CalendarEntry;
