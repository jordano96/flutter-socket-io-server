const { io } = require('../index');
//mensajes de socket
io.on('connection', client => {
    console.log('CLIENTE CONECTADO');
    //client.on('event', data => {});
    client.on('disconnect', () => {
        console.log('CLIENTE DESCONECTADO');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload.nombre);
        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    });
});