const { Model} = require('sequelize')
const Sequelize = require('sequelize')


class foto extends Model {
    static init(sequelize){
        super.init({
          nome_arquivo: Sequelize.STRING,
          url: {
            type: Sequelize.VIRTUAL,
            get(){
              return process.env.URL + 'file/'+ this.nome_arquivo
            }
          }
        },
        {
            sequelize
        });
        return this;
    }
}


module.exports = foto;














