import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View>
        <Text style={ styles.header }>CONCESSIONS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'grey'
  }
});

AppRegistry.registerComponent('Header', () => Header);