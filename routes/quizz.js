var express = require('express');
var router = express.Router();

/*
 * GET listemots.
 */

router.get('/', function(req, res) {
    res.sendfile('public/quizz.html');
});

function select_database(req,res,select) {
    var cox = req.cox;
    cox.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }
        
        connection.query(select,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

router.get('/nouveau', function(req, res) {
    select_database(req,res,"SELECT * from mots");
});



module.exports = router;