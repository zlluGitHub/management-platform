let express = require('express');
let util = require("util");
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.json(util.inspect(res));
  // res.send(JSON.stringify(req));
  // res.send(util.inspect(req.route));
  // res.json("qwdwfe");
  // res.write('util.inspect(req.route)');
  res.end(util.inspect(req.route));

});

module.exports = router;
