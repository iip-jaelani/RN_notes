/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Dimensions, Text, TextInput, View} from 'react-native';
const {width} = Dimensions.get('window');

interface P {
  placeholder: String;
  onChangeText: () => void;
  secureTextEntry: Boolean;
}
export class TextForm extends PureComponent<P> {
  render() {
    return (
      <TextInput
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder || 'props.placeholder'}
        secureTextEntry={this.props.secureTextEntry}
        style={{
          height: width * 0.1,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: '#aaa',
          paddingHorizontal: width * 0.03,
          fontSize: width * 0.035,
        }}
      />
    );
  }
}

export default TextForm;
