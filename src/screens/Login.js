/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import {ButtonForm, ButtonIcon} from '../components/ButtonForm';
import TextForm from '../components/TextForm';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import {
  AuthSingIn,
  SignInFacebook,
  SignInGoogle,
} from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PADDING = width * 0.05;
const Spacing = () => (
  <View
    style={{
      marginBottom: width * 0.03,
    }}
  />
);
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.mounted = true;
  }

  componentDidMount() {
    this.getDataProvider();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  getDataProvider() {
    if (this.mounted) {
      auth().onAuthStateChanged(this.onAuthStateChanged);
    }
  }
  onAuthStateChanged = () => {};

  _handleLogin() {
    const {email, password} = this.state;
    AuthSingIn(email, password)
      .then((res) => {
        AsyncStorage.setItem('@provider', 'authFirebase');
        AsyncStorage.setItem('@user', JSON.stringify(res));
        this.props.navigation.navigate('BottomNavigator');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password' || 'user-not-found') {
          Alert.alert('Error', 'Email or password wrong');
        }
      });
  }
  _loginWithFacebook() {
    SignInFacebook()
      .then((res) => {
        AsyncStorage.setItem('@provider', 'facebook');
        AsyncStorage.setItem('@user', JSON.stringify(res.user));
        this.props.navigation.navigate('BottomNavigator');
      })
      .catch((error) => {});
  }
  _loginWithGoogle() {
    SignInGoogle()
      .then((res) => {
        AsyncStorage.setItem('@provider', 'google');
        AsyncStorage.setItem('@user', JSON.stringify(res.user));
        this.props.navigation.navigate('BottomNavigator');
      })
      .catch((error) => {});
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Text style={styles.label}>Login</Text>
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
        <ButtonForm
          label="Sign In"
          onPress={() => {
            this._handleLogin();
          }}
        />
        <Spacing />
        <ButtonForm
          backgroundColor="#fff"
          label="Forgot Password ?"
          onPress={() => {
            this.props.navigation.navigate('ResetPassword');
          }}
          colorLabel="#3498DB"
          bold
        />
        <Spacing />
        <ButtonIcon
          childIcon={<FontAwesome name="google" size={20} color="#de5246" />}
          backgroundColor="#F9EBEA"
          label="Sign In with Google"
          onPress={() => {
            this._loginWithGoogle();
          }}
          colorLabel="#de5246"
          bold
        />
        <Spacing />
        <ButtonIcon
          childIcon={
            <FontAwesome name="facebook-f" size={20} color="#3b5998" />
          }
          backgroundColor="#EBF5FB"
          label="Sign In with Facebook"
          onPress={() => {
            this._loginWithFacebook();
          }}
          colorLabel="#3b5998"
          bold
        />
        <Spacing />
        <ButtonForm
          backgroundColor="#fff"
          label="Don't have an account? Sign Up"
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
          colorLabel="#3498DB"
          bold
        />
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});
