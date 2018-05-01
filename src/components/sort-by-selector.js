import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import MovieService from '../services/movie-service';

export default class SortBySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.getOptions(),
      label: 'Release date grater then'
    };
  }

  getOptions() {
    return MovieService.getSortOptions();
  }

  render() {
    return(
      <View>
        <Text>{this.state.label}</Text>
        <Picker selectedValue={this.props.value || ''}
                onValueChange={this.props.onChange}>
          {this.state.options.map((option, index)  => {
            return <Picker.Item key={index} label={option.label} value={option.value}/>;
          })}
        </Picker>
      </View>
    );
  }
}