import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import DateHelper from '../services/date-helper';

export default class DateFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.getOptions(),
      label: 'Release date grater then'
    };
  }

  getOptions() {
    const range = this.getYearsRange();
    const dateFormat = 'yyyymmdd';

    return range.map(year => ({
      label: year.toString(),
      value: DateHelper.formatDate(DateHelper.getFirstDayOfTheYear(year), dateFormat)
    }));
  }

  getYearsRange() {
    const lowestReleaseYear = 1980;
    const highestReleaseYear = new Date().getFullYear();
    let range = [];
    for (let year = lowestReleaseYear; year < highestReleaseYear; year++) {
      range.push(year);
    }

    return range;
  }

  render() {
    return(
      <View>
        <Text>{this.state.label}</Text>
        <Picker selectedValue={this.props.value || this.state.options[0].value}
                onValueChange={this.props.onChange}>
          {this.state.options.map((option, index)  => {
            return <Picker.Item key={index} label={option.label} value={option.value}/>;
          })}
        </Picker>
      </View>
    );
  }
}