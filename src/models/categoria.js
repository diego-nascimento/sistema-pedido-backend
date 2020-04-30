const { Model} = require('sequelize')
const Sequelize = require('sequelize')


class Categoria extends Model {
    static init(sequelize){
        super.init({
            nome: Sequelize.STRING,
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
    }
}

module.exports = Categoria


