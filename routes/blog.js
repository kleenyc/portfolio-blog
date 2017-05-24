var express = require('express');
var models = require('../models/index');
var Post = models.post;
var router = express.Router();


// // Index.
router.get('/', function(request, response) {
	Post.findAll().then(function(posts) {
		response.render('blog/index', {
			posts: posts
		});
	})
});


// New.
router.get('/new', function(request, response) {
	response.render('blog/new', {
		post: {}
	})
});

// Create.
router.post('/', function(request, response) {
	Post.create({
		title:         request.body.title,
		body:          request.body.body,
		author:        request.body.author,
		slug:          request.body.slug
	}).then(function(post) {
		response.redirect(post.url);
	}).catch(function(error) {
		response.render('blog/new', {
			post:   request.body,
			errors: error.errors
		})
	});
});


// Show.
router.get('/:slug', function(request, response) {
	Post.findWithSlug(request.params.slug).then(function(post) {
		response.render('blog/show', {
			post: post
		});
	});
});



module.exports = router;
