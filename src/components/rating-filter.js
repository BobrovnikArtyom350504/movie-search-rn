import React, {Component} from 'react';

import Filter from './filter';

export default class RatingFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.getOptions(),
      label: 'Rating grater then'
    };
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
    const {label, options} = this.state;
    const {onChange, selectedValue} = this.props;
    return <Filter label={label}
                   options={options}
                   selectedValue={selectedValue}
                   onChange={onChange}/>;
  }
}