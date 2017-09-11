import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
// import bannerImg from '../img/the_slice.JPG';

export default class Banner extends Component {
  render() {
    return (
      <View>
        <Text>Banner Image</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    width: 50,
    height: 50
  }
});

AppRegistry.registerComponent('Banner', () => Banner);