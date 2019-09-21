import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

import styles from './App.scss';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      text: '',
      name: '',
    };
  }
  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({ users }) => this.chatUpdate(users));
  }
  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
  }
  chatUpdate(users) {
    this.setState({ users });
  }
  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
    socket.emit('message', message);
  }
  handleUserSubmit(name) {
    socket.emit('join', name);
    socket.on('updateName', user => this.setState({ name: user.name }));
  }

  render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }

  renderLayout() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <div className={styles.appTitle}>ChatApp</div>
          <div className={styles.appRoom}>App room</div>
        </div>
        <div className={styles.appBody}>
          <UsersList users={this.state.users} />
          <div className={styles.messageWrapper}>
            <MessageList messages={this.state.messages} userName={this.state.name}/>
            <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)} name={this.state.name} />
          </div>
        </div>
      </div>
    );
  }

  renderUserForm() {
    return <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />;
  }
}

export default hot(module)(App);
