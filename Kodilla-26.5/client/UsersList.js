import React from 'react';

import styles from './UsersList.scss';

const UsersList = props => (
  <div className={styles.users}>
    <div className={styles.usersOnline}>{props.users.length} people online</div>
    <ul className={styles.usersList}>
      {props.users.map(user => {
        return (
          <li key={user.id} className={styles.userItem}>
            {user.name}
          </li>
        );
      })}
    </ul>
  </div>
);

export default UsersList;
