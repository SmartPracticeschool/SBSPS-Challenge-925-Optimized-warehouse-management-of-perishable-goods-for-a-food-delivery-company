import React from 'react';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import './homepage.css'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import swal from 'sweetalert'

class SideNavigation extends React.Component {
    componentDidMount() {
    if (!localStorage["usertoken"]) {

        swal("Please Login")
        this.props.history.push(`/login`)
    }       
  } 

  render() {
    return (
      <div>

        <SideNav style={{'background-color': '#7cbd6a', 'opacity':0.8,}} className="homepage-text">
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
            <NavItem eventKey="stock"onSelect={(selected) => {this.onSelectStock()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-inventory" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Predicted Stock
                </NavText>
            </NavItem>
            <NavItem eventKey="meal-stock"onSelect={(selected) => {this.onSelectMealStock()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-blah" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Sales and dish stock
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

            <NavItem eventKey="inventory" onSelect={(selected) => {this.onSelectInventory()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-inventory" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Inventory
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
            <NavItem eventKey="logout"onSelect={(selected) => {this.onSelectLogout()}}>
                <NavIcon>
                    <i className="fa fa-fw fa-logout" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Logout
                </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>

      </div>

    );
  }

  onSelectHome() {
    this.props.history.push('/nav/main')
  } 
  onSelectInventory() {
    this.props.history.push('/nav/inventory')
  }
  onSelectAdd() {
    this.props.history.push('/nav/add_meal')
  }
  onSelectStock() {
    this.props.history.push('/nav/stock')
  }
  onSelectDonations() {
    this.props.history.push('/nav/donations')
  }
  onSelectMealStock() {
    this.props.history.push('/nav/form')
  }
  onSelectLogout() {			
    localStorage.removeItem('usertoken')
    this.props.history.push('/login')
  }
}

export default SideNavigation;
