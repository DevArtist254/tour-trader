const app = require("./app")
const mongoose = require("mongoose")
require("dotenv").config({path: "./config.env"})

const port = process.env.PORT

////////////////////////////////////////////////
//Server
mongoose
 .connect(process.env.DB_CONNECT)
 .then(() => console.log(`DB is connected`))
 .catch((err) => console.error(err))

app.listen(port, () => {
 console.log(`The server is currently running on port:${port}...`)
})

process.on("unhandledRejection", (err) => {
 console.log(err.name, err.message)
 console.log(`Unhandler rejection! *wft* shutting down...`)
 server.close(() => {
  process.exit(1)
 })
})
