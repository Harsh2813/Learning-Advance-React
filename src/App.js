import React, {useContext} from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {

  const ctx = useContext(AuthContext);// we taken isLoggedIn and onLogin and onLogout fn from auth-context compo
  
  return (
    <React.Fragment>
      <MainHeader /*isAuthenticated={isLoggedIn} (now we don't need to pass isLoggedIn like this because of we provided this by context API to whole App.js by wrapping every component in it and same we did for onLogout we passed whole logoutHandler fn) onLogout={logoutHandler}*/
      />
      <main>
        {
          !ctx.isLoggedIn && (<Login />) /*agar isLogged in false rha to Login page me honge, we passed all props in Login and Home compo using useContext that's why we dont passed normal props here*/
        }
        {
          ctx.isLoggedIn && (<Home/>) /*aur true raha to Homepage me honge jaha logout ka option show ho rha hoga aur login page me login ka option */
        }
      </main>
    </React.Fragment>
  );
}

export default App;
