import React from 'react';
import { Page } from 'neal-react';
import Navigation from './Navigation.jsx';
import AppHero from './AppHero.jsx';
import Leads from './Leads.jsx';
import LogosSubHero from './LogosSubHero.jsx';
import Screenshot from './Screenshot.jsx';
import Creators from './Creators.jsx';
import AppFooter from './AppFooter.jsx';
import VerifiedPopup from './VerifiedPopup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {
    var path = window.location.pathname.slice(0, 9);
    if (path === '/verified') {
      this.togglePopup();
      console.log(this.state.verified, 'verified');
    }
  }

  togglePopup() {
    (!this.state.verified) ? this.setState({ verified: true }) : this.setState({ verified: false });
  }

  render() {
    return (
      <Page>
        <VerifiedPopup verified={this.state.verified} togglePopup={this.togglePopup}/>
        <Navigation />
        <AppHero />
        <Leads />
        <LogosSubHero />
        <Screenshot />
        <Creators />
        <AppFooter />   
      </Page>
    );
  }
};

export default App; 
