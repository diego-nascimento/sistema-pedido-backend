'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('fotos', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        }, 
        nome_arquivo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          default: Date.now()
        },
        updated_at: {
          type: Sequelize.DATE,
          default: Date.now()
        }
      });
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('fotos');
    
  }
};
