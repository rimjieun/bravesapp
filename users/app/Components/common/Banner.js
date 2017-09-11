import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';

export default class Banner extends Component {
  render() {
    return (
      <Text>Banner</Text>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    flex: 5
  },
  image: {
    flex: 1,
    height: 120
  }
});

AppRegistry.registerComponent('Banner', () => Banner);