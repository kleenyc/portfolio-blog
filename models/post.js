module.exports = function(sequelize, DataTypes) {
	return(sequelize.define('post', {
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
					msg: 'Text is required'
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
				return(`/blog/${this.slug}`);
			// },
			// imageUrl: function() {
			// 	return(`/images/blog/${this.imageFilename}`);
			// },
			// imageThumbnailUrl: function() {
			// 	return(`${this.imageUrl}-thumbnail`);
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