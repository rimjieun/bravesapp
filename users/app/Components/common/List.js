import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import ListItem from './ListItem';

export default class List extends Component {

  render() {

    let listItems;
    if (this.props.list) {
      listItems = this.props.list.map(item => {
        return (
          <ListItem key={item.id} item={item} />
        );
      });
    }

    return (
      {listItems}
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 8,
    backgroundColor: '#f5f2f0'
  }
});

AppRegistry.registerComponent('List', () => List);