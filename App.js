import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Concessions from './users/app/Components/Concessions/Concessions'
import axios from 'axios';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      vendors: []
    };
  }

  getVendors() {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/todos'
    }).then(data => {
      console.log(data);
      // this.setState({vendors: data}, function() {
      //     console.log(this.state);
      // });
    }).catch(err => {
      console.log('error');
    });
  }
  

  componentWillMount() {
    this.getVendors();
  }

  componentDidMount() {
    this.getVendors();
  }

  render() {
    return (
      <View style={styles.container}>
        <Concessions />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});