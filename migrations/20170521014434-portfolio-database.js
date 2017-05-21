module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.createTable('portposts', {
      id: {
        type:          Sequelize.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false
      },
      title: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      body: {
        type:      Sequelize.TEXT,
        allowNull: false
      },
      author: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type:      Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type:      Sequelize.DATE,
        allowNull: false
      }
    }));
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.dropTable('portposts'));
  }
};