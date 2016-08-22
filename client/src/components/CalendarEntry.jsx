import React from 'react';
//
// const CalendarEntry = (props) => {
//   return (
//     <div className='calendar-entry'>
//       <div className='close'>
//
//       </div>
//       <div className='event-start'>
//         {props.event.startTime}
//       </div>
//       <div className='event-summary-location'>
//         <a className='event-link' href={props.event.eventUrl} target='new'>{props.event.eventName} at {props.event.location}</a>
//       </div>
//     </div>
//   );
// };

class CalendarEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  mouseOver() {
    this.setState({
      hover: true
    });
  }


  mouseOut() {
    this.setState({
      hover: false
    });
  }

  render() {

    return (
      <div className='calendar-entry'>
        <div className='close'>

        </div>
        <div className='event-start'>
          {props.event.startTime}
        </div>
        <div className='event-summary-location'>
          {this.state.hover ? (<div> does this show up</div>) : null}    
          <a className='event-link' onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} href={props.event.eventUrl} target='new'>{props.event.eventName} at {props.event.location}</a>
        </div>
      </div>
    );
  }

}

export default CalendarEntry;
