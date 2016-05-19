'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/clementinejs');

app.use('/public', express.static(process.cwd()+'/public'));
app.use('/controllers', express.static(process.cwd()+ '/app/controllers'));

routes(app);

var port = 8080;
app.listen(port,function(){
  console.log("Listening on port 8080...");
});
