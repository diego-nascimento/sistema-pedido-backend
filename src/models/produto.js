const { Model} = require('sequelize')
const Sequelize = require('sequelize')


class Produto extends Model {
    static init(sequelize){
        super.init({
            nome: Sequelize.STRING,
            preco: Sequelize.FLOAT,
            descricao: Sequelize.STRING,
            status: Sequelize.INTEGER
        },
        {
            sequelize
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.foto, {foreignKey: 'foto_id', as: 'foto'});
        this.belongsTo(models.Categoria, {foreignKey: 'categoria_id', as: 'categoria'});

        this.belongsToMany(models.Pedido,
            {
                through: 'ped_prods',
                as: 'pedido',
                foreignKey: 'produto_id',
            });
   
    }
}

module.exports = Produto;














