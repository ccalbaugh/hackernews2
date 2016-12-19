import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const isSearched = (query) => (item) => !query ||
            item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            item.author.toLowerCase().indexOf(query.toLowerCase()) !== -1;

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      query: DEFAULT_QUERY,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopstories(result) {
    this.setState({ result });
  }

  fetchSearchTopstories() {
    console.log(this.state);
    fetch(`${PATH_BASE}${PATH_SEARCH}?{PARAM_SEARCH}${query}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const { query } = this.state;
    this.fetchSearchTopstories(query);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value });
  }

  onSearchSubmit() {
    const { query } = this.state;
    this.fetchSearchTopstories(query);
  }

  render() {
    const { query, result } = this.state;
    return (
      <div className="page">
          <div className="interactions">
            <Search value={query} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
              Search
            </Search>
            { result ? <Table value={result.hits} pattern={query} /> : null }
          </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) =>
    <form onSubmit={onSubmit}>
      {children} <input type="text" value={value} onChange={onChange} />
      <button type="submit">{children}</button>
    </form>


const largeColumn = {
  width: '40%'
};

const midColumn = {
  width: '30%'
};

const smallColumn = {
  width: '15%'
};


const Table = ({ list, pattern }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map((item) =>
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>
          {item.author}
        </span>
        <span style={smallColumn}>
          {item.num_comments}
        </span>
        <span style={smallColumn}>
          {item.points}
        </span>
      </div>
    )}
  </div>



const Dialog = ({ title, message, children }) => {
  return (
    <div className="Dialog">
      <h1 className="Dialog-title">
        {title}
      </h1>
      <p className="Dialog-message">
        {message}
      </p>
      {children}
    </div>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return(
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

export default App;
