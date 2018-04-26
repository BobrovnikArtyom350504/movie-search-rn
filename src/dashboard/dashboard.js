import React, {Component} from 'react';
import {View} from  'react-native';
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
      <View>
        <MovieList navigation={this.props.navigation}
                   movies={this.state.mostPopularMovies}
                   isHorizontal={true} />
        <MovieList navigation={this.props.navigation}
                   movies={this.state.nowPlayingMovies}
                   isHorizontal={true} />
        <MovieList navigation={this.props.navigation}
                   movies={this.state.upcomingMovies}
                   isHorizontal={true} />
      </View>
    );
  }
}