import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Concessions extends Component {

  render() {

    let title = 'C O N C E S S I O N S';
    let bannerURI = './../../assets/img/food.png';

    return (
      <View style={{flex: 1}}>
        <Header title={title} />
        <Banner bannerURI={bannerURI} />
        <List component='concessions' list={this.props.list} />
      </View>
    );
  }
}