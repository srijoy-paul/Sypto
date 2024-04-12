const express = require('express');
const router = express.Router();
require('dotenv').config();

const io = require('socket.io-client');
const socketEndpoint = process.env.COIN_DCX_SOCKET_ENDPOINT;

let socket;
let isSocketConnected = false;

router.post("/realtime", async (req, res) => {
    if (!isSocketConnected) {
        console.log("Starting socket connection...");
        socket = io.connect(socketEndpoint, {
            transports: ['websocket'],
            origin: '*',
        });
        socket.on("connect", () => {
            console.log('Connected to COIN DCX socket');
            console.log(socket.id, 'coindcx');

            socket.emit('join', { 'channelName': "currentPrices@futures@rt" });
            isSocketConnected = true;
            res.status(200).json({ message: 'Socket connection established' });
        });

        socket.on('currentPrices@futures#update', (response) => {
            console.log(response.data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from COIN DCX socket');
            isSocketConnected = false;
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    } else {
        console.log("Socket is already connected.");
        res.status(200).json({ message: 'Socket is already connected' });
    }
});

router.post("/disconnect", (req, res) => {
    if (isSocketConnected) {
        console.log("Disconnecting socket...");
        socket.disconnect();
        isSocketConnected = false;
        res.status(200).json({ message: 'Socket disconnected successfully' });
    } else {
        console.log("Socket is already disconnected.");
        res.status(200).json({ message: 'Socket is already disconnected' });
    }
});

module.exports = router;
