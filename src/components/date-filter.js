import React, {Component} from 'react';

import Filter from  './filter';
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
    for (let year = lowestReleaseYear; year <= highestReleaseYear; year++) {
      range.push(year);
    }

    return range;
  }

  render() {
    const {label, options} = this.state;
    const {onChange, selectedValue} = this.props;
    return <Filter label={label}
              options={options}
              selectedValue={selectedValue}
              onChange={onChange} />;
  }
}