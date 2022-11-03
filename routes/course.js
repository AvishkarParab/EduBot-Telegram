const express = require("express");
const router = express.Router();
const {
    getCourse,
    updateCourse,
    addCourse,
    deleteCourse

} = require("../controllers/courseController")
// const {protect} = require("../middleware/authMiddleware");


//get all courses
router.get("/",getCourse);

//update a course
router.put("/update",updateCourse);

//add a course
router.post("/add",addCourse);

//delete a course
router.delete("/",deleteCourse);


module.exports = router;