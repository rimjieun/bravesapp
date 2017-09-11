import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
// import bannerImg from './../../../public/img/the_slice.JPG';
// import cloudinary from 'cloudinary';

export default class Banner extends Component {
  render() {
    return (
      <View style={ styles.banner }>
        <Image
          source={ require('./food.png') }
          style={ styles.image }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    flex: 5
    // backgroundColor: 'skyblue'
  },
  image: {
    flex: 1,
    height: 120
  }
});

AppRegistry.registerComponent('Banner', () => Banner);