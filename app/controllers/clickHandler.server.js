'use strict';

function clickHandler(db){

  var clicks = db.collection('clicks');

  this.getClicks = function(req,res){

    // projections choose which fields will return from the query
    var clickProjection = {'_id':false};

    clicks.findOne({},clickProjection,function(err,result){

      if (err) {
        throw err;
      }

      if (result) {
          res.json(result);
      } else {

          clicks.insert({'clicks':0},function(err){
            if (err) {
              throw err;
            }

            clicks.findOne({},clickProjection,function(err,doc){
              if (err) {
                throw err;
              }

              res.json(doc);

            });  // closes second findOne
          }); // closes click.insert
      } // closes else from if(result)
    }); // closes first findOne
  }; // closes getClicks function

  this.addClick = function(req,res){
    clicks.findAndModify(
          {}, //this is what where finding
          {'_id':1}, // projection
          {$inc : {'clicks':1}}, // increases count by one
          function(err,result){
            if (err) {throw err;}
            res.json(result);
          }
        );
  };  // closes addClick

  this.resetClicks = function (req,res){
    clicks.update(
      {},
      {'clicks':0},
      function(err,result){
        if (err) {throw err;}
        res.json(result);
      }
    );
  }; // closes resetClicks

} // closes clickHandler

module.exports = clickHandler;
