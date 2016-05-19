'use strict';

var Clicks = require('../models/clicks.js');

function clickHandler(){

  this.getClicks = function(req,res){

    Clicks
      .findOne({},{'_id':false})
      .exec(function(err,result){
          if (err) {
            throw err;
          }
          if (result) {
              res.json(result);
          } else {
              var newDoc = new Clicks({'clicks':0});
              newDoc.save(function(err,doc){
                if (err) {
                  throw err;
                }
                res.json(doc);
              }); //newDoc.save closing
            }// else closing
      }); // .exec closing
  }; // closes getClicks function

  this.addClick = function(req,res){
    Clicks
      .findOneAndUpdate({},{$inc : {'clicks':1}})
      .exec(function(err,result){
            if (err) {throw err;}
            res.json(result);
          }); // closes exec.
  };  // closes addClick

  this.resetClicks = function (req,res){
    Clicks
      .findOneAndUpdate({},{'clicks':0})
      .exec(function(err,result){
        if (err) {throw err;}
        res.json(result);
      }); //closes exec
  }; // closes resetClicks

} // closes clickHandler

module.exports = clickHandler;
