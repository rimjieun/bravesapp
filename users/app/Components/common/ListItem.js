import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';

export default class ListItem extends Component {

  render() {

    return (
        <Text>{ this.props.item.name }</Text>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 20,
    height: 20
  }
});

AppRegistry.registerComponent('ListItem', () => ListItem);