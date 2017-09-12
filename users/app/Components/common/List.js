import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, TouchableOpacity } from 'react-native';

export default class List extends React.Component {

  createVendorItem(item) {
    return (
      <Image style={styles.thumbnail} source={require('./../../assets/img/pizza.png')} />
      <Text style={styles.vendorText}>{item}</Text>
    );
  }

  createMenuItem(item) {
    return (
      <Text style={styles.menuName}>{item.name}</Text>
      <Text style={styles.menuPrice}>{item.price}</Text>
    );
  }

  selectComponentItems(component, item) {
    if (component === 'concessions') {
      this.createVendorItem(item);
    } else if (component === 'menu') {
      this.createMenuItem(item);
    }
  }

  render() {

    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.list}
          keyExtractor={(item, index) => item}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => {Alert.alert(`Go to '${item}' menu`)}}>
              <View style={styles.item}>
                {this.selectComponentItems(this.props.component, item)}
              </View>
            </TouchableOpacity>
          }
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
  vendorText: {
    fontSize: 28
  },
  menuName: {
    fontSize: 20
  },
  menuPrice: {
    fontSize: 10
  }
});