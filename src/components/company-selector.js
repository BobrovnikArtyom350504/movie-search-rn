import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import CompanyFilter from './company-filter';
import MovieService from '../services/movie-service';

export default class ComponySelector extends Component {
  constructor(props) {
  	super(props);

  	this.fetchCompanies = this.fetchCompanies.bind(this);
  	this.state = {
  		query: '',
  		companies: []
  	}; 
  }

  fetchCompanies(query = this.state.query) {
  	MovieService.searchCompanies(query).then(({results}) => {
  		this.setState({
  			companies: results.map(company => ({
  				label: company.name,
  				value: company.id
  			}))
  		});
  	});
  }

  render() {
  	return (
  		<View>
  			<TextInput placeholder={'Company: '}
  					   onChangeText={query => {
  					   	 this.setState({query: query});
  					   	 this.fetchCompanies(query);
                       }}/>
             <CompanyFilter options={this.state.companies} selectedValue={this.props.selectedValue} onChange={this.props.onChange} />
  		</View>
  	);
  }
}