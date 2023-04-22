const express = require("express")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const ieRouter = require("./router/ie")

const app = express()

// Set security Http headers
app.use(helmet())

//////////////////////////////////////
//Gobal Middlewares
app.use(express.json({limit: "10kb"}))

//Data sanitization against NoSql query injection filters out mongodb $
app.use(mongoSanitize())

//Data sanitization against XSS converts code to usable items
app.use(xss())

//Prevent parament pollution
app.use(
 hpp({
  whitelist: [
   //items to be used in our parameter
   //   'duration',
   //   'price',
   //   'duration',
   //   'maxGroupSize',
   //   'difficulty',
   //   'ratingsAverage',
   //   'ratingsQuantity',
  ],
 })
)

app.use(express.static(`${__dirname}/public`))

//Limit requests from same API
const limiter = rateLimit({
 //100 requests in hr
 max: 100,
 windowMs: 60 * 60 * 1000,
 //error message
 message: "Too many requests try again in hr",
})

app.use("/api", limiter)

app.use("/", (req, res, next) => {
 req.timedNow = new Date().toISOString()
 next()
})

app.use("/", ieRouter)

module.exports = app
