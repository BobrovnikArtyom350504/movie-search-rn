import React, {Component} from 'react';
import {ScrollView, Text} from  'react-native';

import baseStyles from '../common/styles';
import MovieList from '../components/movie-list';
import MovieService from '../services/movie-service';

export default class Dashboard extends Component {
  componentDidMount() {
    MovieService.getMostPopularMovies().then(movies => {
      this.setState({mostPopularMovies: movies});
    });

    MovieService.getNowPlayingMovies().then(movies => {
      this.setState({nowPlayingMovies: movies});
    });

    MovieService.getUpcomingMovies().then(movies => {
      this.setState({upcomingMovies: movies});
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      mostPopularMovies: [],
      nowPlayingMovies: [],
      upcomingMovies: []
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Most popular</Text>
        <MovieList navigation={this.props.navigation}
                   movies={this.state.mostPopularMovies}
                   isHorizontal={true} />
        <Text style={styles.title}>Now playing</Text>
        <MovieList navigation={this.props.navigation}
                   movies={this.state.nowPlayingMovies}
                   isHorizontal={true} />
        <Text style={styles.title}>Upcoming</Text>
        <MovieList navigation={this.props.navigation}
                   movies={this.state.upcomingMovies}
                   isHorizontal={true} />
      </ScrollView>
    );
  }
}

styles = {
  container: baseStyles.pageContainer,
  title: {
    fontSize: 24,
    backgroundColor: '#CFD8DC',
    color: '#37474F',
    padding: 20
  }
};
