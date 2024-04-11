const express = require('express');
const router = express.Router();
require('dotenv').config();

const request = require('request')
const crypto = require('crypto');

const apiKey = process.env.COIN_DCX_API_KEY;
const apiSeceretKey = process.env.COIN_DCX_API_SECRET_KEY;


router.get('/get', async (req, res) => {
    const baseurl = process.env.COIN_DCX_BASE_URL;

    const timeStamp = Math.floor(Date.now());
    // To check if the timestamp is correct
    console.log(timeStamp);

    // Place your API key and secret below. You can generate it from the website.
    const key = apiKey;
    const secret = apiSeceretKey;


    const body = {
        "timestamp": timeStamp
    }

    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    const options = {
        url: baseurl + "/exchange/v1/users/balances",
        headers: {
            'X-AUTH-APIKEY': key,
            'X-AUTH-SIGNATURE': signature
        },
        json: true,
        body: body
    }

    const options2 = {
        url: baseurl + "/exchange/v1/users/info",
        headers: {
            'X-AUTH-APIKEY': key,
            'X-AUTH-SIGNATURE': signature
        },
        json: true,
        body: body
    }

    const userHoldings = {};


    function getUserHoldings() {
        return new Promise((resolve, reject) => {
            request.post(options, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(body);
                }
            });
        });
    }

    function getUserInfo() {
        return new Promise((resolve, reject) => {
            request.post(options2, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        })
    }

    let holdingsRes = await getUserHoldings();
    let usersRes = await getUserInfo();


    return res.status(200).json({ status: "ok", message: "Healthy, good to go", userInfo: { userName: usersRes, userHoldings: holdingsRes[0] } });
});

module.exports = router;





