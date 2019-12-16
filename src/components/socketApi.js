import socketIO from "socket.io-client";

let socket;

class APIFunc {
  socketCon() {
    console.log("inside socket connection...");

    socket = socketIO("http://localhost:7000");
  }

  Emitfun(sendObject) {
    console.log("Emitted object" + JSON.stringify(sendObject));

    socket.emit("newMsg", sendObject);
  }

  receivedMsg(callback) {
    socket.on("chat message", data => {
      return callback(null, data);
    });
  }
}

export default new APIFunc();
