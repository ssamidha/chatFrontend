import React, { Component } from "react";
import "./register.css";
import { register } from "../services/userServices";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Register extends Component {
  constructor(props) {
    super(props);

    // set initial  states of the variables
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      redirect: false
    };
  }

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: ""
    };

    //validations of the states

    if (this.state.firstName.length < 4) {
      isError = true;

      errors.firstNameError =
        "First name needs to be atleast 5 characters long";
    }

    if (this.state.lastName.length < 4) {
      isError = true;
      errors.lastNameError = "Last name needs to be atleast 5 characters long";
    }

    if (!this.state.email.includes("@")) {
      isError = true;
      errors.emailError = "Requires valid email";
    }

    if (this.state.password.length < 6 || this.state.password.length > 12) {
      isError = true;

      errors.passwordError =
        "Password length should greater than 6 and less than 12";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    console.log("In validate----->" + this.state);
    return isError;
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      var path = "/";
      this.props.history.push(path);
    }
  };

  handlechange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //this will go to the login page
  handleLoginClick = () => {
    var path = "/";
    this.props.history.push(path);
  };

  handleRegisterSubmit = event => {
    event.preventDefault();
    this.validate();
    const err = this.validate();
    console.log("error in registration", err);

    var registreInfo = {};

    registreInfo.firstName = this.state.firstName;
    registreInfo.lastName = this.state.lastName;
    registreInfo.email = this.state.email;
    registreInfo.password = this.state.password;

    console.log("registreInfo===>", registreInfo);

    register(registreInfo)
      .then(res => {
        console.log("Response in register--> ", res);

        if (res.data.message.success === true) {
          alert(`Registration Successful...!!!`);
          this.setRedirect();
        }
      })
      .catch(err => {
        alert(`email already exist...!!`);
        console.log("error in registration--> ", err);
      });

    if (!err) {
      // clear form
      this.setState({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: ""
      });
    }
  };

//render the data
  render() {
    return (
      <div className="maindiv">
        <div id="register"> Register </div>
        <TextField
          id="firstName"
          label="First Name"
          type="string"
          name="firstName"
          margin="normal"
          variant="outlined"
          value={this.state.firstName}
          onChange={this.handlechange}
        />
        <div style={{ fontSize: 10, color: "red" }}>
          {this.state.firstNameError}
        </div>
        <div>
          <TextField
            id="lastName"
            label="Last Name"
            type="string"
            name="lastName"
            margin="normal"
            variant="outlined"
            value={this.state.lastName}
            onChange={this.handlechange}
          />
        </div>
        <div style={{ fontSize: 10, color: "red" }}>
          {this.state.lastNameError}
        </div>
        <div>
          <TextField
            id="email"
            label="Email Id"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
            value={this.state.email}
            onChange={this.handlechange}
          />
        </div>
        <div style={{ fontSize: 10, color: "red" }}>
          {this.state.emailError}
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={this.state.password}
            onChange={this.handlechange}
          />
        </div>
        <div style={{ fontSize: 10, color: "red" }}>
          {this.state.passwordError}
        </div>
        <div>
          <div>
            {this.renderRedirect()}
            <Button
              id="registerButton"
              variant="contained"
              color="primary"
              onClick={this.handleRegisterSubmit}
            >
              Register
            </Button>
          </div>
          <br></br>
          <div>
            <Button
              id="loginButton"
              variant="contained"
              color="primary"
              onClick={this.handleLoginClick}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
