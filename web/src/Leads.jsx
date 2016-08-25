import React from 'react';
import { Section, HorizontalSplit } from 'neal-react';

class Leads extends React.Component {
  render() {
    return(
      <Section>
        <HorizontalSplit padding="md">
          <div>
            <p className="lead">A Smart Voice Dashboard</p>
            <p>Velocity is listening to your commands, just say what event you want to add and the dashboard will automatically insert it into your calendar. You can also search the whole internet just with your voice! </p>
          </div>
          <div>
            <p className="lead">Get There On Time</p>
            <p>
              Syncing your Google Calendar provides Velocity with the data to query directions and traffic conditions for your next event's location. Choose between driving, walking, biking, and public transport! We'll send notifications to you for when you need to leave.
              <br/>
              <br/>
            </p>
          </div>
          <div>
            <p className="lead">Future Features</p>
            <p>Integration with your mobile device is coming soon, with text and push notifications. Velocity will also be able to book reservations and buy tickets for the events that you create. 
            </p>
          </div>
        </HorizontalSplit>
      </Section>
    );
  }
};

export default Leads;