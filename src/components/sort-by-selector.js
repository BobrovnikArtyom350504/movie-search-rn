import React, {Component} from 'react';

import Filter from './filter';
import MovieService from '../services/movie-service';

export default class SortBySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.getOptions(),
      label: 'Sort By'
    };
  }

  getOptions() {
    return MovieService.getSortOptions();
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