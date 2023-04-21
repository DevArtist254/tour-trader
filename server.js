const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({path: "./config.env"})

const app = express()
const port = process.env.PORT

mongoose
 .connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
 })
 .then(() => console.log(`DB is connected`))
 .catch((err) => console.error(err))

app.listen(port, () => {
 console.log(`The server is currently running on port:${port}...`)
})
