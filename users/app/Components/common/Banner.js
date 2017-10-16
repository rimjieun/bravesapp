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
          <Image style={styles.mapIcon} source={require('./../../assets/img/mapIcon.png')} />
        </TouchableOpacity>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 5,
    borderTopWidth: 2,
    borderColor: '#D31245',
    borderStyle: 'solid',
    borderBottomWidth: 2
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: 400,
    position: 'relative'
  },
  mapContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#EEB111',
    padding: 15,
    borderRadius: 50,
    borderColor: '#bf8c0d',
    borderStyle: 'solid',
    borderWidth: 1
  },
  mapIcon: {
    width: 35,
    height: 35
  }
});