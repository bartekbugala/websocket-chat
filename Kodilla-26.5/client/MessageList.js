import React from 'react';
import styles from './MessageList.scss';

const Message = props => {
  let style = styles.Message + ' ';
  let addClass = '';
  if(props.myUsername === props.from) {
    addClass = styles.ThisUserMessage
  }
  if (props.from === 'System') {
    style += styles.SystemMessage;
  } else if (props.from === 'Server message') {
    style += styles.ServerMessage;
  }
  return (
    <div className={styles.SingleMessage+' '+ addClass}>
      <strong>{props.from}: </strong>
      <span>{props.text}</span>
    </div>
  );
};

const MessageList = props => (
  
  <div className={styles.MessageList}>
    <div className={styles.MessageWrapper}>
      {props.messages.map((message, i) => {
        return <Message key={i} from={message.from} text={message.text} myUsername={props.userName} />;
      })}
    </div>
  </div>
);

export default MessageList;
