import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

export default class Concessions extends Component {

  constructor() {
    super();
    this.state = {
      vendors: []
    }
  }

  getVendors() {
    //Fetch call:
    //Use either 'http://localhost:8080/food/vendors'
    //or 'http://<your IPv4 address>:8080/food/vendors'
    fetch('http://192.168.0.104:8080/food/vendors')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({vendors: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getVendors();
  }

  render() {

    console.log('key: ' + this.state.vendors);

    let title = 'C O N C E S S I O N S';
    let bannerURI = './../../assets/img/food.png';

    return (
      <View style={{flex: 1}}>
        <Header title={title} />
        <Banner bannerURI={bannerURI} />
        <List component='concessions' list={this.state.vendors} />
      </View>
    );
  }
}