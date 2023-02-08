const express = require("express")
const app = express()
const User  = require("./models/user")
const cors = require("cors")
const dotenv = require("dotenv").config()

const mongoose = require("mongoose")
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MongoURI,).then(()=>{
      console.log("mongodb connected")
}).catch((err)=>{
    throw new Error (err.message)
})
 mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected")
})

app.use(cors())

// find all users
app.get("/api/users", async (req, res) => {
    try {
      let { initialAmount, load_per_scroll } = req.query;
      let user = await User.find()
        .skip(parseInt(initialAmount))
        .limit(parseInt(load_per_scroll));
      user ? res.status(200).json(user) : res.status(403).json("no user found");
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

const port = process.env.PORT || 5000
app.listen(port,   console.log("app is listening on port 5000"))