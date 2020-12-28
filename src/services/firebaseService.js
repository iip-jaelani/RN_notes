import {database, auth} from '../config/DbConfig';

//signup users
export const SignUp = (data, uuid) => {
  return new Promise(function (resolve, reject) {
    database()
      .ref(`users/${uuid}`)
      .push(data)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
