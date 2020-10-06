const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand(new Band('Breaking Benjamin'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del silencio'));
bands.addBand(new Band('Metalica'));
console.log(bands);
//mensajes de socket
io.on('connection', client => {
    console.log('CLIENTE CONECTADO');
    //client.on('event', data => {});
    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => {
        console.log('CLIENTE DESCONECTADO');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload.nombre);
        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    });
    /*client.on('emitir-mensaje', (payload) => {
        //io.emit('nuevo-mensaje', payload); // emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos el que  lo emitio

    });*/
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());

    });
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });
});