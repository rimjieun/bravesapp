import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class Header extends React.Component {

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Image style={styles.logo} source={require('./../../assets/img/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#f5f2f0',
    justifyContent: 'space-between',
    position: 'relative'
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#00447C',
    position: 'absolute',
    left: 10,
    top: 5,
    fontWeight: 'bold'
  },
  logo: {
    width: 80,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 10

  }
});