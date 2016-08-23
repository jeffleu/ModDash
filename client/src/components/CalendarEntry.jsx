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

  deleteEvent(event) {
    console.log('eventid', event);
    this.props.deleteEvent(event);
  }

  mouseOut() {
    this.setState({
      hover: false
    });
  }

  render() {
    console.log('props', this.props);
    var gcalId = this.props.event.eventId;
    return (
      <div className='calendar-entry'>
        <div className='close'>

        </div>
        <div className='event-start'>
          {this.props.event.startTime}
        </div>
        <div className='event-summary-location'>
          {this.state.hover ? (<div><a onClick={this.deleteEvent(gcalId)}>Delete Event</a></div>) : null}
          <a className='event-link' onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} href={this.props.event.eventUrl} target='new'>{this.props.event.eventName} at {this.props.event.location}</a>
        </div>
      </div>
    );
  }

}

export default CalendarEntry;
