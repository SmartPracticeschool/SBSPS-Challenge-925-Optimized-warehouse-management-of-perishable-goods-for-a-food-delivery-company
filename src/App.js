import React from 'react';
<<<<<<< HEAD
import './App.css';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
=======
import logo from './logo.svg';
import './App.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
>>>>>>> f63c62db11a414cf2818cea210c65fb1861792ac

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

<<<<<<< HEAD
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SideNav>
        <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home" >
            <NavItem eventKey="home"onSelect={(selected) => {this.onSelectHome()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="current_trend"  onSelect={(selected) => {this.onSelectTrend()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-trend" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Current Sales Trend
                </NavText>
            </NavItem>
            <NavItem eventKey="availability" onSelect={(selected) => {this.onSelectAvail()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-availability" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Raw materials Availability
                </NavText>
            </NavItem>
            <NavItem eventKey="suggestions" onSelect={(selected) => {this.onSelectSuggestions()}}>
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

  onSelectHome() {
    this.props.history.push('/')
  } 
  onSelectTrend() {
    this.props.history.push('/current_trend')
  }
  onSelectAvail() {
    this.props.history.push('/availability')
  }
  onSelectSuggestions() {
    this.props.history.push('/suggestions')
  }
=======

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
>>>>>>> f63c62db11a414cf2818cea210c65fb1861792ac
}

export default App;
