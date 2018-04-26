import React, {Component} from 'react';
import {TouchableNativeFeedback, View, Text, Image} from 'react-native';
import MovieService from '../services/movie-service';

export default class MovieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credits: {}
    };
  }

  componentDidMount() {
    MovieService.getMovieCredits(this.props.movie.id).then(credits => {
      this.setState({credits: credits});
    });
  }

  render() {
    const {movie} = this.props;

    return (
      <View>
        <Text>{movie.title}</Text>
        <Text>{movie.tagline}</Text>
        <Text>{movie.overview}</Text>
        {this.getGenres(movie)}
        {this.getCountries(movie)}
        {this.getCompanies(movie)}
        {this.getCast()}
        <Text>{movie.vote_average}</Text>
        <Text>{movie.release_date}</Text>
        <Text>{movie.runtime}</Text>
      </View>
    );
  }

  getCast() {
    if (!this.state.credits.cast) {
      return null;
    }

    return this.state.credits.cast.slice(0, 5).map(person => (
      <TouchableNativeFeedback key={person.id}
                               onPress={() => this.props.navigation.navigate('Person', {personId: person.id})}>
        <Text>{person.name}</Text>
      </TouchableNativeFeedback>
    ));
  }

  getGenres(movie) {
    if (!movie.genres) {
      return null;
    }

    return movie.genres.map(genre => (
      <TouchableNativeFeedback key={genre.id}>
        <Text>{genre.name}</Text>
      </TouchableNativeFeedback>
    ));
  }

  getCompanies(movie) {
    if (!movie.production_companies) {
      return null;
    }

    return movie.production_companies.map(company => (
      <TouchableNativeFeedback key={company.id}>
        <View>
          <Text>{company.name}</Text>
        </View>
      </TouchableNativeFeedback>
    ));
  }

  getCountries(movie) {
    if (!movie.production_countries) {
      return null;
    }

    return movie.production_countries.map((country, key) => <Text key={key}>{country.name}</Text>);
  }
}