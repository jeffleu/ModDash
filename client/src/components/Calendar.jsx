import React from 'react';
import FullCalendar from 'rc-calendar';



class Calendar extends React.Component {



  render() {
    return(
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <FullCalendar />
      </div>
    )
  }
}

export default Calendar;
