const express = require("express");
const router = express.Router();
const course = require("./course");
const modu = require("./module");



router.use("/course",course)

router.use("/module",modu)





module.exports = router;
