import React, { Component } from "react";
import "./Dashboard.css";
import { getAllUser, getAllMessages } from "../services/userServices";
import socketApi from "../components/socketApi";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArray: [],
      messageArray: [],
      redirect: false,
      msg: ""
    };
  }

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

  componentDidMount() {
    socketApi.socketCon();

    this.getUser();
    // this.getUserMessages();

    //================================================================
  }

  getUser() {
    getAllUser().then(res => {
      var users = res.data.data;
      let result = users.filter(element => {
        return element._id !== sessionStorage.getItem("senderId");
      });
      //   users.filter(sessionStorage.getItem('senderId'))

      this.setState({ userArray: result });
    });
  }

  person = key => {
    console.log("on click", key);
    sessionStorage.setItem("receiverName", key.firstName);
    sessionStorage.setItem("receiverLastName", key.lastName);
    sessionStorage.setItem("receiverid", key._id);
    sessionStorage.setItem("receiveremail", key.email);
    this.getUserMessages();
  };

  getUserMessages() {
    getAllMessages()
      .then(res => {
        // console.log("all messges", res.data.data);
        var messages = res.data.data;
        console.log(" user messages", messages);
        this.setState({ messageArray: messages });
      })

      .catch(err => {
        console.log(" error ", err);
      });
  }

  handlechangeall = event => {
    // console.log("value in handle change", event.currentTarget.value);

    this.setState({ msg: event.currentTarget.value }, () => {
      // console.log("value after set state in handlechange", this.state.msg);
    });
  };

  sendClick(event) {
    event.preventDefault();

    let sendObject = {
      senderID: sessionStorage.getItem("senderId"),

      receiverID: sessionStorage.getItem("receiverid"),

      message: this.state.msg
    };

    // console.log("sendObject------->" + JSON.stringify(sendObject));

    socketApi.Emitfun(sendObject, (err, data) => {
      console.log("data in sendObjec", data);
      this.getUserMessages();
      if (data) {
        // console.log("result is back...", result,this.resultArray.length);
        let resultArray = this.state.messageArray;
        var senderID = sessionStorage.getItem("senderId");
        console.log(data.receiverID === senderID);
        if (data.receiverID === senderID) {
          resultArray.push(data);
          this.setState({
            messages: resultArray
          });
        }
      } else {
        console.log("Error in received message--->", err);
      }
    });

   

    // To Make input field clear after sending message
    this.setState({ msg: "" });
  }

  logOutClick() {
    sessionStorage.clear();
    this.setRedirect();
  }

  render() {
    const printuser = this.state.userArray.map((key, index) => {
      return (
        <div key={index} onClick={() => this.person(key)}>
          {key.firstName}
        </div>
      );
    });
    // console.log(printuser);
    // const Messages = this.state.messageArray.map((msg, index) => {
    //   return <div key={index}>{msg.message}</div>;
    // });

    // console.log(printuser);
    const Messages1 = this.state.messageArray.map((msg, index) => {
      return (
        <div key={index}>
          {msg.senderID === sessionStorage.getItem("senderId") ? (
            <div className="senderMessage">{msg.message}</div>
          ) : msg.senderID === sessionStorage.getItem("receiverid") ? (
            <div className="receiverMessage">{msg.message}</div>
          ) : null}
          {/* {msg.receiverID===sessionStorage.getItem('receiveri0d')? (
            <div className="receiverMessage">{msg.message}</div>
          ) : null} */}
        </div>
      );
    });

    return (
      <div className="mainchatdiv">
        <div id="appBar">
          <p className="p">Chat Application</p>
          {this.renderRedirect()}
          <button className="LogOutButton" onClick={() => this.logOutClick()}>
            Log Out
          </button>
        </div>
        <div className="chatApp">
          <div className="list-username">
            <div className="users">Username</div>
            <div className="List">
              List
              {printuser}
            </div>
          </div>
          <div className="chat-box-width">
            <div className="ChatBox">
              {/* chat box */}
              {Messages1}
            </div>

            <div className="inputStyle">
              <input
                className="input"
                placeholder="type here"
                value={this.state.msg}
                onChange={event => {
                  this.handlechangeall(event);
                }}
                name="msg"
              ></input>

              <button
                className="sendButton"
                onClick={event => {
                  this.sendClick(event);
                }}
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
