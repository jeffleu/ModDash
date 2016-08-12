import React from 'react';

const CalendarListEntry = (props) => {
  console.log('list entry ', props.event);
  const getTime = (time) => {
    const date = time.slice(16, time.length - 18);
    let hours = date.slice(0, 2);
    let minutes = date.slice(3, 5);
    let amPm;

    if (hours >= 12) {
      amPm = 'PM';
      hours = hours - 12;
    } else {
      amPm = 'AM';
    }

    return `${hours} ${minutes} ${amPm}`;
  };

  let start = getTime(props.event.startTime)
  console.log('time', start);

  return (
    <div className='event-entry'>
      <div className='summary'>
        {props.event.summary}
      </div>
      <div className='location'>
        {props.event.location}
      </div>
      <div className='start'>
        {start}
      </div>
    </div>
  )
}

export default CalendarListEntry;
