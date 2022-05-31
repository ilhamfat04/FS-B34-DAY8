const socketIo = (io) => {
  // code here
  let userCount = 0
  io.on('connection', (socket) => {
    userCount++
    console.log('id client connect:', socket.id);
    console.log('client connect:', userCount);

    socket.on('disconnect', () => {
      console.log("client disconnect");
      userCount--
    })
  })
}

module.exports = socketIo