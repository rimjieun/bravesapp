import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class Banner extends React.Component {

  render() {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('./../../assets/img/banner.jpg')} />
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 5
  },
  image: {
    flex: 1
  }
});