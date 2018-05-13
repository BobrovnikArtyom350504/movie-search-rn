import React, {Component} from 'react';
import {View, Modal, Button} from 'react-native';
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
    this.onFilterChange = this.onFilterChange.bind(this);
    console.log(this.props.navigation);
    const navigationParams =  this.props.navigation.state.params;
    const preselectedFilters = (navigationParams && navigationParams.filters) ? navigationParams.filters : {};
    this.state = {
      movies: [],
      pageNumber: 1,
      modalVisible: false,
      filters: {
        'sort_by': null,
        'primary_release_date.gte': null,
        'vote_average.gte': null,
        'with_companies': null,
        'with_genres': null,
        ...preselectedFilters
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
        <SortBySelector selectedValue={this.state.filters['sort_by']}
                        onChange={(value) => {onFilterChange('sort_by', value)}} />
        <Button onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                title={'Show Filters'}
                color={'#78909C'}>
        </Button>
        <Modal
          visible={this.state.modalVisible}
          animationType='slide'
          style={styles.modal}>
          <DateFilter selectedValue={this.state.filters['primary_release_date.gte']}
                      style={styles.filter}
                      onChange={(value) => {onFilterChange('primary_release_date.gte', value)}} />
          <GenreFilter selectedValue={this.state.filters['with_genres']}
                       style={styles.filter}
                       onChange={(value) => {onFilterChange('with_genres', value)}} />
          <CompanySelector selectedValue={this.state.filters['with_companies']}
                           style={styles.filter}
                           onChange={(value) => {onFilterChange('with_companies', value)}} />
          <RatingFilter selectedValue={this.state.filters['vote_average.gte']}
                        style={styles.filter}
                        onChange={(value) => {onFilterChange('vote_average.gte', value)}} />
          <Button onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                  title={'Ok'}
                  color={'#78909C'} />
        </Modal>
        <MovieList movies={this.state.movies}
                   refreshing={this.state.refreshing}
                   navigation={this.props.navigation}
                   onEndReached={this.onNextPage}/>
      </View>
    );
  }
}

const styles = {
  modal: {
    padding: 20
  },
  filter: {
    marginBottom: 60
  }
};