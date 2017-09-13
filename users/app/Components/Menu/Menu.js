import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      menu: []
    };
  }

  getMenu(vendor) {
    //Fetch call:
    //Use either 'http://localhost:8080/food/:vendor/menu'
    //or 'http://<your IPv4 address>:8080/food/:vendor/menu'
    fetch(`http://localhost:8080/food/${vendor}/menu`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({menu: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getMenu(this.props.vendor);
  }

  render() {
    let title = 'M E N U';
    let bannerURI = './../../assets/img/food.png';

    return (
      <View style={{flex: 1}}>
        <Header title={title} />
        <Banner bannerURI={bannerURI} />
        <List component='menu' list={this.state.menu} />
      </View>
    );
  }
}
