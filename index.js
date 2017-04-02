


var path = require('path');
//import by calling require 
var express = require('express')
var app = express()
//middleware json parsing body 
var bodyParser = require('body-parser')
       // to support JSON-encoded bodies
app.use(bodyParser.json({     // to support URL-encoded bodies
  extended: true,
  limit: "100mb"
})); 
app.use('/static', express.static('static'))
//used to contect to mongodb 
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject'
// Use connect method to connect to the server
//express function gives you an app  
//landing page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'templates','Index.html'))
})
//connection to Statistics.html
app.get('/statistics', function (req, res) {
  res.sendFile(path.join(__dirname, 'templates','Statistics.html'))
})
//connection to customization.html 
app.get('/custom', function (req, res) {
  res.sendFile(path.join(__dirname, 'templates','Customization.html'))
})

//retrieves the last4 orders
app.get('/lastOrders', function (req, res) {

  MongoClient.connect(url, function(err, db) {
  	db.collection('orders').find().sort({"dateTime": -1}).limit(4).toArray(function (err, result) {
  	//create queries and run
    res.json(result)
    db.close();
    // console.log(result)
    })
  });
})
//retrieves the count of all documents in collection
app.get('/getTotalCount', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    db.collection('orders').count({}, function(err, count){

      res.send({totCount: count}); 
      db.close();
    })
  });
})
//count of all the same 
app.get('/getUniqueCount', function (req, res) {
  MongoClient.connect(url, function(err, db) {

    //top most recent creation 
    db.collection('orders').find().sort({"dateTime": -1}).limit(1).toArray(function(err,result){
      db.collection('orders').count({'upperToe': result[0].upperToe, 
                                     'upperMid': result[0].upperMid,
                                     'midShoe': result[0].midShoe,
                                     'soleColor' : result[0].soleColor, 
                                     'hue': result[0].hue,
                                     'saturation': result[0].saturation}, 
                                     function(err, count){
        res.send({uniqueCount: count}); 
        db.close();
      })
    });
 
  });
})






//posts the order made by a user to the mongodb database
app.post('/order',function(req,res){

  MongoClient.connect(url, function(err, db) {
	  	var collection = db.collection('orders');

	  collection.insertOne(req.body, function(err, result) {
	  	if(err){
	  	res.json({status: "fail", error: err})

	  	}
	  	else{
	    res.json({status:"success"})
		}
      });
 });

});
//listens in on port 3000, localhost
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
