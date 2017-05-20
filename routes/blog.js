var express = require('express');
var models = require('../models/index');
var Blog = models.blog;
var router = express.Router();


// // Index.
router.get('/', function(request, response) {
	Blog.findAll().then(function(blog) {
		response.render('blog/index', {
			blog: blog
		});
	});
});

// Create.
router.post('/', function(request, response) {
	Message.create({
		title: request.body.title,
		body:  request.body.body,
	}).then(function(Blog) {
		response.redirect('/blog');
	});
});



module.exports = router;
