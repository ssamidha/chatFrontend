//forgetpassword

import React, { Component } from "react";
import { forgetpassword } from "../services/userServices";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      redirect: false
    };
  }

  validate = () => {
    let isError = false;

    const errors = {
      emailError: ""
    };

    if (!this.state.email.includes("@")) {
      isError = true;
      errors.emailError = "Requires valid email";
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

    var forgetData = {};
    forgetData.email = this.state.email;

    console.log("forget data===> ", forgetData);

    forgetpassword(forgetData)
      .then(res => {
        console.log("response in forget password--> ", res);
  
        if (res.data.success === true){
          alert(`Link has been sent to your email id to reset the password..`);
          this.setRedirect();
        }
          else
           alert("Entered EmailId is not in database.....Please Register first");
        //     this.setRedirect();
      })
      .catch(err => {
       alert(`Entered EmailId is not in database.....Please Register first`);
        console.log("error in forget password--> ", err);
      });

    if (!err) {
      // clear form
      this.setState({
        email: "",
        emailError: ""
      });
    }
  };

  render() {
    return (
      <div className="maindiv">
        <div id="login"> Forget Password </div>
        <div>
          <TextField
            id="email"
            label="Email Id"
            type="email"
            name="email"
            value={this.state.email}
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={this.handlechangeall}
          />
        </div>
        <div style={{ fontSize: 12, color: "red" }}>
          {this.state.emailError}
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

export default ForgetPassword;
