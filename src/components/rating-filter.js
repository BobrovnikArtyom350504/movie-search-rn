import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';

export default class RatingFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.getOptions(),
      label: 'Rating grater then'
    };

    console.log(this.state);
  }

  getOptions() {
    const range = this.getRatingRange();

    return range.map(rating => ({
      label: rating.toString(),
      value: rating.toString()
    }));
  }

  getRatingRange() {
    const lowestRating = 5;
    const highestRating = 10;
    const incriment = 0.5;
    let range = [];
    for (let rating = lowestRating; rating < highestRating; rating += incriment) {
      range.push(rating);
    }

    return range;
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