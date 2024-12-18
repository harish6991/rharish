const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const connectToDatabase = require('./config/db')
const db = require('./config/db')
const authRoutes = require('./routes/user.routes')
const {makeCollection,makeRefreshCollection} = require('./controller/roles.controller');
// env config
const path = __dirname + '/views/';
dotenv.config()

// uses react as the front end
app.use(express.static(path));
// parse the data in form of json data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// connection to database
connectToDatabase()
// making collection
makeCollection()

//makeRefresh Token table
makeRefreshCollection()

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// authentication
app.use('/api/auth',authRoutes);


// dashboard routes
app.listen(process.env.PORT,()=>{
    console.log(`The Application is running at the http://${process.env.ENVIRONMENT}:${process.env.PORT}`)
})
