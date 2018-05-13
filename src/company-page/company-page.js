import React, {Component} from 'react';
import MovieService from '../services/movie-service';
import CompanyView from './company-view';

export default class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        id: this.props.navigation.state.params.companyId
      }
    };
  }

  componentDidMount() {
    MovieService.getCompany(this.state.company.id).then(company => {
      this.setState(prevState => Object.assign(prevState.company, company));
    });
  }
  
  render() {
    return <CompanyView company={this.state.company}/>;
  }
}