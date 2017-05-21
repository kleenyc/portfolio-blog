module.exports = function(sequelize, DataTypes) {
	return(sequelize.define('portfolioimage', {
		imageFilename: {
			type:         DataTypes.STRING,
			allowNull:    false,
			defaultValue: '',
			validate: {
				notEmpty: {
					msg: 'Image is required'
				}
			}
		},
		title: {
			type:      DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Title is required'
				}
			}
		},
		body: {
			type:      DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Description is required'
				}
			}
		},
		author: {
			type:      DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Author is required'
				}
			}
		},
		slug: {
			type:      DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Slug is required'
				},
				notContains: {
					args: [[' ']],
					msg:  'Slug cannot contain spaces'
				}
			}
		},
	}, {
		defaultScope: {
			order: [['createdAt', 'DESC']]
		},
	  getterMethods: {
			url: function() {
				return(`/portfolio/${this.slug}`);
			},
			imageUrl: function() {
				return(`/images/portfolio/${this.imageFilename}`);
			},
			imageThumbnailUrl: function() {
				return(`${this.imageUrl}-thumbnail`);
			}
	  },
	   classMethods: {
    	findWithSlug: function(slug) {
				return(this.findOne({
					where: {
						slug: slug
					},
				}));
			}
    }

   //  classMethods: {
   //    associate: function(models) {
   //      models.post.hasMany(models.comment);

   //    },
			// findWithSlug: function(slug) {
			// 	return(this.findOne({
			// 		where: {
			// 			slug: slug
			// 		},
			// 		include: [
			// 			sequelize.models.comment
			// 		],
			// 		order: [
			// 			[sequelize.models.comment, 'createdAt', 'DESC']
			// 		]
			// 	}));
			// }
   //  }
	}));
};