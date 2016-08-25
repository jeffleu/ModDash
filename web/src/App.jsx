import React from 'react';
import { Page } from 'neal-react';
import Navigation from './Navigation.jsx';
import AppHero from './AppHero.jsx';
import Leads from './Leads.jsx';
import LogosSubHero from './LogosSubHero.jsx';
import Screenshot from './Screenshot.jsx';
import Creators from './Creators.jsx';
import AppFooter from './AppFooter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(window.location.pathname);
  }

  render() {
    return (
      <Page>
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
