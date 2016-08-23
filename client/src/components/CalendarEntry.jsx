import React from 'react';
import { Glyphicon } from 'react-bootstrap';



class CalendarEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.handleDeleteEvent.bind(this);
  }

  mouseOver() {
    this.setState({
      hover: true
    });
  }

  handleDeleteEvent(event) {
    console.log('eventid', event);
    this.props.deleteEvent(event);
  }

  mouseOut() {
    this.setState({
      hover: false
    });
  }

  render() {
    var gcalId = this.props.event.eventId;
    return (
      <div>
      {this.state.hover ? (<Glyphicon onClick={this.handleDeleteEvent(gcalId)} glyph="remove" />) : null}
        <div className='calendar-entry'>
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
