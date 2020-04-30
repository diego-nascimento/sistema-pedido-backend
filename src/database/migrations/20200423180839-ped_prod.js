'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('ped_prods', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        }, 
        pedido_id:  {
          type: Sequelize.INTEGER,
          references: { model: 'pedidos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false
        },
        produto_id:  {
          type: Sequelize.INTEGER,
          references: { model: 'produtos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false
        },
        quantidade: {
          type: Sequelize.INTEGER,
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
   
      return queryInterface.dropTable('ped_prod');
    
  }
};
