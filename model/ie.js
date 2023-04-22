const mongoose = require("mongoose")

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

module.exports = Tour
