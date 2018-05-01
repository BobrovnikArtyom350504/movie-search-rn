import React, {Component} from 'react';
import {View, Modal, TouchableHighlight, Text} from 'react-native';
import MovieService from '../services/movie-service';
import MovieList from '../components/movie-list';
import DateFilter from  '../components/date-filter';
import GenreFilter from '../components/genre-filter';
import CompanySelector from '../components/company-selector';
import RatingFilter from '../components/rating-filter';
import SortBySelector from '../components/sort-by-selector';

export default class MovieListingPage extends Component {
  constructor(props) {
    super(props);
    this.onNextPage = this.onNextPage.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this)
    this.state = {
      movies: [],
      pageNumber: 1,
      modalVisible: false,
      filters: {
        'sort_by': null,
        'release_date.gte': null,
        'vote_average.gte': null,
        'with_companies': null,
        'with_genres': null,
      },
      refreshing: true
    };
  }

  discoverMovies(page = this.state.pageNumber, filters = this.state.filters) {
    return MovieService.discoverMovies(filters, page);
  }

  componentDidMount() {
    this.discoverMovies().then(response => {
      this.setState({
        movies: response.results,
        refreshing: false
      });
    });
  }

  onFilterChange(filterName, value) {
    this.setState({refreshing: true});

    const selectedFilters = Object.assign({}, this.state.filters, {[filterName]: value});
    const pageNumber = 1;
    this.setState({
      filters: selectedFilters,
      pageNumber
    });
    this.discoverMovies(pageNumber, selectedFilters).then(response => {
      this.setState({
        movies: response.results,
        refreshing: false
      })
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const onFilterChange = this.onFilterChange;
    return (
      <View>
        <SortBySelector value={this.state.filters['sort_by']} 
                      onChange={(value) => {onFilterChange('sort_by', value)}} />
       <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Show Filteers</Text>
        </TouchableHighlight>
        <Modal
          visible={this.state.modalVisible}
          animationType='slide'>
          <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
          </TouchableHighlight>
          <DateFilter value={this.state.filters['release_date.gte']} 
                      onChange={(value) => {onFilterChange('release_date.gte', value)}} />
          <GenreFilter value={this.state.filters['with_genres']} 
                      onChange={(value) => {onFilterChange('with_genres', value)}} />

          <CompanySelector selectedValue={this.state.filters['with_companies']}
                            onChange={(value) => {onFilterChange('with_companies', value)}} />
          <RatingFilter selectedValue={this.state.filters['vote_average.gte']}
                            onChange={(value) => {onFilterChange('vote_average.gte', value)}} />
        </Modal>
         <MovieList movies={this.state.movies}
                   refreshing={this.state.refreshing}
                   navigation={this.props.navigation}
                   onEndReached={this.onNextPage}/>
      </View>
    );
  }
}