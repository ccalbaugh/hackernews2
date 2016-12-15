import React, { Component } from 'react';
import './App.css';
import Toggle from './Toggle.js';
import Comment from './Comment.js';

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
        <Search value={query} onChange={this.onSearchChange}>
          Search
        </Search>
        <Table list={list} pattern={query} />
        <SignUpDialog />
        <Toggle />
        <Comment
            date={comment.date}
            text={comment.text}
            author={comment.author} />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>



const Table = ({ list, pattern }) => {
  return (
    <div>
    { list.filter(isSearched(pattern)).map((item) =>
      <div key={item.objectID}>
        <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    )}
    </div>
  )
}



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
