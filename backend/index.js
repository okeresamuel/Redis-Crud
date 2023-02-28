const express = require("express");
const app = express();
const axios = require("axios");
const Redis = require("ioredis");
const async_Error_Handler = require("express-async-handler");
const redis = new Redis();

//External__Database ⬇️
const Api_EndPoint = "https://dummyjson.com/products";

//The api__Endpoint ⬇️
app.get(
  "/api/product_dataRequest",
  async_Error_Handler(async (req, res) => {
    //checking if the data is in redis if yes we send it to the user
    let products_Info = await redis.get("Products");
    if (products_Info) {
      res.status(200).json(JSON.parse(products_Info));
    } else {
      //if the data is absent then we make an api call to the database
      //when the data is fetched we set it to redis and send it to the user as well
      let { data } = await axios.get(Api_EndPoint);
      await redis.set("Products", JSON.stringify(data), "EX", 10000);
      data
        ? res.status(200).json(data)
        : res.send("No products data was found");
    }
  })
);
// server is listening on port 2000 
const port = process.env.PORT || 2000;
app.listen(port, console.log("app is listening on port 2000"));
