import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";


import "./App.css";
import store from "./store";

import Landing from "./components/Landing";
import Profile from './components/Profile'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={Profile} />
          </Switch>

        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
