
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const userRouter = require("./routes/userSignup");
const mongoose = require("mongoose");

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox1062316fb8e94d448142cea4ddc64b67.mailgun.org';

const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});


//mongoose.connect("mongodb+srv://admin-vishal:Vishal@2611@cluster0-cujjf.mongodb.net/blogDB",{useNewUrlParser :true});
mongoose.connect('mongodb://localhost/waterDB',{useNewUrlParser :true,useUnifiedTopology: true});




///routes

app.use("/user", userRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on ${PORT}`));
