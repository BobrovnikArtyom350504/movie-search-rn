import React, {Component} from 'react';
import MovieService from '../services/movie-service';
import PersonView from './person-view';

export default class PersonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        id: this.props.navigation.state.params.personId
      }
    };
  }

  componentDidMount() {
    MovieService.getPerson(this.state.person.id).then(person => {
      this.setState(prevState => Object.assign(prevState.person, person));
    });
  }
  
  render() {
    return <PersonView person={this.state.person}/>;
  }
}