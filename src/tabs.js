import {StackNavigator, TabNavigator, TabBarTop} from 'react-navigation';
import MovieListingPage from './movie-listing-page/movie-listing-page';
import Dashboard from './dashboard/dashboard';
import SearchPage from './search-page/search-page';
import MoviePage from './movie-page/movie-page';
import PersonPage from './person-page/person-page';

let baseApplicationStackNavigator = {
  Movie: {screen: MoviePage},
  Person: {screen: PersonPage}
};
const DashboardStack = StackNavigator({
  Dashboard: {screen: Dashboard},
  ...baseApplicationStackNavigator
});

const ListingStack = StackNavigator({
  MovieList: {screen: MovieListingPage},
  Movie: {screen: MoviePage},
  Person: {screen: PersonPage}
});

const SearchStack = StackNavigator({
  SearchPage: {screen: SearchPage},
  Movie: {screen: MoviePage},
  Person: {screen: PersonPage}
});


export default TabNavigator(
  {
    Dashboard: {
      screen: DashboardStack
    },
    MovieList: {
      screen: ListingStack
    },
    SearchPage: {
      screen: SearchStack
    }
  },
  {
    initialRouteName: 'Dashboard',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'bottom',
    swipeEnabled: 'true',
    animationEnabled: 'true'
  }
);