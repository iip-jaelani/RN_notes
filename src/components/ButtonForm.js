/* eslint-disable react-native/no-inline-styles */
import React, {Component, PureComponent} from 'react';
import {
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  View,
} from 'react-native';
const {width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface P {
  label: String;
  onPress: () => void;
  backgroundColor: ?'#3498DB' | '#C0392B' | '#1E8449';
  colorLabel: '#fff' | '#aaa' | '#3498DB';
  bold: Boolean;
}

export class ButtonForm extends PureComponent<P> {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.props.onPress}
        style={{
          backgroundColor: this.props.backgroundColor || '#3498DB',
          borderRadius: 3,
          alignItems: 'center',
          height: width * 0.1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: width * 0.035,
            color: this.props.colorLabel || '#fff',
            textTransform: 'capitalize',
            fontWeight: this.props.bold ? 'bold' : 'normal',
          }}>
          {this.props.label || 'label.props'}
        </Text>
      </TouchableOpacity>
    );
  }
}

interface Pi {
  label: String;
  onPress: () => void;
  backgroundColor: ?'#3498DB' | '#C0392B' | '#1E8449';
  colorLabel: '#fff' | '#aaa' | '#3498DB';
  bold: Boolean;
  childIcon: Component;
}

export class ButtonIcon extends PureComponent<Pi> {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.props.onPress}
        style={{
          backgroundColor: this.props.backgroundColor || '#3498DB',
          borderRadius: 3,
          alignItems: 'center',
          height: width * 0.1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: width * 0.05,
        }}>
        {this.props.childIcon}
        <Text
          style={{
            fontSize: width * 0.035,
            color: this.props.colorLabel || '#fff',
            textTransform: 'capitalize',
            fontWeight: this.props.bold ? 'bold' : 'normal',
            textAlign: 'center',
          }}>
          {this.props.label || 'label.props'}
        </Text>
        <View />
      </TouchableOpacity>
    );
  }
}

export default {ButtonForm, ButtonIcon};
