import React, { Component } from 'react';
import './App.css';
import Toggle from './Toggle.js';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = (query) => (item) => !query ||
            item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            item.author.toLowerCase().indexOf(query.toLowerCase()) !== -1;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      query: '',
      isToggleOn: true,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const query = this.state.query;
    return (
      <div className="App">
        <form>
          <input type="text"
                 value={query}
                 onChange={this.onSearchChange} />
        </form>
        { this.state.list.filter(isSearched(query)).map((item) =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
        <Toggle />
      </div>
    );
  }
}

export default App;
