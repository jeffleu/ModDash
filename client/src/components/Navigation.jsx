import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: true
    };
    this.toggleArtyomListener = this.toggleArtyomListener.bind(this);
  }

  toggleArtyomListener() {
    this.setState({
      listening: !(this.state.listening)
    });
    // artyomStop or artyomStart needs to happen, see Form.jsx
  }

  render() {
    var volumeIcon = (this.state.listening) ? <Glyphicon glyph="volume-up" /> : <Glyphicon glyph="volume-off" />;
    
    return (
      <Navbar className="navigation" fixedTop={true}>
        <Navbar.Header className="nav-icons">
          <Navbar.Brand>
            <Glyphicon glyph="bell" />
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight={true} className="nav-icons">
          <NavItem eventKey={1} href="#" onClick={this.props.toggleEventForm}>
            <Glyphicon glyph="plus" />
          </NavItem>
          <NavItem onClick={this.toggleArtyomListener}>
            {volumeIcon}
          </NavItem>
          <NavItem eventKey={2} href="#">
            <Glyphicon glyph="cog" />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;