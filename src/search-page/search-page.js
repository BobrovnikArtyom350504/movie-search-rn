import React, {Component} from 'react';
import {View, Button, TextInput} from 'react-native';
import MovieService from '../services/movie-service';
import MovieList from '../components/movie-list';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.onNextPage = this.onNextPage.bind(this);
    this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
    this.state = {
      searchQuery: '',
      pageNumber: 1,
      movies: [],
      refreshing: true

    };
  }

  getMovies(pageNumber = this.state.pageNumber) {
    return MovieService.searchMovies(this.state.searchQuery, pageNumber);
  }

  componentDidMount() {
    this.getMovies().then(response => {
      console.log(response);
      if (response) {
        this.setState({
          movies: response.results
        });
      } else {
        this.setState({
          movies: []
        });
      }
      this.setState({
        refreshing: false
      });
    });
  }

  onSearchButtonPress() {
    const pageNumber = 1;
    this.setState({
      refreshing: false
    });
    this.getMovies(pageNumber).then(response => {
      if (response) {
        this.setState({
          movies: response.results
        });
      } else {
        this.setState({
          movies: []
        });
      }
      this.setState({
        pageNumber: pageNumber,
        refreshing: false
      });
    });
  }

  onNextPage() {
    if (this.state.refreshing || !this.state.movies.length) {
      return false;
    }
    this.setState({
      refreshing: false
    });
    const nextPage = this.state.pageNumber + 1;
    this.getMovies(nextPage).then(response => {
      this.setState(prevState => ({
        movies: prevState.movies.concat(response.results),
        pageNumber: nextPage,
        refreshing: true
      }));
    });
  }

  render() {
    return (
      <View>
        <View style={{paddingTop: 50}}>
          <TextInput placeholder={'Search: '}
                     onChangeText={text => {
                       this.setState({searchQuery: text})
                     }}/>
          <Button onPress={this.onSearchButtonPress}
                  title={'Search'}/>
        </View>
        <MovieList movies={this.state.movies}
                   refreshing={this.state.refreshing}
                   navigation={this.props.navigation}
                   onEndReached={this.onNextPage}/>
      </View>
    );
  }
}