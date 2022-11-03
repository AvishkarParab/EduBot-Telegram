const asyncHandler = require("express-async-handler");
const con = require("../db/connection")
const mysql = require("mysql")

//get list of all courses
const getCourse = asyncHandler(async (req,res) =>{
        con.query("select * from course",(error,result)=>{
            if(result.length > 0){
                res.status(200).json({
                    message:"Courses fetched",
                    result:result
                });
            }else{
                res.status(400)
                res.json({message:"Courses not found"})
            }

        });
    
})

//update a particular course
const updateCourse = asyncHandler(async (req,res) =>{
    const {id, cname , module} = req.body;
    console.log(id + " "+ cname + " " + module);
    // if( !cname || !module){
    //     res.status(400)
    //     res.json({message:"Empty data, please add again"})
    // }
    let updateQuery = "UPDATE ?? SET ?? = ?,?? = ? WHERE ?? = ?";
    let query = mysql.format(updateQuery,["course","cname",cname,"tot_module",module,"id",id]);
    
    con.query(query,(error,result)=>{
        if(error){
            res.status(400)
            res.json({message:"Courses not updated"})
        }
        if(result){
                res.status(200).json({
                    message:"Courses updated",
                    result:result.affectedRows
                }); 
        }else{
            res.status(400)
            res.json({message:"Courses not found"})
        }

    });

})

//add a new course
const addCourse = asyncHandler(async (req,res) =>{
    const {cname , module} = req.body;
    console.log( cname + " " + module);
    if( !cname || !module){
        res.status(400)
        res.json({message:"Empty data, please add again"})
    }

    let insertQuery = "INSERT INTO course(??,??) VALUES(?,?)";
    let query = mysql.format(insertQuery,["cname","tot_module",cname,module]);
    
    con.query(query,(error,result)=>{
        if(error){
            res.status(400)
            res.json({message:"Courses not added"})
        }
        if(result){
                res.status(200).json({
                    message:"Courses Added",
                    result:result
                }); 
        }else{
            res.status(400)
            res.json({message:"Courses not found"})
        }

    });

})

//delete list of all courses
const deleteCourse = asyncHandler(async (req,res) =>{
    console.log(req.query.id); 
    if( !req.query.id){
        res.status(400)
        res.json({message:"invalid ID"})
    }

    let deleteQuery = "DELETE FROM course WHERE ?? = ?";
    let query = mysql.format(deleteQuery,["id",req.query.id]);

    con.query(query,(error,result)=>{
        if(error){
            res.status(400)
            res.json({message:"Courses not deleted"})
        }
        if(result){
                res.status(200).json({
                    message:"Courses Deleted",
                    result:result.affectedRows
                }); 
        }

    });

})
module.exports ={
    getCourse,
    updateCourse,
    addCourse,
    deleteCourse
}