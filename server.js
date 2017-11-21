var express=require('express');
var morgan = require('morgan');
var http=require('http');
var bodyParser= require('body-parser');
var methodOverride = require('method-override');
var app=express();
var server=http.Server(app);
var config=require('./config/config.js');
var port=config.port;
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false,limit: '5mb' }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '5mb'}))    // parse application/json
app.use(methodOverride());                  // simulate DELETE and PUT
app.get('/',function(req,res){
    res.json({"message": "Task management application."});
})
require('./route/route.js')(app);
server.listen(port);
console.log("Server is running on the port"+port);