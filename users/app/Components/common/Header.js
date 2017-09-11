import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <Text style={ styles.text } >'Hello'</Text>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#f5f2f0',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'serif',
    color: '#D31245',
    fontSize: 30
  }
});

AppRegistry.registerComponent('Header', () => Header);