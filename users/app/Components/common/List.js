import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, TouchableNativeFeedback } from 'react-native';

export default class List extends React.Component {

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.list}
          renderItem={({item}) => 
          <TouchableNativeFeedback onPress={() => {Alert.alert(`Go to '${item}' menu`)}}>
          <View style={styles.item}>
            <Image style={styles.thumbnail} source={require('./../../assets/img/pizza.png')} />
            <Text style={styles.text}>{item}</Text>
            </View>
          </TouchableNativeFeedback>
          }
          keyExtractor={(item, index) => item}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 8,
    backgroundColor: '#f5f2f0'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#c4c2c2',
    borderBottomWidth: 1
  },
  thumbnail: {
    width: 90,
    height: 90,
    margin: 15
  },
  text: {
    fontSize: 28
  }
});