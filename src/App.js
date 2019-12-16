import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./App.css";


import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";

export const PrivateRoute = ({ components: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("LoginToken") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route path="/resetpassword/:token"render={(props) => <ResetPassword {...props} />}/>
            <Route path="/dashboard" component={Dashboard}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
