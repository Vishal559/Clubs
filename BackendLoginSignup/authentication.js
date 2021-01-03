var express=require('express')
var cors=require('cors')
var app=express()
var fs=require('fs')
var bodyParser=require('body-parser')
const http = require('http');


app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://rishak192:Mongodb@192@firstproject.8maq4.mongodb.net/UserData?retryWrites=true&w=majority";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});

const dbName = "UserData";

app.get('/',function(req,res){
  res.send("Hello")
})

app.post('/login',function(req,res){
  const fname=req.body.fname
  const pass=req.body.password
  // const request=req
  async function run() {
          await client.connect();
          // console.log("Connected correctly to server");
          const db = client.db(dbName);

          db.collection("User").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(fname," ",pass);
          for(var i=0;i<result.length;i++){
            console.log(result[i].fname,result[i].password);
            if(fname===result[i].fname && pass===result[i].password){
              // redirect to profile page
              console.log("Logged In");
              // console.log("Logged In ",uname," ",pass," ",result[i].name," ",result[i].password);
            }
          }
          res.send(req.body.fname+"Rishak")
        });
      }
   run().catch(console.dir);
})

app.post('/signup',function(req,res){

  var fname=req.body.fname
  var email=req.body.email
  var password=req.body.password

  async function run() {
     try {
          await client.connect();
          // console.log("Connected correctly to server");
          const db = client.db(dbName);

          // Use the collection "people"
          const col = db.collection("User");

          let personDocument = {
              "fname": fname,
              "email": email,
              "password": password
          }

          // Insert a single document, wait for promise so we can read it back
          const p = await col.insertOne(personDocument);
          // const myDoc = await col.findOne();
          // Print to the console
          // console.log(myDoc);
          res.send(personDocument)

         } catch (err) {
          console.log(err.stack);
      }
      finally {
         await client.close();
     }
   }
   run().catch(console.dir);
})

app.listen(3005, () => {
  console.log("Listening");
});
