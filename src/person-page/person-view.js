import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class PersonView extends Component {
  render() {
    const {person} = this.props;
    console.log(person);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image}
                 source={{uri: 'https://image.tmdb.org/t/p/w185' + person.profile_path}}/>
          <Text style={[styles.text, styles.title]}>{person.name}</Text>
        </View>
        {person.birthday ? <Text style={styles.text}>{'Birthday: ' + person.birthday}</Text> : null}
        {person.place_of_birth ? <Text style={styles.text}>{'Place of birth: ' + person.place_of_birth}</Text> : null}
        {person.popularity ? <Text style={styles.text}>{'Popularity: ' + person.popularity}</Text> : null}
        {person.biography ? <Text style={[styles.text, styles.biography]}>{person.biography}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    paddingLeft: 20,
    fontSize: 20
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#546E7A'
  },
  text: {
    fontSize: 12,
    color: '#263238',
    marginBottom: 15
  },
  biography: {
    fontSize: 10
  },
  container: {
    paddingHorizontal: 20
  }
});