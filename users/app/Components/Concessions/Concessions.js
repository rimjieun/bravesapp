import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Concessions extends Component {

  render() {

    const title = 'C O N C E S S I O N S';
    const bannerURI = './../../assets/img/food.png';
    const vendors = this.props.vendors;

    return (
      <View style={{flex: 1}}> 
        <Header title={title} />
        <Banner bannerURI={bannerURI} />
        <List list={vendors} />
      </View>
    );
  }
}