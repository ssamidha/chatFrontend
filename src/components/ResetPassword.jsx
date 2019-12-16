//resetpassword

import React, { Component } from "react";
import { resetpassword } from "../services/userServices";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordError: "",
      redirect: false
    };
  }

  validate = () => {
    let isError = false;

    const errors = {
      passwordError: ""
    };

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

  handlechangeall = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmitButton = event => {
    event.preventDefault();
    this.validate();
    const err = this.validate();

    var resetData = {};
    resetData.password = this.state.password;

    console.log("reset data--> ", resetData);

    let resetToken = this.props.match.params.token;
    console.log(resetToken);

    resetpassword(resetData, resetToken)
      .then(res => {
        console.log("response in reset password--> ", res);

        alert(`Password has been reseted`);

        this.setRedirect();
      })
      .catch(err => {
        console.log("error in reset--> ", err);
      });

    if (!err) {
      // clear form
      this.setState({
        password: "",
        passwordError: ""
      });
    }
  };

  render() {
    
    return (
      <div className="maindiv">
        <form onSubmit={this.handlesubmit}></form>
        <div id="login"> Reset Password </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={this.handlechangeall}
          />
        </div>
        <div style={{ fontSize: 12, color: "red" }}>
          {this.state.passwordError}
        </div>
        <div>
          {this.renderRedirect()}
          <Button
            id="signinButton"
            variant="contained"
            color="primary"
            onClick={this.handleSubmitButton}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
