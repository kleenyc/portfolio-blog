var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Kathy's Page!"});
});

router.get('/blog', function(request, response) {
	response.render('blog/index');
});

router.get('/portfolio', function(request, response) {
	response.render('portfolio/index');
});

module.exports = router;
