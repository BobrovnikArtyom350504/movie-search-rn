import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import MovieService from '../services/movie-service';

export default class GenreFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      label: 'Release date grater then'
    };

    this.initOptions();
  }

  initOptions() {
     MovieService.getAllMovieGenres().then(genres => {
       this.setState({
         options: genres.map(genre => ({
           value: genre.id,
           label: genre.name
         }))
       });
     });
  }

  render() {
    return(
      <View>
        <Text>{this.state.label}</Text>
        <Picker selectedValue={this.props.value || this.state.options[0].value}
                onValueChange={this.props.onChange}>
          {this.state.options.map((option, index)  => {
            return <Picker.Item key={index} label={option.label} value={option.value}/>;
          })}
        </Picker>
      </View>
    );
  }
}