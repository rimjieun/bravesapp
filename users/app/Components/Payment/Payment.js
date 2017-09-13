import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class Concessions extends Component {

  constructor() {
    super();
    this.state = {
      customerName: '',
      sectionNumber: '',
      cardNumber: '',
      expDateMonth: '',
      expDateYear: '',
      cvCode: ''
    };
  }

  postData() {
    let obj = {
      firstName: "Xzavier",
      lastName: "Funk",
      username: "Brittany38",
      password: "YIKWYeIGwBqXW_I",
      role: "customer",
      sectionNumber: 354
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./../../assets/img/logo.png')} />
        <Text style={styles.title}>C U S T O M E R   I N F O</Text>
        <View>
          <Text>{'\n'}</Text>
          <Text style={[styles.label, styles.center]}>Customer Name</Text>
          <TextInput style={[styles.input, styles.bigBox, styles.textCenter]} defaultValue='Xzavier Funk' underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {
            this.setState({customerName: text});
          }} />
          <View style={styles.center}>
            <Text style={styles.label}>Section Number</Text>
            <TextInput style={[styles.input, styles.smallBox, styles.center, styles.textCenter]} underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {
              this.setState({sectionNumber: text});
            }} />
          </View>
        </View>
        <Text>{'\n'}</Text>
        <View>
          <Text style={styles.label}>Card Number</Text>
          <TextInput style={[styles.input, styles.bixBox, {width: 280}]} defaultValue='XXXX-XXXX-XXXX-1234' underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {
            this.setState({cardNumber: text});
          }} />
        </View>
        <View style={styles.bottomRow}>
          <View>
          <Text style={styles.label}>Exp Date</Text>
          <View style={styles.expDate}>
            <TextInput style={[styles.input, styles.tinyBox]} defaultValue='07' underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {
              this.setState({expDateMonth: text});
            }} />
            <TextInput style={[styles.input, styles.smallBox]} defaultValue='2020' underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {
              this.setState({expDateYear: text});
            }} />
          </View>
          </View>
          <View>
            <Text style={styles.label}>CVC</Text>
            <TextInput style={[styles.input, styles.tinyBox]} defaultValue='123' underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {
              this.setState({cvCode: text});
            }} />
          </View>
        </View>
        <Text>{'\n'}{'\n'}</Text>
        <TouchableOpacity style={styles.submitBtn} onPress={() => {
          console.log('in payment: ', this.state.sectionNumber);
          this.props.submitSecNum(this.state.sectionNumber);
          Actions.confirmation({});
        }}>
          <Text style={styles.submitText}>S U B M I T</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f2f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 20
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  bigBox: {
    width: 280
  },
  smallBox: {
    width: 70
  },
  tinyBox: {
    width: 50
  },
  submitBtn: {
    backgroundColor: '#D31245',
    height: 50,
    width: 280,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f5f2f0'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  expDate: {
    flexDirection: 'row',
    marginRight: 100
  },
  logo: {
    width: 120,
    height: 60
  },
  center: {
    alignSelf: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'lightgray'
  }
});