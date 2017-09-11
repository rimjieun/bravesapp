import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';

export default class VendorItem extends Component {

  render() {

    return (
      <View>
        <Image
          source={ require('./pizza_slice.png') }
          style={ styles.thumbnail }
        />
        <Text>{ this.props.vendor.name }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 20,
    height: 20
  }
});

AppRegistry.registerComponent('VendorItem', () => VendorItem);