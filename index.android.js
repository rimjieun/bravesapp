import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
// import $ from 'jquery';
import Header from './users/app/Components/ConcessionsComponent/Header';
import Banner from './users/app/Components/ConcessionsComponent/Banner';
import Vendors from './users/app/Components/ConcessionsComponent/Vendors';

export default class bravesapp extends Component {

  constructor() {
    super();
    this.state = {
      vendors: []
    };
  }

  getVendors() {

    $.ajax({
      url: '',
      dataType: 'json',
      method: 'GET'
      cache: false,
      success: function(data) {
        this.setState({vendors: data}, function() {
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });

    // this.setState({
    //   vendors: [
    //     {
    //       id: '1',
    //       name: 'The Spice',
    //       categories: ['Pizza', 'Breadsticks', 'Peanuts']
    //     },
    //     {
    //       id: '2',
    //       name: '1871 Grille',
    //       categories: ['Burgers', 'Chicken Tender', 'Peanuts']
    //     }
    //   ]
    // });
  }

  componentWillMount() {
    this.getVendors();
  }

  componentDidMount() {
    this.getVendors();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Banner />
        <Vendors vendors={ this.state.vendors } />
      </View>
    );
  }
}

AppRegistry.registerComponent('DemoApp', () => bravesapp);
