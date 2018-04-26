import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

export default class PersonView extends Component {
  render() {
    const {person} = this.props;

    return (
      <View>
        <Text>{person.name}</Text>
      </View>
    );
  }
}