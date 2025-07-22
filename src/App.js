import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  render() {
    const { darkMode } = this.state;
    return (
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Router>
          <Navbar toggleDarkMode={this.toggleDarkMode} darkMode={darkMode} />
          <Switch>
            <Route exact path="/">
              <News
                key="general"
                pageSize={this.pageSize}
                country="us"
                category="general"
                darkMode={darkMode}
              />
            </Route>
            <Route exact path="/business">
              <News
                key="business"
                pageSize={this.pageSize}
                country="us"
                category="business"
                darkMode={darkMode}
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                key="entertainment"
                pageSize={this.pageSize}
                country="us"
                category="entertainment"
                darkMode={darkMode}
              />
            </Route>
            <Route exact path="/general">
              <News
                key="general"
                pageSize={this.pageSize}
                country="us"
                category="general"
                darkMode={darkMode}
              />
            </Route>
            <Route exact path="/health">
              <News
                key="health"
                pageSize={this.pageSize}
                country="us"
                category="health"
                darkMode={darkMode}
              />
            </Route>
            <Route exact path="/science">
              <News
                key="science"
                pageSize={this.pageSize}
                country="us"
                category="science"
                darkMode={darkMode}
              />
            </Route>
            <Route exact path="/sports">
              <News
                key="sports"
                pageSize={this.pageSize}
                country="us"
                category="sports"
                darkMode={darkMode}
              />
            </Route>
            <Route exact path="/technology">
              <News
                key="technology"
                pageSize={this.pageSize}
                country="us"
                category="technology"
                darkMode={darkMode}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
