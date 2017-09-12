import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Concessions from './users/app/Components/Concessions/Concessions'
import axios from 'axios';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      vendors: []
    };
  }

  getVendors() {

    fetch('http://192.168.0.106:8080/food/vendors')
      .then((response) => response.json())
      .then((responseJson) => {
        let vendors = [];
        responseJson.vendors.forEach((vendor) => {
          let vendorName = vendor.vendorName;
          vendors.push(vendorName);
          this.setState({vendors: vendors});
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  componentWillMount() {
    this.getVendors();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Concessions vendors={this.state.vendors} />
      </View>
    );
  }
}