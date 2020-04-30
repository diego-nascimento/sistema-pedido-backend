const sequelize = require('sequelize')
const databaseconfig = require('../config/database')
const Produto = require('../models/produto')
const Categoria = require('../models/categoria')
const Pedido = require('../models/pedido')
const Ped_Prod = require('../models/ped_prod')


const Foto = require('../models/foto')

const models = [Produto, Categoria, Foto, Pedido, Ped_Prod]
require('dotenv').config()

class database {
    constructor(){
        this.init()
    }
    init(){
        this.connection = new sequelize(databaseconfig)
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))     
    }
}

module.exports = new database()