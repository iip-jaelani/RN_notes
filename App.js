import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Router} from './src/config/router';

export class App extends Component {
  render() {
    return <Router />;
  }
}

export default App;

// import React, {Component} from 'react';
// import {Text, View, Button} from 'react-native';
// import {onFacebookButtonPress} from './src/config/AuthProvider';
// import {firebaseConfig, database} from './src/config/DbConfig';
// import {guidGenerator} from './src/config/randomString';
// import {SignUp} from './src/services/firebaseService';
// import auth from '@react-native-firebase/auth';

// export class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       initializing: true,
//       users: null,
//     };
//   }

//   componentDidMount() {
//     auth().onAuthStateChanged(this.onAuthStateChanged);
//     database()
//       .ref('users/list/-MOKroP8Wn7pzer7FbNF')
//       .once('value')
//       .then((r) => {
//         const data = r.val();
//         console.log(data);
//       });
//   }

//   // Handle user state changes
//   onAuthStateChanged = (user) => {
//     if (!user) {
//       if (this.state.initializing) {
//         this.setState({
//           initializing: false,
//           users: null,
//         });
//       }
//       return;
//     }
//     this.setState({
//       users: user,
//       initializing: false,
//     });
//   };
//   _testingDb = () => {
//     const uuid = guidGenerator();
//     const data = [
//       {
//         name: 'iip jaelani',
//         phone: '00002002020',
//         password: 'PasswordDeh',
//       },
//       {
//         name: 'iip jaelani',
//         phone: '00002002020',
//         password: 'PasswordDeh',
//       },
//       {
//         name: 'iip jaelani',
//         phone: '00002002020',
//         password: 'PasswordDeh',
//       },
//     ];
//     SignUp(data, 'list')
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   _firebaseAuth() {
//     //
//     auth()
//       .createUserWithEmailAndPassword(
//         'iipjaelani12345@gmail.com',
//         'SuperSecretPassword!',
//       )
//       .then(() => {
//         console.log('User account created & signed in!');
//       })
//       .catch((error) => {
// if (error.code === 'auth/email-already-in-use') {
//   console.log('That email address is already in use!');
// }

// if (error.code === 'auth/invalid-email') {
//   console.log('That email address is invalid!');
// }

//         console.log(error.message);
//       });
//   }
//   _handleLogin() {
//     auth()
//       .signInWithEmailAndPassword('sss.iip@gmail.com', 'SuperSecretPassword!')
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }
//   _handleLogout() {
//     auth()
//       .signOut()
//       .then((r) => {
//         this.setState({
//           users: null,
//         });
//       });
//   }
//   render() {
//     if (this.state.initializing) {
//       return (
//         <View>
//           <Text>Login</Text>
//         </View>
//       );
//     }
//     if (!this.state.users) {
//       return (
//         <View>
//           <Text>welcome</Text>
//           <Button title="firebase auth" onPress={() => this._firebaseAuth()} />
//           <Button title="login" onPress={() => this._handleLogin()} />
//         </View>
//       );
//     }
//     return (
//       <View>
//         <Text>{JSON.stringify(this.state.users.uid)}</Text>
//         <Button
//           title="text"
//           onPress={() => {
//             onFacebookButtonPress().then((res) => {
//               console.log(res);
//             });
//           }}
//         />
//         <Button title="test" onPress={() => this._testingDb()} />
//         <Button title="logoutr" onPress={() => this._handleLogout()} />
//       </View>
//     );
//   }
// }

// export default App;
