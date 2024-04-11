const express = require('express');
const router = express.Router();
require('dotenv').config();

const request = require('request')
const crypto = require('crypto');
const { validateSellOrderRequest } = require('../middlewares/validation');

const apiKey = process.env.COIN_DCX_API_KEY;
const apiSeceretKey = process.env.COIN_DCX_API_SECRET_KEY;
const baseurl = process.env.COIN_DCX_BASE_URL;


router.post("/sellOrder", validateSellOrderRequest, async (req, res) => {
    const { market, pricePerUnit_toSell, totalQuantity_toSell } = req.body;

    // console.log(typeof market, typeof pricePerUnit_toSell, typeof totalQuantity_toSell);

    const timeStamp = Math.floor(Date.now());

    const key = apiKey;
    const secret = apiSeceretKey;


    const body = {
        "side": "buy",
        "order_type": "limit_order",
        "market": market,
        "price_per_unit": pricePerUnit_toSell,
        "total_quantity": totalQuantity_toSell,
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
        return res.status(body.code).json({ status: body.status, message: body.message })
    })


});

module.exports = router;