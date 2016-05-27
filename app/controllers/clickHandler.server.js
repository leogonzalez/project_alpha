'use strict';

var Users = require('../models/users.js');

function clickHandler(){

  this.getClicks = function(req,res){

    Users
      .findOne({'github.id':req.user.github.id},{'_id':false})
      .exec(function(err,result){
          if (err) {throw err;}

          res.json(result.nbrClicks);
      }); // .exec closing
  }; // closes getClicks function

  this.addClick = function(req,res){
    Users
      .findOneAndUpdate({'github.id':req.user.github.id},{$inc : {'nbrClicks.clicks':1}})
      .exec(function(err,result){
            if (err) {throw err;}
            res.json(result.nbrClicks);
          }); // closes exec.
  };  // closes addClick

  this.resetClicks = function (req,res){
    Users
      .findOneAndUpdate({'github.id':req.user.github.id},{'nbrClicks.clicks':0})
      .exec(function(err,result){
        if (err) {throw err;}
        res.json(result.nbrClicks);
      }); //closes exec
  }; // closes resetClicks

} // closes clickHandler

module.exports = clickHandler;
