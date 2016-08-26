import React from 'react';
import { Section, CustomerQuotes, CustomerQuote } from 'neal-react';

class Creators extends React.Component {
  render() {
    return (
      <Section>
        <CustomerQuotes>
          <CustomerQuote name="Carl Chen" title="Velocity co-creator" imageUrl="./assets/carl_chen_circle.png">
            <p>
            We know your new browser tab is something you see all the time so we made Velocity to be sleek and minimal. Most importantly, we made it load fast and accurately.
            </p>
          </CustomerQuote>
          <CustomerQuote name="Derek Hoang" title="Velocity co-creator" imageUrl="./assets/derek_hoang_circle.png">
            <p>
            Our app efficiently saves users time from checking their google calendar and maps for directions, traffic, and arrival time. Users will never have to worry about arriving late to an event again. We'll tell you when and where you'll need to be!
            </p>
          </CustomerQuote>
          <CustomerQuote name="Jeff Leu" title="Velocity co-creator" imageUrl="./assets/jeff_leu_circle.png">
            <p>
            The Google Chrome browser's native APIs are so powerful, so it was very exciting to make a voice-activated dashboard that leveraged its technologies.
            </p>
          </CustomerQuote>
        </CustomerQuotes>
      </Section>
    );
  }
}

export default Creators;
