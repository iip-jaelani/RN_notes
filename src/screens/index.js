import AddNotes from './AddNotes';
import Home from './Home';
import Profile from './Profile';
import Sharing from './Sharing';

const {default: Login} = require('./Login');
const {default: Register} = require('./Register');
const {default: ResetPassword} = require('./ResetPassword');

export const StackScreen = {
  Login,
  Register,
  ResetPassword,
  AddNotes,
};

export const BottomScreen = {
  Home,
  Profile,
  Sharing,
};
