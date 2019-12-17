import socketIO from "socket.io-client";

let socket;

class APIFunc {
  socketCon() {
    console.log("inside socket connection...");

    socket = socketIO("http://localhost:7000");
  }

  Emitfun(sendObject,callback) {
    // console.log("Emitted object" + JSON.stringify(sendObject));
    socket.emit("newMsg", sendObject);
    socket.on("chat message", data => {
      console.log("in socket");
      return callback(null, data);
    });
    
  }

  // receivedMsg(callback) {
  //   console.log("inside receive msg");
    
  //   socket.on("chat message", data => {
  //     console.log("in socket");
  //     return callback(null, data);
  //   });
  // }
}

export default new APIFunc();
