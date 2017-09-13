import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import Concessions from './users/app/Components/Concessions/Concessions';
import Menu from './users/app/Components/Menu/Menu';
import Routes from './users/app/routes/index';


export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});