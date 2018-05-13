import React, {Component} from 'react';
import {StyleSheet, TouchableNativeFeedback, View, Text, Image} from 'react-native';

export default class MoviePreview extends Component {
  render() {
    const {movie} = this.props;
    const genres = movie.genres.map(genre => {
      return <Text style={styles.text} key={genre.id}>{genre.name}</Text>
    });

    return (
      <TouchableNativeFeedback onPress={() => {
        this.props.navigation.navigate('Movie', {movieId: movie.id});
      }}>
        <View style={this.props.isHorizontal ? styles.horizontalContainer : styles.container}>
          <Image source={{uri: 'https://image.tmdb.org/t/p/w500_and_h282_face' + movie.backdrop_path}}
                 style={this.props.isHorizontal ? styles.horizontalImage : styles.image} />
          <View style={styles.info}>
            <Text style={[styles.text, styles.title]}>{movie.title}</Text>
            <Text style={styles.text}>{'Rating: ' + movie.vote_average}</Text>
            <View>
              {genres}
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ECEFF1'
  },
  horizontalContainer: {
    padding: 10,
    backgroundColor: '#ECEFF1',
    flexDirection: 'row'
  },
  image: {
    height: 200
  },
  horizontalImage: {
    width: 120
  },
  info: {
    backgroundColor: '#CFD8DC',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 12,
    color: '#263238',
    marginBottom: 5
  },
  title: {
    fontSize: 15
  }
});
