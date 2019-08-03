import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "mobx-react";

import "./App.scss";

import config from "./utils/config";
import HomePage from "./pages/home/HomePage";
import stores from "./stores";
import { Toast } from "./components/general";

function App() {
  return (
    <Provider {...stores}>
      <Router basename={`/demos/${config.projectName}`}>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Toast />
      </Router>
    </Provider>
  );
}

export default App;
