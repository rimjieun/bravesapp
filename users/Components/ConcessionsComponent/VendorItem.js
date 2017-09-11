import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class VendorItem extends Component {

  render() {

    return (
      <View>
        <Text>{this.props.vendor.name}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('VendorItem', () => VendorItem);