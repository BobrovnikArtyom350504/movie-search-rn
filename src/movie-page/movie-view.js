import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableNativeFeedback, View, Text, ImageBackground} from 'react-native';

import baseStyles from '../common/styles';
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
      <ScrollView style={styles.container}>
        <ImageBackground source={{uri: 'https://image.tmdb.org/t/p/w500_and_h282_face' + movie.backdrop_path}}
                         style={styles.image}>
          <Text style={styles.title}>{movie.title ? movie.title.toUpperCase() : ''}</Text>
        </ImageBackground>
        <View style={styles.info}>
          <Text style={[styles.text, styles.tagLine]}>{movie.tagline}</Text>
          <Text style={styles.text}>{movie.overview}</Text>
          <Text style={styles.text}>{'Release date: ' + movie.release_date}</Text>
          <Text style={styles.text}>{'Rating: ' + movie.vote_average}</Text>
          <Text style={styles.text}>{'Run time: ' + movie.runtime}</Text>
          <Text style={styles.text}>{'Countries: '}</Text>
          <View style={styles.list}>
            {this.getCountries(movie)}
          </View>
          <Text style={styles.text}>{'Genres: '}</Text>
          <View style={styles.list}>
            {this.getGenres(movie)}
          </View>
          <Text style={styles.text}>{'Companies: '}</Text>
          <View style={styles.list}>
            {this.getCompanies(movie)}
          </View>
          <Text style={styles.text}>{'Cast: '}</Text>
          <View style={styles.list}>
            {this.getCast()}
          </View>
        </View>
      </ScrollView>
    );
  }

  getCast() {
    if (!this.state.credits.cast) {
      return null;
    }

    return this.state.credits.cast.slice(0, 5).map(person => (
      <TouchableNativeFeedback key={person.id}
                               onPress={() => this.props.navigation.navigate('Person', {personId: person.id})}>
        <Text style={styles.listItem}>{person.name}</Text>
      </TouchableNativeFeedback>
    ));
  }

  getGenres(movie) {
    if (!movie.genres) {
      return null;
    }

    return movie.genres.map(genre => (
      <TouchableNativeFeedback key={genre.id}
                               onPress={() => {
                                 this.props.navigation.navigate('MovieList', {
                                   filters: {
                                     with_genres: genre.id
                                   }
                                 });
                               }}>
        <Text style={styles.listItem}>{genre.name}</Text>
      </TouchableNativeFeedback>
    ));
  }

  getCompanies(movie) {
    if (!movie.production_companies) {
      return null;
    }

    return movie.production_companies.map(company => (
      <TouchableNativeFeedback key={company.id}
                               onPress={() => {
                                 this.props.navigation.navigate('MovieList', {
                                   filters: {
                                     with_companies: company.id
                                   }
                                 });
                               }}>
        <Text style={styles.listItem}>{company.name}</Text>
      </TouchableNativeFeedback>
    ));
  }

  getCountries(movie) {
    if (!movie.production_countries) {
      return null;
    }

    return movie.production_countries.map((country, key) => <Text style={[styles.text, styles.listItem]}
                                                                  key={key}>{country.name}</Text>);
  }
}

const styles = StyleSheet.create({
  container: baseStyles.pageContainer,
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    flexDirection: 'row'
  },
  info: {
    padding: 10
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  listItem: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 10,
    color: '#263238',
    backgroundColor: '#CFD8DC',
    borderRadius: 3,
    marginBottom: 10,
    marginHorizontal: 5,
    textAlign: 'center'
  },
  title: {
    flex: 1,
    alignSelf: 'flex-end',
    paddingVertical: 30,
    paddingHorizontal: 15,
    fontSize: 20,
    fontFamily: 'Roboto',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    color: '#263238'
  },
  tagLine: {
    fontSize: 18
  },
  text: baseStyles.text
});