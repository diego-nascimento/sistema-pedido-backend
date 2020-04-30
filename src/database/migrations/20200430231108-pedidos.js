'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('pedidos', { 
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
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        telefone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rua: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        numero: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        bairro: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cidade: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        meio_pagamento: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        observacao: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        preco_total: {
          type: Sequelize.FLOAT,
          allowNull: false,
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
   
      return queryInterface.dropTable('pedidos');
    
  }
};

