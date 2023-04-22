const express = require("express")
const {ie} = require("../controller/ie")
const router = express.Router()

router.post("/", ie)

module.exports = router
