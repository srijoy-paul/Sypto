const express = require('express');
const router = express.Router();
require('dotenv').config();

const io = require('socket.io-client');
const socketEndpoint = process.env.COIN_DCX_SOCKET_ENDPOINT;

const socket = io.connect(socketEndpoint, {
    transports: ['websocket'],
    origin: '*',
});

console.log("hello");


router.post("/realtime", async (req, res) => {
    console.log("hi");
    socket.on("connect", () => {
        console.log('Connected to COIN DCX socket');
        console.log(socket.id, 'coindcx');

        socket.emit('join', { 'channelName': "currentPrices@futures@rt" });
    });

    socket.on('currentPrices@futures#update', (response) => {
        console.log(response.data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from COIN DCX socket');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

module.exports = router;