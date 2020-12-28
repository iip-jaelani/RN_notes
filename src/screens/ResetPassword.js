/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Dimensions, Text, View, StatusBar} from 'react-native';
import {ButtonForm, ButtonIcon} from '../components/ButtonForm';
import TextForm from '../components/TextForm';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthResetPassword} from '../services/AuthService';
const {width, height} = Dimensions.get('window');

const PADDING = width * 0.05;
const Spacing = () => (
  <View
    style={{
      marginBottom: width * 0.03,
    }}
  />
);
export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  _resetPassword() {
    const {email} = this.state;
    AuthResetPassword(email)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: PADDING,
          backgroundColor: '#fff',
          justifyContent: 'flex-end',
        }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Text
          style={{
            fontSize: width * 0.05,
            fontWeight: 'bold',
          }}>
          Forgot Password
        </Text>
        <Spacing />
        <TextForm
          onChangeText={(email) => {
            this.setState({
              email,
            });
          }}
          placeholder="Email"
        />
        <Spacing />
        <ButtonForm
          label="Send"
          onPress={() => {
            this._resetPassword();
          }}
        />
        <Spacing />
      </View>
    );
  }
}

export default ResetPassword;
