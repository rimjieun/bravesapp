import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Concessions from './users/app/Components/Concessions/Concessions';
import Menu from './users/app/Components/Menu/Menu';
import Routes from './users/app/routes/index';


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      vendors: []
    };
  }

  getAllVendors() {
    //Fetch call:
    //Use either 'http://localhost:8080/food/vendors'
    //or 'http://<your IPv4 address>:8080/food/vendors'
    fetch('http://192.168.0.104:8080/food/vendors')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({vendors: responseJson.vendors});
      })
      .catch((error) => {
        console.log('goodbye')
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
        <Routes />
      </View>
    );
  }
}
