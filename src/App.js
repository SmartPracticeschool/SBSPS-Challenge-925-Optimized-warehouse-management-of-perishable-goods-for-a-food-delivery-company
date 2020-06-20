import React from 'react';
import './App.css';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

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
            <NavItem eventKey="inventory"onSelect={(selected) => {this.onSelectInventory()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-inventory" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Inventory List
                </NavText>
            </NavItem>
            <NavItem eventKey="add_meal"onSelect={(selected) => {this.onSelectAdd()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-add" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Add Meal
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
            <NavItem eventKey="donate"onSelect={(selected) => {this.onSelectDonations()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-donate" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Donations
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
  onSelectAdd() {
    this.props.history.push('/add_meal')
  }
  onSelectInventory() {
    this.props.history.push('/inventory')
  }
  onSelectDonations() {
    this.props.history.push('/donations')
  }
}

export default App;
