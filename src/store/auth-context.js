import React, { useState, useEffect } from "react";

//We used context API so that our isLoggedIn porp we can use anywhere in our whole react app without passing everytime props becuase of context API props chain se chhutkara mil gya

const AuthContext = React.createContext({
  //We are passing this AuthContext everywhere in useContext
  isLoggedIn: false, //this we provided default value so dont need to pass context.provider but it is bad practice
  onLogout: () => {}, // it is the main default context app which provides default object so our vsCode IDE looking here only for the default objects or values so suppose if we don't pass here onLogout object so IDE will not autosuggest this onLogout word because IDE yahi dekhta aur present ni hota to samjhta h hi ni isiliye pass kiye
  onLogin: () => {}, //we passed these three property as value in .provider below
});

//Now we will opmitimize our App.js and do work here by making a component AuthContextProvider and it also exported in addition with default AuthCotext and it returns Authcontext.provider cotext API and inside that all content or tags or code of our porps using children props

export const AuthContextProvider = (props) => {
  //we returned Authcontext.provider in this compo and we used this compo as wrapper in index.js for app.js by using children prop so that our app.js can be clean

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedinInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedinInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  /**we taken object from Authcontext and using value prop to pass all objects and by using useState we can change this values and taken logoutHandler fn in onLogout to pass*/
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
