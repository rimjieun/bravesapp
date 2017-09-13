import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Menu extends Component {

  render() {

    let title = 'M E N U';
    let bannerURI = './../../assets/img/food.png';

    return (
      <View style={{flex: 1}}>
        <Header title={title} />
        <Banner bannerURI={bannerURI} />
        <List component='menu' list={this.props.list} />
      </View>
    );
  }
}