const { Model} = require('sequelize')
const Sequelize = require('sequelize')


class ped_prod extends Model {
    static init(sequelize){
        super.init({
            quantidade: Sequelize.INTEGER
        },
        {
            sequelize
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Produto, {foreignKey: 'produto_id', as: 'produto'});
        this.belongsTo(models.Pedido, {foreignKey: 'pedido_id', as: 'pedido'});
    }
}



module.exports = ped_prod;














