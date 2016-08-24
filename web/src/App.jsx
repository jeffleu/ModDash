import React from 'react';

import { Page, Section, Hero, Navbar, NavItem, HorizontalSplit, CustomerQuotes, CustomerQuote, Team, TeamMember } from "neal-react";

const brandName = "Mod Dash";
const brand = <span>{brandName}</span>

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <Navbar brand={brand}>
          <NavItem><a className="nav-link" href="https://github.com/ModDash/ModDash" target="_blank">Github</a></NavItem>
        </Navbar>
        <Hero backgroundImage="./assets/tables_bg.jpg" className="text-xs-center">
          <h1 className="display-4"> Mod Dash </h1>
          <p className="lead">
          You're a busy professional and always need to be at places on time. <br/> Now you can integrate your Google calendar with Google Maps' traffic and travel data! <br />
          Never be late again!
          </p>
          <p>
            <a href="#" target="_blank" className="btn btn-white">
            Get it as a Google Chrome Extension
            </a>
          </p>
        </Hero>
        <Section>
          <HorizontalSplit padding="md">
            <div>
              <p className="lead">Use</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan leo sem, accumsan placerat libero posuere ut. Morbi nec neque imperdiet, faucibus neque ut, mattis metus. Ut nunc nisl, dictum eu sollicitudin quis, faucibus ut turpis. Etiam non interdum arcu. Nulla facilisi. Vestibulum vulputate vehicula purus et iaculis. Vivamus interdum purus eu bibendum accumsan. Nulla suscipit ex a est semper, eget venenatis ante tincidunt.</p>
            </div>
            <div>
              <p className="lead">Notifications</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan leo sem, accumsan placerat libero posuere ut. Morbi nec neque imperdiet, faucibus neque ut, mattis metus. Ut nunc nisl, dictum eu sollicitudin quis, faucibus ut turpis. Etiam non interdum arcu. Nulla facilisi. Vestibulum vulputate vehicula purus et iaculis. Vivamus interdum purus eu bibendum accumsan. Nulla suscipit ex a est semper, eget venenatis ante tincidunt.</p>
            </div>
            <div>
              <p className="lead">Future Features</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan leo sem, accumsan placerat libero posuere ut. Morbi nec neque imperdiet, faucibus neque ut, mattis metus. Ut nunc nisl, dictum eu sollicitudin quis, faucibus ut turpis. Etiam non interdum arcu. Nulla facilisi.</p>
            </div>
          </HorizontalSplit>
        </Section>
        <Section>
          <CustomerQuotes>
            <CustomerQuote name="Carl Chen" title="Co-founder" imageUrl="./assets/carl_chen.jpg">
              <p>What I tell founders is not to sweat the business model too much at first. The most important task at first is to build something people want. If you don't do that, it won't matter how clever your business model is.</p>
            </CustomerQuote>
            <CustomerQuote name="Derek Hoang" title="Co-founder" imageUrl="./assets/derek_hoang.jpg">
              <p>I came to the conclusion that we should aspire to increase the scope and scale of human consciousness in order to better understand what questions to ask. Really, the only thing that makes sense is to strive for greater collective enlightenment.</p>
            </CustomerQuote>
            <CustomerQuote name="Jeff Leu" title="Co-founder" imageUrl="./assets/jeff_leu.jpg">
              <p>If you are not embarrassed by the first version of your product, you've launched too late.</p>
            </CustomerQuote>
          </CustomerQuotes>
        </Section>
        <Section>
          <Team>
            <TeamMember name="Carl Chen" title="Co-founder" imageUrl="./assets/carl_chen.jpg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </TeamMember>
            <TeamMember name="Derek Hoang" title="Co-founder" imageUrl="./assets/derek_hoang.jpg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </TeamMember>
            <TeamMember name="Jeff Leu" title="Co-founder" imageUrl="./assets/jeff_leu.jpg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </TeamMember>
          </Team>
        </Section>
      </Page>
    );
  }
};

export default App; 


// <Hero backgroundImage="./assets/train_station_bg_large.jpg" className="text-xs-center">
          // <NavItem><span className="nav-link">Home</span></NavItem>