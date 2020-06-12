import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to the Visualisation Menu</h2>
        <p>You can view the current trends of sales, raw materials available and suggestions!!</p>
        <p> Click on the tabs to view :)</p>
        
      </header>
      <SideNav
    onSelect={(selected) => {
      console.log("Hello")
    }}
      >
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home"onSelect={(selected) => {
      console.log("Hello1")}}>
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="current_trend">
            <NavIcon>
                <i className="fa fa-fw fa-trend" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Current Sales Trend
            </NavText>
        </NavItem>
        <NavItem eventKey="availability">
            <NavIcon>
                <i className="fa fa-fw fa-availability" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Raw materials Availability
            </NavText>
        </NavItem>
        <NavItem eventKey="suggestions">
            <NavIcon>
                <i className="fa fa-fw fa-suggestions" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Suggestions
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
    </div>
  );
}

export default App;
