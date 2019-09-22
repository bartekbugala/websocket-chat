import React from 'react';
import styles from './MessageList.scss';

const Message = props => {
  let style = styles.message + ' ';
  let addClass = '';
  if(props.myUsername === props.from) {
    addClass = styles.thisUserMessage
  }
  if (props.from === 'System') {
    style += styles.systemMessage;
  } else if (props.from === 'Server message') {
    style += styles.serverMessage;
  }
  return (
    <div className={styles.singleMessage+' '+ addClass}>
      <strong>{props.from}: </strong>
      <span>{props.text}</span>
    </div>
  );
};

const MessageList = props => (
  
  <div className={styles.messageList}>
    <div className={styles.messageWrapper}>
      {props.messages.map((message, i) => {
        return <Message key={i} from={message.from} text={message.text} myUsername={props.userName} />;
      })}
    </div>
  </div>
);

export default MessageList;
