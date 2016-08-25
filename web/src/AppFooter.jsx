import React from 'react';
import { Footer } from 'neal-react';

const copyright = "Made by Carl Chen, Derek Hoang, and Jeff Leu";

class AppFooter extends React.Component {
  render() {
    return (
      <Footer brandName={copyright} email="velocitydash@gmail.com" githubUrl="https://github.com/ModDash/ModDash">
      </Footer>
    );
  }
};

export default AppFooter;