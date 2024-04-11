const express = require('express');
const router = express.Router();
require('dotenv').config();

const request = require('request')
const crypto = require('crypto');

const apiKey = process.env.COIN_DCX_API_KEY;
const apiSeceretKey = process.env.COIN_DCX_API_SECRET_KEY;
const baseurl = process.env.COIN_DCX_BASE_URL;

const io = require('socket.io-client');
const socketEndpoint = process.env.COIN_DCX_SOCKET_ENDPOINT;

const socket = io.connect(socketEndpoint, {
    transports: ['websocket'],
    origin: '*',
});



router.post("/realtime", async (req, res) => {

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