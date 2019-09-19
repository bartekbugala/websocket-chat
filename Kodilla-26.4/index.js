'use strict';
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const UsersService = require('./UsersService');
const usersService = new UsersService();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', socket => {
  // Miejsce dla funkcji, które zostaną wykonane po podłączeniu klienta
  socket.on('join', name => {
    usersService.addUser({
      id: socket.id,
      name
    });
    
    socket.on('disconnect', () => {
      usersService.removeUser(socket.id);
      socket.broadcast.emit('update', {
        users: usersService.getAllUsers()
      });
    });

    socket.on('message', message => {
      const { name } = usersService.getUserById(socket.id);
      socket.broadcast.emit('message', {
        text: message.text,
        from: name
      });
    });
    // apka emituje zdarzenie update, które aktualizuje informację na temat listy userów każdemu nasłuchującemu na wydarzenie 'update'
    io.emit('update', {
      users: usersService.getAllUsers()
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});