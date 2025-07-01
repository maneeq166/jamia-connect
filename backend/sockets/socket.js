function initSocket(io) {
  io.on("connection", (socket) => {
    socket.on("send name", (username) => {
      io.emit("send name", username);
    });

    

    socket.on("send message", (chat) => {
      console.log(socket.id,":",chat);
      
      io.emit("send message", chat);
    });

    socket.on("disconnect",(d)=>{
        console.log("disconnected");        
    })
  });
}

module.exports = {
  initSocket,
};
