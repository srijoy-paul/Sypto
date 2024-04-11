const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const userInfoRouter = require("./Routes/UserInfoRoutes");
const buyCryptoRouter = require("./Routes/BuyCryptoRoutes");
const sellCryptoRouter = require("./Routes/SellCryptoRoutes");
const priceUpdatesRouter = require("./Routes/PriceUpdatesRoutes");
// const apiKey = process.env.ANGLE_BROKING_API_KEY;

app.use(cors());
app.use(express.json());
app.use("/api/v1/UserInfo", userInfoRouter);
app.use("/api/v1/Buy", buyCryptoRouter);
app.use("/api/v1/Sell", sellCryptoRouter);
app.use("/api/v1/PriceUpdates", priceUpdatesRouter);


const PORT = 3127;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});
