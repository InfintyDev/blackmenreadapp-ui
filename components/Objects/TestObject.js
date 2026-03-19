import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  LogBox,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable,
  SafeAreaProvider,
} from 'react-native';
import styles from './Styles';

import React, { Component } from 'react';

export class TestObject extends Component {
  constructor(props) {
    super(props);

    this.state = { modalVisible: false, isActive: false };

    //console.log(fullDate)
  }
  ToggleActive() {
    console.log('pressed');
    this.setState((prevState) => ({
      isActive: !prevState.isActive, // Toggle the boolean value based on previous state
    }));
    console.log(this.state);
  }

  Render() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={console.log('close')}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              press
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.ToggleActive()}></Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => {
            console.log('popUp');
            this.ToggleActive();
          }}>
          hello
        </Pressable>
      </View>
    );
  }
}

class MyComponent {
  constructor(props) {
    this.user = false;

    this.state = {
      isToggled: false,
    };
  }

  toggleBoolean = () => {
    console.log('tog');
    this.state = { isToggled: !this.state.isToggled };
    this.setUser(false);
    console.log(this.user);
  };

  render() {
    return (
      <View>
        <Text>Is Toggled: {this.user ? 'True' : 'False'}</Text>
        <Button title="Toggle" onPress={this.toggleBoolean} />
      </View>
    );
  }
}

export default MyComponent;
