function initSocket(io) {
  io.on("connection", (socket) => {
    socket.on("send name", (username) => {
      io.emit("recieve name", username);
    });

    socket.on("send message", (chat) => {
      console.log(socket.id,":",chat);
      
      io.emit("recieve message", chat);
    });

    socket.on("disconnect",(d)=>{
        console.log("disconnected");        
    })
  });
}

module.exports = {
  initSocket,
};
