const asyncHandler = require("express-async-handler");
const con = require("../db/connection")
const mysql = require("mysql")

//get list of all courses
const getModule = asyncHandler(async (req,res) =>{
    let selectQuery = "SELECT * FROM module WHERE ?? = ?";
    let query = mysql.format(selectQuery,["cid",req.query.cid]);
    con.query(query,(error,result)=>{
        if(result.length > 0){
            res.status(200).json({
                message:"Modules fetched",
                result:result
            });
        }else{
            res.status(400)
            res.json({message:"Modules not found"})
        }

    });

})
//add a new course
const addModule = asyncHandler(async (req,res) =>{
    var {cid,mtype,vidlink,image,quest,opt1,opt2,opt3,opt4,coropt} = req.body;

    if( !mtype || !quest || !coropt){
        res.status(400)
        res.json({message:"Empty data, please add again"})
    }

    let insertQuery = "INSERT INTO module(??,??,??,??,??,??,??,??,??,??) VALUES(?,?,?,?,?,?,?,?,?,?)";
    let query = mysql.format(insertQuery,["cid","mtype","videolink","image","question","option1","option2","option3","option4","correctopt",
    cid,mtype,vidlink,image,quest,opt1,opt2,opt3,opt4,coropt]);
    
    con.query(query,(error,result)=>{
        if(error){
            console.log(error);
            res.status(400)
            res.json({message:"Module not added"})
        }
        if(result){
                res.status(200).json({
                    message:"Module Added",
                    result:result
                }); 
        }else{
            console.log(error);
            res.status(400)
            res.json({message:"Module not found"})
        }

    });

})

module.exports ={
    getModule,
    // updateModule,
    addModule,
    // deleteModule
}