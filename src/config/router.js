/* eslint-disable react-native/no-inline-styles */
import React from 'react';
//
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StackScreen, BottomScreen} from '../screens';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => (
  <Tab.Navigator
    barStyle={{
      backgroundColor: '#fff',
    }}
    activeColor="#3498DB"
    inactiveColor="#aaa">
    <Tab.Screen
      name="Home"
      component={BottomScreen.Home}
      options={{
        tabBarIcon: ({color}) => <Entypo name="home" color={color} size={20} />,
      }}
    />
    {/* <Tab.Screen
      name="Sharing"
      component={BottomScreen.Sharing}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="rss-feed" color={color} size={20} />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Profile"
      component={BottomScreen.Profile}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="account" color={color} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Splash} name="Splash" />
    <Stack.Screen component={StackScreen.AddNotes} name="AddNotes" />
    <Stack.Screen component={StackScreen.Login} name="Login" />
    <Stack.Screen
      options={{
        headerShown: true,
        title: null,
        headerStyle: {
          elevation: 0,
        },
      }}
      component={StackScreen.Register}
      name="Register"
    />
    <Stack.Screen
      options={{
        headerShown: true,
        title: null,
        headerStyle: {
          elevation: 0,
        },
      }}
      component={StackScreen.ResetPassword}
      name="ResetPassword"
    />
    <Stack.Screen component={BottomTab} name="BottomNavigator" />
  </Stack.Navigator>
);

export const Router = () => (
  <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
);
