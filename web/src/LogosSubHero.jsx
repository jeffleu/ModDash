import React from 'react';
import { Section, ImageList, ImageListItem } from 'neal-react';

class LogosSubHero extends React.Component {
  render() {
    return (
      <Section className="subhero">
        <ImageList centered>
          <ImageListItem src="./assets/react_logo.png" url="http://facebook.github.io/react/"/>
          <ImageListItem src="./assets/node_logo.png" url="http://nodejs.org/en/"/>
          <ImageListItem src="./assets/chrome_logo.png" url="http://www.google.com/chrome"/>
          <ImageListItem src="./assets/aws_logo.png" url="http://www.aws.amazon.com"/>
        </ImageList>
      </Section>
    );
  }
};

export default LogosSubHero;