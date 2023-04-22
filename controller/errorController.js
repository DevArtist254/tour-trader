////////////////////////////////////////////////////////////
//Error handling modification
const ApiErrorHandler = require("../utils/apiErrorHandler")

////////////////////////////////////////////////////////
//Sent Error in Dev mode
const sendErrorDev = (err, res) => {
 res.status(err.statusCode).json({
  status: err.status,
  message: err.message,
  stack: err.stack,
  error: err,
 })
}

//////////////////////////////////////////////////////////
//Sent error in production
const sendErrorProd = (err, res) => {
 if (err.isOperational) {
  //Check for operational error
  //Response
  res.status(err.statusCode).json({
   status: err.status,
   message: err.message,
  })
 } else {
  //Unknow error
  //1) log it
  console.error("##ERROR##", err)

  //Send a generic response
  res.status(500).json({
   status: "Error",
   message: "Something went wrong",
  })
 }
}

const objectIdHandlerDB = (err) => {
 /**
   * "error": {
        "stringValue": "\"hhhh\"",
        "valueType": "string",
        "kind": "ObjectId",
        "value": "hhhh",
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"hhhh\" (type string) at path \"_id\" for model \"Tour\""
    }
   */
 const message = `invalid id for the value:${err.value} and the path:${err.path}`

 return new ApiErrorHandler(message, 400)
}

module.exports = (err, req, res, next) => {
 //Access our global error handling object and set defaults
 err.statusCode = err.statusCode || 500
 err.status = err.status || "fail"

 if (process.env.NODE_ENV === "development") {
  sendErrorDev(err, res)
 } else if (process.env.NODE_ENV === "production") {
  //Shallow copy
  let error = {...err}

  //CastError invalid id
  if (error.kind === "ObjectId") error = objectIdHandlerDB(error)
  sendErrorProd(error, res)
 }
}
