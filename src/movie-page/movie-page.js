import React, {Component} from 'react';
import MovieService from '../services/movie-service';
import MovieView from './movie-view';

export default class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: this.props.navigation.state.params.movieId
      }
    };
  }

  componentDidMount() {
    MovieService.getMovie(this.state.movie.id).then(movie => {
      this.setState(prevState => Object.assign(prevState.movie, movie));
    });
  }
  
  render() {
    return <MovieView movie={this.state.movie}
                      navigation={this.props.navigation}/>;
  }
}