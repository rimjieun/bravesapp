import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      customer: {}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./../../assets/img/logo.png')} />
        <Text style={styles.title}>C O N C E S S I O N S{'\n'}</Text>
        <Text style={styles.label}>
          Username{'\n'}
        </Text>
        <TextInput style={styles.input}
          underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {this.state.customer.username = text}} />
        <Text style={styles.label}>
          {'\n'}Password{'\n'}
        </Text>
        <TextInput style={styles.input} secureTextEntry={true}
          underlineColorAndroid={'rgba(0,0,0,0)'} onChangeText={(text) => {this.state.customer.password = text}} />
        <Text>{'\n'}</Text>
        <TouchableOpacity style={[styles.loginBtn, styles.btn]} onPress={() => Actions.concessions({})}>
          <Text style={styles.btnText}>L O G I N</Text>
        </TouchableOpacity>
        <Text>{'\n'}</Text>
        <TouchableOpacity style={[styles.registerBtn, styles.btn]}>
          <Text style={styles.btnText}>R E G I S T E R</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00447C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    color: '#f5f2f0',
    fontWeight: 'bold',
    position: 'relative',
    top: -20
  },
  label: {
    fontSize: 20,
    color: 'white'
  },
  input: {
    width: 280,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#f5f2f0',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    fontSize: 20
  },
  logo: {
    width: 250,
    height: 125
  },
  btn: {
    width: 280,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  loginBtn: {
    backgroundColor: '#EEB111'
  },
  registerBtn: {
    backgroundColor: '#D31245',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333'
  }
});