
import React, { Component } from 'react';
import { 
          TouchableOpacity,
          Alert,
          Button,
          StyleSheet,
          Picker,
          TextInput,
          AppRegistry,
          Modal, 
          Text, 
          TouchableHighlight, 
          View } from 'react-native';
       
export default class myapp extends Component {
  
  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  showAlert (){
    Alert.alert(
        'You Order Was Submitted'
    )
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
              <TextInput
                style={styles.TxtHight}
                placeholder="Customer Name"
                onChangeText={(text) => this.setState({text})}
              />

              <TextInput
                style={styles.TxtHight}
                placeholder="Name as seen on card"
                onChangeText={(text) => this.setState({text})}
              />

              <TextInput
                style={styles.TxtHight}
                placeholder="Card Number"
                onChangeText={(text) => this.setState({text})}
              />

              <TextInput
                style={styles.TxtHight}
                placeholder="Expiration Date"
                onChangeText={(text) => this.setState({text})}
              />

              <TextInput
                style={styles.TxtHight}
                placeholder="CVC Number"
                onChangeText={(text) => this.setState({text})}
              />

              <TextInput
                style={styles.TxtHight}
                placeholder="Section"
                onChangeText={(text) => this.setState({text})}
              />
     
            <Button
            onPress={(e) => { 
              e.preventDefault();
              this.showAlert();
              // this.setModalVisible(!this.state.modalVisible);
            }
          }
            title="Submit"
          />
          
          </View>
         </View>
        </Modal>

        <Button onPress={() => {
          this.setModalVisible(true)
        }}
          title="Summit Order"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  TxtHight: {
   height:40,
   marginLeft: 10
  },
});

AppRegistry.registerComponent('myapp', () => myapp);
