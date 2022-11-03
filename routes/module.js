const express = require("express");
const router = express.Router();
const {
   getModule,
   addModule

} = require("../controllers/moduleController")

//add a module
router.get("/",getModule);

//add a module
router.post("/add",addModule);

module.exports = router;
