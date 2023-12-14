import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
//Instead of using Authcontext.provider in App.js we made a separate component aut-context and there made a AuthContextProvider compo which return the .provider and inside tha we use children prop which is now our app.js which we wrapped it here so that we can use our context provider instead of props everywhere