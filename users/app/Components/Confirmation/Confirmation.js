import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class Confirmation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./../../assets/img/logo.png')} />
        <Text style={styles.successText}>
          Order Success!{"\n"}
        </Text>
        <Image source={require('./../../assets/img/red_check.png')} />
        <Text style={styles.labelText}>
          {"\n"}{"\n"}Confirmation Number{"\n"}
        </Text>
        <Text style={styles.yellowBox}>
          QTYXEI92HU2345K
        </Text>
        <Text style={styles.labelText}>
          {"\n"}Concession Location{"\n"}
        </Text>
        <Text style={styles.yellowBox}>
          The Slice{"\n"}
          Section 150
        </Text>
        <Text style={styles.subText}>
          {"\n"}Please show your confirmation number at the concession stand.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00447C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 60
  },
  successText: {
    fontSize: 35,
    // fontFamily: 'serif',
    color: '#f5f2f0'
  },
  labelText: {
    fontSize: 20,
    color: '#f5f2f0'
  },
  yellowBox: {
    width: 200,
    fontSize: 20,
    backgroundColor: '#ffffb3',
    color: '#595959',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderStyle: 'solid',
    borderRadius: 5
  },
  subText: {
    color: '#f5f2f0',
    width: 250,
    textAlign: 'center'
  }
});