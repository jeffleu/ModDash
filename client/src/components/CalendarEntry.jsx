import React from 'react';
import { Glyphicon } from 'react-bootstrap';



class CalendarEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      gcalId: ''
    };
    this.handleDeleteEvent.bind(this);
  }

  mouseOver() {
    var gcalId = this.props.event.eventId;
    this.setState({
      hover: true,
      gcalId: gcalId
    });
    console.log(gcalId);
  }

  // handleDeleteEvent() {
  //   this.props.deleteEvent(this.state.gcalId);
  // }

  deleteEvent() {
    var deleteCalId = this.props.gcalId;
    var token = localStorage.getItem('token');
    console.log('id', deleteCalId);
    console.log('token', token);
    var googleCalId = {event: event};
    console.log('googleCalId', googleCalId);
    // fetch('http://localhost:9000/api/calendar/deleteEvent', {
    //   method: 'DELETE',
    //   body: JSON.stringify(googleCalId),
    //   mode: 'cors-with-forced-preflight',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'authorization': token
    //   }
    // })
    // .then((res) => {
    //   return res.json();
    // })
    // .then((data) => {
    //   console.log('data'. data);
    //   // use data to update state after success deletion
    // })
    // .then((err) => {
    //   console.log('did not delete event from db and gcal');
    // });
  }
  mouseOut() {
    this.setState({
      hover: false
    });
  }

  render() {
    return (
      <div>
        <div className='calendar-entry'>
        {this.state.hover ? (<Glyphicon onClick={this.handleDeleteEvent.bind(this)} glyph="remove" />) : null}
          <div className='calendar-container' onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} >
            <div className='event-start'>
              {this.props.event.startTime}
            </div>
            <div className='event-summary-location'>
              <a className='event-link' href={this.props.event.eventUrl} target='new'>{this.props.event.eventName} at {this.props.event.location}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default CalendarEntry;
