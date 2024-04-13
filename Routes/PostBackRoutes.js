const express = require('express');
const router = express.Router();
const request = require('request')
const crypto = require('crypto')

const baseurl = process.env.COIN_DCX_BASE_URL;
const apiKey = process.env.COIN_DCX_API_KEY;
const apiSeceretKey = process.env.COIN_DCX_API_SECRET_KEY;


router.post("/orderStatus", async (req, res) => {
    const { orderId } = req.body;
    console.log(typeof orderId);
    const timeStamp = Math.floor(Date.now());
    // To check if the timestamp is correct
    console.log(timeStamp);

    // Place your API key and secret below. You can generate it from the website.
    const key = apiKey;
    const secret = apiSeceretKey;


    const body = {
        "client_order_id": orderId,
        "timestamp": timeStamp
    }

    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    const options = {
        url: baseurl + "/exchange/v1/orders/status",
        headers: {
            'X-AUTH-APIKEY': key,
            'X-AUTH-SIGNATURE': signature
        },
        json: true,
        body: body
    }

    request.post(options, function (error, response, body) {
        console.log(body);
        return res.status(body.code).json({ status: body.status, message: body.message, orderId: orderId })
    })
})


module.exports = router;

