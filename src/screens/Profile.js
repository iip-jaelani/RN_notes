/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButtonForm} from '../components/ButtonForm';
import {auth} from '../config/DbConfig';
import {
  AuthSingOut,
  SignOutFacebook,
  SignOutGoogle,
} from '../services/AuthService';
const {width} = Dimensions.get('window');

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_data: null,
      isLoading: true,
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  onAuthStateChanged = (users) => {
    this.setState({
      user_data: users,
      isLoading: false,
    });
  };
  // Handle user state changes
  _signOut = async () => {
    const provider = await AsyncStorage.getItem('@provider');
    if (provider === 'facebook') {
      SignOutFacebook()
        .then((res) => {})
        .catch((error) => {});
    } else if (provider === 'authFirebase') {
      AuthSingOut()
        .then((res) => {})
        .catch((error) => {});
    } else if (provider === 'google') {
      SignOutGoogle()
        .then((res) => {})
        .catch((err) => {});
    }
    AsyncStorage.removeItem('@provider');
    AsyncStorage.removeItem('@user');
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  render() {
    const {user_data, isLoading} = this.state;

    if (!user_data) {
      return <View style={styles.loading} />;
    }
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color="#3498DB" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.subContent}>
          <View style={styles.containerProfile}>
            <Image source={{uri: user_data.photoURL}} style={styles.image} />
            <View style={styles.nameContainer}>
              <Text>{user_data.displayName}</Text>
              <Text>{user_data.email}</Text>
            </View>
          </View>
        </View>
        <View style={{}}>
          <ButtonForm
            backgroundColor="#de5246"
            label="Sign Out"
            onPress={() => {
              this._signOut();
            }}
          />
        </View>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  subContent: {
    flex: 1,
  },
  containerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 100,
  },
  nameContainer: {
    marginLeft: (width * 0.05) / 2,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
