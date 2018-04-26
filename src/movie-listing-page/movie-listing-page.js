import React, {Component} from 'react';
import {View} from 'react-native';
import MovieService from '../services/movie-service';
import MovieList from '../components/movie-list';
import DateFilter from  '../components/date-filter';

export default class MovieListingPage extends Component {
  constructor(props) {
    super(props);
    this.onNextPage = this.onNextPage.bind(this);
    this.state = {
      movies: [],
      pageNumber: 1,
      filters: {
        'release_date.gte': null,
        'vote_average.gte': null,
        'with_companies': null,
        'with_genres': null,
      },
      refreshing: true
    };
  }

  discoverMovies(page = this.state.pageNumber) {
    return MovieService.discoverMovies({}, page);
  }

  componentDidMount() {
    this.discoverMovies().then(response => {
      this.setState({
        movies: response.results,
        refreshing: false
      });
    });
  }

  onNextPage() {
    const nextPageNumber = this.state.pageNumber + 1;
    this.setState({refreshing: true});
    this.discoverMovies(nextPageNumber).then(response => {
      this.setState(prevState => ({
          movies: prevState.movies.concat(response.results),
          pageNumber: nextPageNumber,
          refreshing: false
        })
      );
    });
  }

  render() {
    return (<View>
      <View>

        <DateFilter value={this.state.filters['release_date.gte']}
                    onChange={value => {
                      this.setState({
                        filters: {
                          'release_date.gte': value
                        }
                      });
                      console.log(value);
                    }}/>
      </View>

    </View>);
  }
}