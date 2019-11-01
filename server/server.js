const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const os = require('os');
const path = require('path');
const {readdirSync}= require('fs');
const fs =require('fs'); 


const PORT = 3000;

const app = express();

app.use(bodyParse.json());
app.use(cors())

const directoryPath = path.join("C:");




app.get('/',function(req,res){
    res.send("Hello from Server ");   
})





var diretoryTreeToObj = (dir, done)=> {
    var results = [];
  
    
    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);
            
        var pending = list.length;
      
        // console.log(list);
        if (!pending)
            return done(null, {name: path.basename(dir), type: 'folder', children: results});

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            // console.log("Dire "+dir+" : "+file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    results.push({
                        type: 'file',
                        name: path.basename(file)
                    });
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
    
};



app.get('/addcontact',cors(),function(req,res){
	//  res.setHeader("Access-Control-Allow-Origin", "*");
    // // Request headers you wish to allow
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // // Set to true if you need the website to include cookies in the requests sent
    // res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body);
    res.status(200).send({"message":"Data recive"})
})


app.get('/getDir',cors(),function(req,res){
   
   console.log(req.body);

   
   
diretoryTreeToObj(directoryPath, function(err, rese){
    if(err)
        console.error(err);

    // console.log(res);
    // res.header("Access-Control-Allow-Origin", "*");
    // // Request headers you wish to allow
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // // Set to true if you need the website to include cookies in the requests sent
    // res.header('Access-Control-Allow-Credentials', true);

   
    res.status(200).send({"data":rese})
});
//    res.status(200).send({"message":"Data recive"})
})

app.listen(PORT,function(){
    console.log("Server running on localhost: "+PORT);
})

