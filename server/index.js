const express   = require('express');
const socketio  = require('socket.io');
const http      = require('http');
const { addUser, removeUser, getUser, getUsersLastName } = require( './users.js' );
const PORT      = process.env.PORT || 5000;
const router    = require('./router');
const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

    io.on('connect', (socket) =>{
        console.log("Conexión");

        socket.on('join', ({ name, lastName}, callback ) => {
            console.log(name, lastName);

            const {error, user } = addUser( { id: socket.id, name, lastName } )
            if(error){
                return callback(error);
            }

            socket.emit('message', { user : 'admin', text: ` Hola ${user.name} ${user.lastName}` } )
            socket.broadcast.to(user.lastName).emit('message', { user: 'admin', text:  `Bienvenido ${user.lastName}` } );
            socket.join(user.lastName);
            callback();
        });

        socket.on('sendMessage', ( message, callback ) => {

            const user = getUser(socket.id);
            io.to(user.lastName).emit('message', { user: user.name, text: message } );

            callback();

        });

        socket.on('disconnect', () =>{
            console.log("Desconectado");
        })
    });

    app.use(router);
    server.listen(PORT, ()=> console.log(`Arrancando puerto ${PORT}`) );