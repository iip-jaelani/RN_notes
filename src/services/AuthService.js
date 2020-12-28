import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {database, auth, GoogleSignin} from '../config/DbConfig';

//signup users
export const AuthSingUp = (email, password) => {
  return new Promise(function (resolve, reject) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//signIn users
export const AuthSingIn = (email, password) => {
  return new Promise(function (resolve, reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//signIn users
export const AuthSingOut = () => {
  return new Promise(function (resolve, reject) {
    auth()
      .signOut()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//signIn users
export const AuthResetPassword = (email) => {
  return new Promise(function (resolve, reject) {
    auth()
      .sendPasswordResetEmail(email)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Login with facebook
export const SignInFacebook = () => {
  return new Promise(async function (resolve, reject) {
    LoginManager.setLoginBehavior('native_only');
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      reject({
        error: true,
        message: 'User cancelled the login process',
      });
      return;
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      reject({
        error: true,
        message: 'Something went wrong obtaining access token',
      });
      return;
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    resolve(auth().signInWithCredential(facebookCredential));
    return;
  });
};

//signOut facebook
export const SignOutFacebook = (email, password) => {
  return new Promise(async function (resolve, reject) {
    const result = await LoginManager.logOut();
    resolve(result);
  });
};

//Login with facebook
export const SignInGoogle = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      resolve(auth().signInWithCredential(googleCredential));
    } catch (error) {
      reject({
        error: true,
        message: error.message,
      });
    }
  });
};

//Login with facebook
export const SignOutGoogle = () => {
  return new Promise(async function (resolve, reject) {
    try {
      await GoogleSignin.revokeAccess();
      const signOut = await GoogleSignin.signOut();
      resolve(signOut);
    } catch (error) {
      reject({
        error: true,
        message: error.message,
      });
    }
  });
};
