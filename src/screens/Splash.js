/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

export class Splash extends Component {
  componentDidMount() {
    this.getStore();
  }
  getStore() {
    AsyncStorage.getItem('@user').then((r) => {
      if (r) {
        this.props.navigation.navigate('BottomNavigator');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Animatable.Text
          animation="bounce"
          easing="ease-out"
          duration={1000}
          iterationCount="infinite"
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            letterSpacing: 5,
          }}>
          Notes
        </Animatable.Text>
      </View>
    );
  }
}

export default Splash;
