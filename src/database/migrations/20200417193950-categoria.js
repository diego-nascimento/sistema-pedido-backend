'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('categoria', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        }, 
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 1
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descricao: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        foto_id:  {
          type: Sequelize.INTEGER,
          references: { model: 'fotos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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
   
      return queryInterface.dropTable('categoria');
    
  }
};
