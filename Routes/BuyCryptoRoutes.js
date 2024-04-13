const express = require('express');
const router = express.Router();
require('dotenv').config();

const request = require('request')
const crypto = require('crypto');
const { validateBuyOrderRequest } = require('../middlewares/validation');

const apiKey = process.env.COIN_DCX_API_KEY;
const apiSeceretKey = process.env.COIN_DCX_API_SECRET_KEY;
const baseurl = process.env.COIN_DCX_BASE_URL;

router.post("/buyOrder", validateBuyOrderRequest, async (req, res) => {
    try {
        console.log("enter");
        const { market, pricePerUnit, totalQuantity } = req.body;
        // console.log(typeof market, typeof pricePerUnit, typeof totalQuantity);
        const timeStamp = Math.floor(Date.now());

        const key = apiKey;
        const secret = apiSeceretKey;


        const body = {
            "side": "buy",
            "order_type": "limit_order",
            "market": market,
            "price_per_unit": pricePerUnit,
            "total_quantity": totalQuantity,
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
            console.log(JSON.stringify(body, null, 2));
            return res.status(200).json({ status: body.status, message: body.message })
        })
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ status: "err", message: error })
    }

});



module.exports = router;



