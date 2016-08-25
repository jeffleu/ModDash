import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { artyomStart, artyomStop } from '../scripts/commands';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listening: true
    };

    this.toggleArtyomListener = this.toggleArtyomListener.bind(this);
  }
  toggleArtyomListener() {
    if (this.state.listening) {
      this.setState({ listening: false });
      artyomStop();
    } else {
      this.setState({ listening: true });
      artyomStart();
    }
  }

  render() {
    var volumeIcon = (this.state.listening) ? <Glyphicon glyph="volume-up" /> : <Glyphicon glyph="volume-off" />;

    return (
      <Navbar className="navigation" fixedTop={true}>
        <Navbar.Header className="nav-icons">
          <Navbar.Brand>
            <a href="http://velocitydash.com" target="_blank">
            <Glyphicon glyph="list-alt" />
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight={true} className="nav-icons">
          <NavItem eventKey={1} onClick={this.props.toggleEventForm}>
            <Glyphicon glyph="plus" />
          </NavItem>
          <NavItem eventKey={2} onClick={this.props.toggleTransitMode}>
            <Glyphicon glyph="road" />
          </NavItem>
          <NavItem eventKey={3} onClick={this.toggleArtyomListener}>
            { volumeIcon }
          </NavItem>
          <NavItem eventKey={4} onClick={this.props.toggleCommands}>
            <Glyphicon glyph="question-sign" />
          </NavItem>
          <NavItem eventKey={5} onClick={this.props.toggleSettings} >
            <Glyphicon glyph="cog" />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
