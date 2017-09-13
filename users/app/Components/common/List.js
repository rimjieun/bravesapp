import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, TouchableOpacity, Dimensions, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';

var width = Dimensions.get('window').width; 

export default class List extends React.Component {

  selectComponentItems(component, item) {
    if (component === 'concessions') {
      return (
        <View style={styles.vendorItem}>
          <Image style={styles.thumbnail} source={require('./../../assets/img/pizza.png')} />
          <Text style={styles.vendorText}>{item}</Text>
        </View>
      );
    } else if (component === 'menu') {
      return (
        <View style={styles.menuItem}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuPrice}>{item.price.toFixed(2)}</Text>
          <Picker> 
            <Picker.Item  
              label='Hello' 
              value='hello' 
            /> 
          </Picker>
        </View>
      );
    }
  }

  render() {

    return (
      <View style={styles.list}>
        <FlatList
          style={{width: width * 0.9}}
          data={this.props.list}
          keyExtractor={(item, index) => {
            if(this.props.component === 'concessions') {
              return item;
            } else if (this.props.component === 'menu') {
              return item.name;
            }
          }}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => {
              if (this.props.component === 'concessions') {
                Actions.menu({vendor: item});
                // Alert.alert(`Go to '${item}' menu`);
              } 
            }}>
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
    backgroundColor: '#f5f2f0',
    alignItems: 'center'
  },
  vendorItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#c4c2c2',
    borderBottomWidth: 1
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
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
    fontSize: 15,
    width: 160
  },
  menuPrice: {
    fontSize: 15
  }
});