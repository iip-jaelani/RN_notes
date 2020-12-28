/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Dimensions, Text, View, StatusBar, Alert} from 'react-native';
import {ButtonForm, ButtonIcon} from '../components/ButtonForm';
import TextForm from '../components/TextForm';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthSingUp} from '../services/AuthService';
import {auth} from '../config/DbConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const PADDING = width * 0.05;
const Spacing = () => (
  <View
    style={{
      marginBottom: width * 0.03,
    }}
  />
);
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rePassword: '',
      initializing: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  // Handle user state changes
  onAuthStateChanged = async (user) => {
    if (!user) {
      return;
    }
    await AsyncStorage.setItem('@user', JSON.stringify(user));
    console.log(user.uid);
  };

  _handleSignUp() {
    const {email, password, rePassword} = this.state;
    if (password !== rePassword) {
      Alert.alert('Error', "Password don't match");
      return;
    }
    AuthSingUp(email, password)
      .then((response) => {
        console.log(response, 'response');
        AsyncStorage.setItem('@provider', 'authFirebase');
        AsyncStorage.setItem('@user', JSON.stringify(response.user));
        this.props.navigation.navigate('BottomNavigator');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        }
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
          Register
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
        <TextForm
          secureTextEntry
          onChangeText={(password) => {
            this.setState({
              password,
            });
          }}
          placeholder="Password"
        />
        <Spacing />
        <TextForm
          secureTextEntry
          onChangeText={(rePassword) => {
            this.setState({
              rePassword,
            });
          }}
          placeholder="Re-Password"
        />
        <Spacing />
        <ButtonForm
          label="Sign Up"
          onPress={() => {
            this._handleSignUp();
          }}
        />
        <Spacing />
        <ButtonForm
          backgroundColor="#fff"
          label="Have already an account? Sign In"
          onPress={() => {
            this.props.navigation.goBack();
          }}
          colorLabel="#3498DB"
          bold
        />
      </View>
    );
  }
}

export default Register;
