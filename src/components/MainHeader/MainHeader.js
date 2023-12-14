import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation /*isLoggedIn={props.isAuthenticated} (MainHeader me App.js se props ni liye isLogged in waha contextAPI use kiye to yha bhi AuthContext provide karega isLogged In but basically yha hme isLogged in ki need ni h hm bs yha navigation ko pass krne ke liye isLoggedIn prop le rhe the to navigatin me direct use kr lenge context API ke through without props chain and same for logOut) onLogout={props.onLogout}*/ />
    </header>
  );
};

export default MainHeader;
