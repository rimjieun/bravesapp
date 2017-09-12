import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Concessions extends Component {

  render() {

    let title;
    let bannerURI;
    let list;

    if (this.props.component === 'concessions') {
      title = 'C O N C E S S I O N S';
      bannerURI = './../../assets/img/food.png';
      list = this.props.vendors;
    } else if (this.props.component === 'menu') {
      title = 'M E N U';
      bannerURI = './../../assets/img/food.png';
      list = this.prop.menu
    }

    return (
      <View style={{flex: 1}}> 
        <Header title={title} />
        <Banner bannerURI={bannerURI} />
        <List list={list} />
      </View>
    );
  }
}