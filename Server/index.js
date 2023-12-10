var express = require('express')
var mongoose = require('mongoose')

const cors = require("cors");
const db = require('./db')
var dotenv = require('dotenv')
const Port = process.env.PORT 
dotenv.config();

//Routes
const employeesRouter = require('./src/Routes/userRoutes');
const authRouter = require("./src/Middleware/auth");


var app = express();
db.dbConnection(); 

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001'],
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
}))  

app.use('/user' , employeesRouter);
app.use('/auth' , authRouter);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
}); 