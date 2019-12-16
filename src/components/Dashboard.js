import React, { Component } from "react";
import "./Dashboard.css";
import { getAllUser, getAllMessages } from "../services/userServices";
import socketApi from "../components/socketApi";
//import openSocket from "socket.io-client";

// const socket = openSocket("http://localhost:7000");

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

  componentDidUpdate(){
      this.getUserMessages();

  }

  componentDidMount() {
    socketApi.socketCon();

    this.getUser();
    this.getUserMessages();

    //================================================================
    socketApi.receivedMsg((error, result) => {
      if (result) {
        console.log("result is back...", result);

        var resultArray = [];

        resultArray = this.state.Messages;

        resultArray.push(result);

        this.setState({
          messages: resultArray
        });

        console.log(
          "Received Messages are---->",
          JSON.stringify(this.state.Messages)
        );
      } else {
        console.log("Error in received message--->", error);
      }
    });
  }

  getUser() {
    getAllUser().then(res => {
      console.log(" response ", res.data.data);
      var users = res.data.data;
      console.log("users list", users);
      this.setState({ userArray: users });
      console.log("in state", this.state);
    });
  }

  person = key => {
    console.log("on click", key);
    localStorage.setItem("receiverName", key.firstName);
    localStorage.setItem("receiverLastName", key.lastName);
    localStorage.setItem("receiverid", key._id);
    localStorage.setItem("receiveremail", key.email);
    this.getUserMessages();
  };

  getUserMessages() {
    getAllMessages()
      .then(res => {
        console.log("all messges", res.data.data);
        var messages = res.data.data;
        console.log(" user messages", messages);
        this.setState({ messageArray: messages });
        console.log("in message states", this.state);
      })

      .catch(err => {
        console.log(" error ", err);
      });
  }

  handlechangeall = event => {
    console.log("value in handle change", event.currentTarget.value);

    this.setState({ msg: event.currentTarget.value }, () => {
      console.log("value after set state in handlechange", this.state.msg);
    });
  };

  async sendClick(event) {
    event.preventDefault();
    // console.log("Receiver data************"+this.state.ReceiverId+" "+this.state.ReceiverName);
    // console.log(" this state",this.msg);

    let sendObject = await {
      senderID: localStorage.getItem("senderId"),

      receiverID: localStorage.getItem("receiverid"),

      message: this.state.msg
    };

    console.log("sendObject------->" + JSON.stringify(sendObject));

    socketApi.Emitfun(sendObject);
    socketApi.receivedMsg();
    // this.getMessages()
    this.getUserMessages();

    // To Make input field clear after sending message
    this.setState({ msg: "" });
  }

  logOutClick() {
    localStorage.clear();
    this.setRedirect();
  }

  render() {
    const printuser = this.state.userArray.map(key => {
      return <div onClick={() => this.person(key)}>{key.firstName}</div>;
    });
    // console.log(printuser);
    const Messages = this.state.messageArray.map((msg, index) => {
      return <div key={index}>{msg.message}</div>;
    });

    // console.log(printuser);
    const Messages1 = this.state.messageArray.map((msg, index) => {
      return (
        <div>
          {msg.senderID===localStorage.getItem('senderId')? (
            <div className="senderMessage">{msg.message}</div>
          ) : <div className="receiverMessage">{msg.message}</div>}
          {/* {msg.receiverID===localStorage.getItem('receiveri0d')? (
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
