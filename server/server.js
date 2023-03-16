const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
const port=process.env.PORT || 5000;
// middle ware 
app.use(cors());
app.use(express.json());

// mongoose connect 
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection establised succesfully");
})

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

// using routes 

app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);

app.listen(port,()=>{
    console.log("server started at :",port);
})