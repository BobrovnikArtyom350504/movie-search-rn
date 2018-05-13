import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class CompanyView extends Component {
  render() {
    const {company} = this.props;
    const logoPath =  company.logo_path;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {!logoPath ? null : <Image style={styles.image}
                                     source={{uri: 'https://image.tmdb.org/t/p/w185' + logoPath}} />}
          <Text style={[styles.text, styles.title]}>{company.name}</Text>
        </View>
        {company.headquarters ? <Text style={styles.text}>{'Headquarters: ' + company.headquarters}</Text> : null}
        {company.origin_country ? <Text style={styles.text}>{'Country: ' + company.origin_country}</Text> : null}
        {company.description ? <Text style={[styles.text, styles.biography]}>{company.description}</Text> : null}
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