import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import PhotoView from 'react-native-photo-view';

const width = Dimensions.get('window').width;

export default class Map extends Component {
  render() {
    return (
      <Image style={styles.map} source={require('./../../assets/img/concessions_map.jpg')} />

    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: width
  }
});