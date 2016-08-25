import React from 'react';
import { Navbar, NavItem } from 'neal-react';

const brandName = "Velocity Dashboard";
const brand = <span>{brandName}</span>;

class Navigation extends React.Component {
  render() {
    return (
      <Navbar brand={brand}>
        <NavItem><a className="nav-link" href="https://github.com/ModDash/ModDash" target="_blank">Check us out on Github!</a></NavItem>
      </Navbar>

    );
  }
};

export default Navigation;