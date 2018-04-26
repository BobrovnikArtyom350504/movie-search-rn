import React, {Component} from 'react';

export class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [
        {
          id: 'with_genres',
          name: 'genre'
        },
        {
          id: 'release_date.gte',
          name: 'release after'
        },
        {
          id: 'release_date.lte',
          name: 'release before'
        },
        {

        }
      ]
    }
  }
}