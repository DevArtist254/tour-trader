const express = require("express")

const app = express()
const port = 8000 || process.env.PORT

app.listen(port, () => {
 console.log(`The server is currently running on port:${port}...`)
})
