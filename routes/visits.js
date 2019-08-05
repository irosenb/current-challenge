var express = require('express');
var router = express.Router();
var Visit = require('../models/visit.js');

router.post('/', function(req, res, next) {
  Visit.create(req.body.userId, req.body.name, function(result, err) {
    if (err) {
      res.status(400).send("error");
    } else {
      res.send({"id": result.id});
    }
  });
});

router.get('/', function(req, res, next) {
  console.log(req);
  console.log(req.params.id);
  Visit.search(req.body.name, req.body.userId, req.body.id, function(results, err) {
    if (err) {
      res.status(400).send("error");
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
