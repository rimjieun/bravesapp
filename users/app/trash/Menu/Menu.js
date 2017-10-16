import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Menu extends Component {

  render() {

    const title = 'M E N U';
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