import React from 'react';
import {StackNavigator, TabNavigator, TabBarTop} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';

import MovieListingPage from '../movie-listing-page/movie-listing-page';
import Dashboard from '../dashboard/dashboard';
import SearchPage from '../search-page/search-page';
import MoviePage from '../movie-page/movie-page';
import PersonPage from '../person-page/person-page';
import CompanyPage from '../company-page/company-page';

const stackNavigatorSettings = {headerMode: 'none'};
const baseStackNavigator = {
  MovieList: {screen: MovieListingPage},
  Movie: {screen: MoviePage},
  Person: {screen: PersonPage},
  Company: {screen: CompanyPage}
};
const DashboardStackNavigator = StackNavigator({
  Dashboard: {screen: Dashboard},
  ...baseStackNavigator
}, stackNavigatorSettings);

const ListingStackNavigator = StackNavigator({
  DefaultMovieList: {screen: MovieListingPage},
  ...baseStackNavigator
}, stackNavigatorSettings);

const SearchStackNavigator = StackNavigator({
  SearchPage: {screen: SearchPage},
  ...baseStackNavigator
}, stackNavigatorSettings);


export default TabNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator
    },
    DefaultMovieList: {
      screen: ListingStackNavigator
    },
    SearchPage: {
      screen: SearchStackNavigator
    }
  },
  {
    navigationOptions: ({navigation}) => ({
      header: null,
      tabBarIcon: (selected) => {
        const {routeName} = navigation.state;
        let iconName = null;
        switch (routeName) {
          case 'Dashboard':
            iconName = 'home';
            break;
          case 'DefaultMovieList':
            iconName = 'list';
            break;
          case 'SearchPage':
            iconName = 'search';
            break;
          default:
            iconName = '';
        }
        return <MaterialIcons name={iconName} size={25} color={ selected ? '#fff' : '#90A4AE'} />;
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#607D8B'
      }
    },
    initialRouteName: 'Dashboard',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'bottom',
    swipeEnabled: 'true',
    animationEnabled: 'true'
  }
);