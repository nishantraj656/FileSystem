const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(bodyParse.json());



app.get('/',function(req,res){
    res.send("Hello from Server ");   
})

app.get('/addcontact',cors(),function(req,res){
	 res.setHeader("Access-Control-Allow-Origin", "*");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Set to true if you need the website to include cookies in the requests sent
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body);
    res.status(200).send({"message":"Data recive"})
})

app.listen(PORT,function(){
    console.log("Server running on localhost: "+PORT);
})