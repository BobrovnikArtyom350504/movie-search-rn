import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';

export default class Filter extends Component {
  render() {
    return(
      <View>
        <Text>{this.props.label}</Text>
        <Picker selectedValue={this.props.selectedValue || ''}
                onValueChange={this.props.onChange}>
          {this.props.options.map((option, index) => <Picker.Item key={index}
                                                                  label={option.label}
                                                                  value={option.value} />)}
        </Picker>
      </View>
    );
  }
}