import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Header extends React.Component {

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#f5f2f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    color: '#696969'
  }
});