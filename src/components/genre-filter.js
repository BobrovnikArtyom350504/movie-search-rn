import React, {Component} from 'react';

import Filter from './filter';
import MovieService from '../services/movie-service';

export default class GenreFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      label: 'With Genre'
    };

    this.initOptions();
  }

  initOptions() {
     MovieService.getAllMovieGenres().then(genres => {
       this.setState({
         options: Object.keys(genres).map(genreId => ({
           value: genreId,
           label: genres[genreId]
         }))
       });
     });
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