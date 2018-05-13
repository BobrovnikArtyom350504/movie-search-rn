import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';

export default class CompanyFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: 'With Company'
    };
  }

  render() {
    return(
      <View>
        <Text>{this.state.label}</Text>
        <Picker selectedValue={this.props.selectedValue || ''}
                onValueChange={this.props.onChange}
                style={styles.picker}>
          {this.props.options.map((option, index)  => {
            return <Picker.Item key={index} label={option.label} value={option.value}/>;
          })}
        </Picker>
      </View>
    );
  }
}

const styles = {
  picker: {
    height: 30,
    color: '#78909C'
  },
};