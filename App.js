import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Concessions from './users/app/Components/Concessions/Concessions';
import Menu from './users/app/Components/Menu/Menu';
import Confirmation from './users/app/Components/Confirmation/Confirmation';
import Routes from './users/app/routes/index';


export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Confirmation />
      </View>
    );
  }
}
