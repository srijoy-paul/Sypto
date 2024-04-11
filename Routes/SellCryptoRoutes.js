const express = require('express');
const router = express.Router();
require('dotenv').config();

const request = require('request')
const crypto = require('crypto');

const apiKey = process.env.COIN_DCX_API_KEY;
const apiSeceretKey = process.env.COIN_DCX_API_SECRET_KEY;
const baseurl = process.env.COIN_DCX_BASE_URL;


router.post("/sellOrder", async (req, res) => {

    const timeStamp = Math.floor(Date.now());

    const key = apiKey;
    const secret = apiSeceretKey;


    const body = {
        "side": "buy",
        "order_type": "limit_order",
        "market": "TRXBTC",
        "price_per_unit": "0.00000435",
        "total_quantity": 200,
        "timestamp": timeStamp,
        "client_order_id": "2022.02.14-btcinr_1"
    }

    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    const options = {
        url: baseurl + "/exchange/v1/orders/create",
        headers: {
            'X-AUTH-APIKEY': key,
            'X-AUTH-SIGNATURE': signature
        },
        json: true,
        body: body
    }

    request.post(options, function (error, response, body) {
        console.log(body);
    })


});

module.exports = router;