import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "mobx-react";

import "./App.scss";

import ComponentsPage from "./pages/components/ComponentsPage";
import HomePage from "./pages/home/HomePage";
import stores from "./stores";

function App() {
  return (
    <Provider {...stores}>
      <Router basename="/demos/react-template">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/components/" component={ComponentsPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
