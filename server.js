const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({path: "./config.env"})

const app = express()
const port = process.env.PORT
const router = express.Router()

//////////////////////////////////////////////
//Model
const tourSchema = mongoose.Schema({
 name: String,
 price: Number,
 summary: String,
 description: String,
 createdAt: Date,
})

const Tour = mongoose.model("Tour", tourSchema)

//////////////////////////////////////////////
//Middleware
app.use(express.json())

router.use("/", (req, res, next) => {
 req.timedNow = new Date().toISOString()
 next()
})

router.post("/", async function (req, res) {
 try {
  const doc = await Tour.create({
   name: req.body.name,
   price: req.body.price,
   summary: req.body.summary,
   description: req.body.description,
   createdAt: req.timedNow,
  })

  return res.status(200).json({
   status: "success",
   data: {
    doc,
   },
  })
 } catch (error) {
  return res.status(500).json({
   status: "error",
  })
 }
})

app.use("/", router)

////////////////////////////////////////////////
//Server
mongoose
 .connect(process.env.DB_CONNECT)
 .then(() => console.log(`DB is connected`))
 .catch((err) => console.error(err))

app.listen(port, () => {
 console.log(`The server is currently running on port:${port}...`)
})
