const db=require('mysql2');

const dbservice=db.createConnection({
    host:"localhost",
    user:"root",
    password:"Satyam@123",
    database:"empdata"
})
module.exports=dbservice;