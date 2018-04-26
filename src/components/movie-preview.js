import React, {Component} from 'react';
import {TouchableNativeFeedback, View, Text, Image} from 'react-native';

export default class MoviePreview extends Component {
  render() {
    const {movie} = this.props;
    const genres = movie.genres.map(genre => {
      return <Text key={genre.id}>{genre.name}</Text>
    });

    return (
      <TouchableNativeFeedback onPress={() => {
        this.props.navigation.navigate('Movie', {movieId: movie.id});
      }}>
        <View>
          <Text>{movie.title}</Text>
          <Text>{movie.vote_average}</Text>
          {genres}
          <Image source={{uri: 'https://image.tmdb.org/t/p/w500_and_h282_face' + movie.backdrop_path}}
                 style={{flex: 1}} />
        </View>
      </TouchableNativeFeedback>
    );
  }
}