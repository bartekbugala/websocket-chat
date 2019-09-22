import React, { Component } from 'react';
import styles from './MessageForm.scss';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      from: this.props.name,
      text: this.state.text
    };
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <form className={styles.messageForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.messageInput}
          onChange={e => this.changeHandler(e)}
          value={this.state.text}
          placeholder="Message"
        />
      </form>
    );
  }
}

export default MessageForm;
