import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import Header from './../common/Header';

export default class Confirmation extends Component {

  constructor() {
    super();
    this.state = {
      orderNumber: [],
      location: []
    };
  }

  getConfirmation(vendor) {
    // fetch(`http://localhost:8080/food/${vendor}/menu`)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({menu: responseJson});
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  componentWillMount() {
    this.getConfirmation(this.props.vendor);
  }

  onPressHome() {
  Alert.alert('Go Bravos!');
 }

   onPressMap() {
   Alert.alert('Go Find the Restaurant!');
  }
  render() {
    let title = 'C O N F I R M A T I O N';

    return (
      <View style={{flex: 1}}>
        <Header title={title} />
        <Text style={styles.thankyou}>
          Thank you for your order!
        </Text>
        <Image style={styles.image} source={require('./../../assets/img/AB2015_PrimaryClubMark.png')} />
        <Text style={styles.confirmation}>
          Confirmation Number:
        </Text>
        <Text style={styles.bold}>
          CLKJ9234892
        </Text>
        <Text style={styles.location}>
          Pickup Location:
        </Text>
        <Text style={styles.bold}>
          The Slice
        </Text>
        <View style={styles.buttonContainerMap}>
          <Button onPress={this.onPressMap} title="View Map" color="#FFFFFF" accessibilityLabel="Tap on Me"/>
        </View>
        <View style={styles.buttonContainerHome}>
          <Button onPress={this.onPressHome} title="Return Home" color="#FFFFFF" accessibilityLabel="Tap on Me"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 5
  },
  image: {
    flex: 1,
    maxWidth: 300,
    alignContent: 'center',
    paddingTop: 20,
    paddingBottom: 50
  },
  thankyou: {
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    color: "#444",
    textAlign: 'center'
  },
  bold: {
    fontSize: 26,
    paddingTop: 8,
    paddingBottom: 8,
    color: "#D31245",
    textAlign: 'center'
  },
  confirmation: {
    fontSize: 24,
    paddingTop: 15,
    paddingBottom: 5,
    color: "#00447C",
    textAlign: 'center'
  },
  location: {
    fontSize: 24,
    paddingTop: 15,
    paddingBottom: 5,
    color: "#00447C",
    textAlign: 'center'
  },
  buttonContainerMap: {
    backgroundColor: '#00447C',
    marginTop: 20,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  },
  buttonContainerHome: {
    backgroundColor: '#D31245',
    marginTop: 3,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  }
});
