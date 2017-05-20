var express       = require('express');
var multer        = require('multer');
var sharp         = require('sharp');
var models        = require('../models/portfolio');
var Portfolio     = models.portfolio;
var Comment       = models.comment;
var uploadHandler = multer({dest: 'public/images/portfolio'});
var router        = express.Router();

// Index.
router.get('/', function(request, response) {
	Post.findAll().then(function(posts) {
		response.render('portfolio/index', {
			posts: posts
		});
	});
});


// New.
router.get('/new', function(request, response) {
	response.render('portfolio/new', {
		post: {}
	});
});

// Create.
router.post('/', uploadHandler.single('image'), function(request, response) {
	Post.create({
		title:         request.body.title,
		body:          request.body.body,
		author:        request.body.author,
		slug:          request.body.slug,
		imageFilename: (request.file && request.file.filename)
	}).then(function(post) {
		sharp(request.file.path)
		.resize(300, 300)
		.max()
		.withoutEnlargement()
		.toFile(`${request.file.path}-thumbnail`, function() {
			response.redirect(post.url);
		});
	}).catch(function(error) {
		response.render('blog/new', {
			post:   request.body,
			errors: error.errors
		});
	});
});

// Show.
router.get('/:slug', function(request, response) {
	Post.findWithSlug(request.params.slug).then(function(post) {
		response.render('portfolio/show', {
			post:     post,
			comment:  {}
		});
	});
});



module.exports = router;
