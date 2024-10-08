const express = require("express");
const app = express();
const dotenv = require('dotenv')
const connectToDatabase = require('./config/db')
const db = require('./config/db')
// env config
dotenv.config()
connectToDatabase()
app.get('/',(req,res)=>{
    res.send("Testing and test passsed ")
})
app.listen(process.env.PORT,()=>{
    console.log(`The Application is running at the http://${process.env.ENVIRONMENT}:${process.env.PORT}`)
})
