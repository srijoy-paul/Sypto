const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const fs = require('fs');
const YAML = require('yaml');

const userInfoRouter = require("./Routes/UserInfoRoutes");
const buyCryptoRouter = require("./Routes/BuyCryptoRoutes");
const sellCryptoRouter = require("./Routes/SellCryptoRoutes");
const postBackRouter = require("./Routes/PostBackRoutes");
const priceUpdatesRouter = require("./Routes/PriceUpdatesRoutes");
// const apiKey = process.env.ANGLE_BROKING_API_KEY;

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use("/api/v1/UserInfo", userInfoRouter);
app.use("/api/v1/Buy", buyCryptoRouter);
app.use("/api/v1/Sell", sellCryptoRouter);
app.use("/api/v1/commodity", postBackRouter);
app.use("/api/v1/PriceUpdates", priceUpdatesRouter);


const PORT = 3127;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});
