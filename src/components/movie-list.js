import React, {Component} from 'react';
import {FlatList, Text} from 'react-native';
import MoviePreview from './movie-preview';

export default class MoviesList extends Component {
  render() {
    const {refreshing} = this.props;
    return (
      <FlatList
        data={this.props.movies}
        horizontal={this.props.isHorizontal || false}
        onEndReached={this.props.onEndReached || null}
        refreshing={refreshing}
        onEndReachedThreshold={0.01}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MoviePreview navigation={this.props.navigation} movie={item}/>}
        ListEmptyComponent={<Text>{refreshing ? 'Please wait' : 'There are no movies for your request'}</Text>}
      />
    );
  }
}