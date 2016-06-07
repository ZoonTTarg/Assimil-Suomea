var express = require('express');
var router = express.Router();

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

function insert_database(req,res,mot) {
    var cox = req.cox;
    cox.getConnection(function(err,connection){
        if (err) {
          connection.release();
          req.io.emit('INSERT', {status:'error', error: err});
        }
        
        connection.query('INSERT INTO mots SET ?', mot, function(err,res){
          console.log("INSERT effectué");
          req.io.emit('INSERT', {status:'completed', id: res});
          console.log("emit envoyé");    
        });

        connection.on('error', function(err) {   
          req.io.emit('INSERT', {status:'error', error: err});     
        });
  });
}

/*
 * GET listemots.
 */
router.param('sColTri', function(req,res, next, value){
  req.sColTri = value;
  next();
});

/*
 * GET listemots.
 */
router.param('sSensTri', function(req,res, next, value){
  req.sSensTri = value;
  next();
});

router.get('/listemots/:sColTri/:sSensTri', function(req, res) {
    select_database(req,res,"SELECT * from mots m, typemot t where m.codetypemot = t.codetypemot ORDER BY "+req.sColTri+" "+req.sSensTri);
});

router.get('/listemots', function(req, res) {
    select_database(req,res,"SELECT * from mots m, typemot t where m.codetypemot = t.codetypemot ORDER BY mot ASC");
});

/*
 * GET listemots.
 */
router.get('/listetypemot', function(req, res) {
    select_database(req,res,"SELECT * from typemot ORDER BY libelletypemot");
});

/*
 * POST to addmot.
 */
router.post('/addmot', function(req, res) {
    insert_database(req,res,req.body);
    res.json({"status" : "en cours"});
});

module.exports = router;