const Tour = require("../model/ie")

exports.ie = async (req, res) => {
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
  console.log(error.message)
  return res.status(500).json({
   status: "error",
  })
 }
}
