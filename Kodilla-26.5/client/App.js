import React from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

const socket = io('/');

class App extends Comment {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      text: '',
      name: ''
    };
  }

  render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }
}

export default hot(module)(App);
