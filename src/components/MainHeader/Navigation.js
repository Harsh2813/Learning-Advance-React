import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

//we directly used props without prop chain using context API and we passed only IsLoggedIn that's why in place of isLoggedIn we used cxt and we commented .consumer method instead we used useContext API

const Navigation = (props) => {

  const ctx = useContext(AuthContext);
  return (
    /*<AuthContext.Consumer>
      {(ctx) => {
        return (*/
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
    //     );
    //   }}
    // </AuthContext.Consumer> instead of this using consumer and above using ctx which again return child is bit more complext so we are using useContext Hook
  );
};

export default Navigation;
