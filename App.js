import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListComponent from './users/app/Components/ListComponent/ListComponent';
// import Concessions from './users/app/Components/Concessions/Concessions';
// import Menu from './users/app/Components/Menu/Menu';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      vendors: []
    };
  }

  getAllVendors() {
    //VENDOR NAMES DATA
    fetch('http://192.168.0.106:8080/food/vendors')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({vendors: responseJson.vendors});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  getVendorNames() {
    return this.state.vendors.map((vendor) => vendor.vendorName);
  }

  getMenu(vendorName) {
    let vendors = this.state.vendors;
    for (var i in vendors) {
      if (vendors[i].vendorName === vendorName) {
        return vendors[i].menu;
      }
    }
  }

  componentWillMount() {
    this.getAllVendors();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListComponent component='concessions' list={this.getVendorNames()} />
      </View>
    );
  }
}



// <Menu menuItems={this.state.data} />