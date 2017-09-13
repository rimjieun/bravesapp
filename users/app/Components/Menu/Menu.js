import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from './../common/Header';
import Banner from './../common/Banner';
import List from './../common/List';

const width = Dimensions.get('window').width; 

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      menu: [],
      order: [],
      orderTotal: 0
    };
    this.updateOrder = this.updateOrder.bind(this);
    this.calculateOrderTotal = this.calculateOrderTotal.bind(this);
  }

  getMenu(vendor) {
    //Fetch call:
    //Use either 'http://localhost:8080/food/:vendor/menu'
    //or 'http://<your IPv4 address>:8080/food/:vendor/menu'
    fetch(`http://192.168.0.104:8080/food/${vendor}/menu`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({menu: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateOrder(itemObj) {
    let list = this.state.order;
    if (list.length === 0) {
      list.push(itemObj);
    } else {
      let found = list.some((item) => {
        return item.name === itemObj.name;
      });
      if (found) {
        list.forEach((item) => {
          if (item.name === itemObj.name) {
            item.quantityOrdered = itemObj.quantityOrdered;
          }
        })
      } else {
        list.push(itemObj);
      }
    }
    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    let list = this.state.order;
    let orderTotal = 0;
    list.forEach((item) => orderTotal += item.price * item.quantityOrdered);
    this.setState({orderTotal: orderTotal});
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
        <List component='menu' list={this.state.menu} updateOrder={this.updateOrder} />
        <View style={styles.footer}>
          <Text style={styles.totalText}>
            T O T A L : ${this.state.orderTotal.toFixed(2)}
          </Text>
          <TouchableOpacity style={styles.orderBtn} onPress={() => Actions.confirmation({})}>
            <Text style={styles.orderText}>O R D E R</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#bfbfbf',
    borderColor: '#D31245',
    borderStyle: 'solid',
    borderTopWidth: 2
  },
  totalText: {
    flex: 1,
    fontSize: 20,
    color: '#00447C',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center'
  },
  orderBtn: {
    flex: 1,
    backgroundColor: '#EEB111',
    justifyContent: 'center',
    borderColor: '#d79e0f',
    borderStyle: 'solid',
    borderLeftWidth: 1
  },
  orderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center'
  }
});