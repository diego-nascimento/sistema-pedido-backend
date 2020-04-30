const { Model} = require('sequelize')
const Sequelize = require('sequelize')


class Pedido extends Model {
    static init(sequelize){
        super.init({
            status: Sequelize.STRING,
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            telefone: Sequelize.STRING,
            rua: Sequelize.STRING,
            numero: Sequelize.STRING,
            bairro: Sequelize.STRING,
            cidade: Sequelize.STRING,
            meio_pagamento: Sequelize.STRING,
            observacao: Sequelize.STRING,
            preco_total: Sequelize.FLOAT,
            status: Sequelize.INTEGER
        },
        {
            sequelize
        });
        return this;
    }

    static associate(models){
        this.belongsToMany(models.Produto,
        {
            through: 'ped_prods',
            as: 'produto',
            foreignKey: 'pedido_id',
        });
    }

}



module.exports = Pedido;














