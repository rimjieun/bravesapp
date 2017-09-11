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
      <View className='Vendors' style={ styles.vendors }>
        <Text>Vendors List</Text>
        {vendorItems}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vendors: {
    flex: 8,
    backgroundColor: '#f5f2f0'
  }
});

AppRegistry.registerComponent('Vendors', () => Vendors);