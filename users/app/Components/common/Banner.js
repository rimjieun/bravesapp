import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Banner extends React.Component {

  render() {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('./../../assets/img/banner.jpg')} />
        <TouchableOpacity style={styles.mapContainer}
          onPress={() => {
            Actions.map({});
          }}>
          <Image style={styles.mapIcon} source={require('./../../assets/img/map.png')} />
        </TouchableOpacity>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 5,
    zIndex: 0
  },
  image: {
    flex: 1,
    position: 'relative'
  },
  mapContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: '#006600',
    padding: 15,
    borderRadius: 50
  },
  mapIcon: {
    width: 35,
    height: 35
  }
});