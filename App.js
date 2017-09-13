import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Concessions from './users/app/Components/Concessions/Concessions';
import Menu from './users/app/Components/Menu/Menu';
import Routes from './users/app/routes/index';


export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Routes />
      </View>
    );
  }
}
