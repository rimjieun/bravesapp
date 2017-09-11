import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import VendorItem from './VendorItem';

export default class Vendors extends Component {

  render() {

    let vendorItems;
    if (this.props.vendors) {
      vendorItems = this.props.vendors.map(vendor => {
        return (
          <VendorItem key={vendor.id} vendor={vendor} />
        );
      });
    }

    return (
      <View className='Vendors'>
        <Text>Vendors List</Text>
        {vendorItems}
      </View>
    );
  }
}

AppRegistry.registerComponent('Vendors', () => Vendors);