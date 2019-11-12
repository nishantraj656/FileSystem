const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const os = require('os');
const path = require('path');
const {readdirSync}= require('fs');
const fs =require('fs'); 
const https = require('https');


const PORT = 3000;

const app = express();

app.use(bodyParse.json());
app.use(cors())

const directoryPath = path.join("C:/");




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

app.get('/lo',cors(),function(req,res){
    let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOS&types=(cities)&language=en&key=AIzaSyAC-a6b5_ImWrwMagVt4qifEkMPVoTTWHA'
    https.get(url ,function(response) {
        var body ='';
        response.on('data', function(chunk) {
          body += chunk;
        });
    
        response.on('end', function() {
          var places = JSON.parse(body);
        //   var locations = places.results;
        //   var randLoc = locations[Math.floor(Math.random() * locations.length)];
    
          res.json(places);
        });
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });
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


app.post('/dir',function(req,res){
   var  directoryPath =req.body.path;
   results=[];

  
   fs.readdir(directoryPath,function(err,list){
       if(err){
           --pending;
            return 'It is not possible to Scan this Directory.';
            }
            var pending = list.length;

        if (!pending)
            return res.status(200).send({"data":results});
        console.log(directoryPath)
       

        list.forEach((file)=>{
          let  filePath = directoryPath +file;
           console.log("File : "+file+" : "+filePath);
            fs.stat(filePath,function(err,stats){
                if(err){
                    --pending;
                return 'It is not possible to Scan this Directory.';}

                if (stats && stats.isDirectory()) 
                {
                  
                    results.push({
                        name: path.basename(file),
                        type: 'folder',
                       children:[]
                    });

                    if (!--pending)
                        return res.status(200).send({"data":results});
                }
                else 
                {
                    results.push({
                        type: 'file',
                        name: path.basename(file)
                    });
                    if (!--pending)
                        return res.status(200).send({"data":results});
                }
               
                console.log("pending : "+pending + " F :"+filePath)
            });

        });

       

   });

})

app.listen(PORT,function(){
    console.log("Server running on localhost: "+PORT);
})

