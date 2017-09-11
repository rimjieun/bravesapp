import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Concessions extends Component {

  render() {
    return (
      <View> 
        <Header />
        <Banner />
        <List list={this.props.vendors} />
      </View>
    );
  }
}

AppRegistry.registerComponent('Concessions', () => Concessions);