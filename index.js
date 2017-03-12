var path = require('path')

//import by calling require 
var express = require('express')
var app = express()
app.use('/static', express.static('static'))
//express function gives you an app 
//7-9 route logic assigned to a path 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'templates','index.html'))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
