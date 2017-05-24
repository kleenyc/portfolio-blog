var express       = require('express');
var multer        = require('multer');
var sharp         = require('sharp');
var models        = require('../models/index');
var Portfolioimage = models.portfolioimage;
var uploadHandler = multer({dest: 'public/images/portfolio'});
var router        = express.Router();


// Index.
router.get('/', function(request, response) {
	Portfolioimage.findAll().then(function(portfolioimages) {
		response.render('portfolio/index', {
			portfolioimages: portfolioimages
		});
	});
});


// New.
router.get('/new', function(request, response) {
	response.render('portfolio/new', {
		portfolioimage: {}
	});
});

// Create.
router.post('/', uploadHandler.single('image'), function(request, response) {
	Portfolioimage.create({
		title:         request.body.title,
		body:          request.body.body,
		author:        request.body.author,
		slug:          request.body.slug,
		imageFilename: (request.file && request.file.filename)
	}).then(function(portfolioimage) {
		sharp(request.file.path)
		.resize(400, 400)
		.max()
		.withoutEnlargement()
		.toFile(`${request.file.path}-thumbnail`, function() {
			response.redirect(portfolioimage.url);
		});
	}).catch(function(error) {
		response.render('portfolio/new', {
			portfolioimage:   request.body,
			errors: 		  error.errors
		});
	});
});

// Show.
router.get('/:slug', function(request, response) {
	Portfolioimage.findWithSlug(request.params.slug).then(function(portfolioimage) {
		response.render('portfolio/show', {
			portfolioimage:     portfolioimage,
			comment:  {}
		});
	});
});

// Show Pic.
router.get('/:slug/photo', function(request, response) {
	Portfolioimage.findWithSlug(request.params.slug).then(function(portfolioimage) {
		response.render('portfolio/photo', {
			portfolioimage:     portfolioimage
		});
	});
});


module.exports = router;
